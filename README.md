# OIDC Practice — Portfolio with Passwordless CI/CD on AWS

A follow-up project built to properly implement OIDC-based authentication between GitHub Actions and AWS, after hitting and resolving a real authorization issue during my original assignment submission.

 
**Repository:** https://github.com/thepradeepz/oidc-practice-portfolio

---

## Why this project exists

While completing a separate take-home assignment, I first attempted to authenticate GitHub Actions to AWS using OIDC (OpenID Connect) — a method that avoids storing any long-lived credentials at all. It failed with an `AssumeRoleWithWebIdentity: Not authorized` error I couldn't resolve within that assignment's deadline, so I shipped that submission using a simpler IAM user + access keys approach instead.

This project is where I came back, debugged the OIDC issue properly using AWS CloudTrail, found the actual root cause, and got it working end-to-end.

---

## Technology Stack

**Frontend**
- React + TypeScript + Vite
- Tailwind CSS, with a custom design system (systems-console theme, animated CI/CD pipeline visual in the hero section)

**Infrastructure (AWS)**
- Amazon S3 — private bucket storing the static build
- Amazon CloudFront — CDN serving the site over HTTPS
- IAM OIDC Identity Provider + IAM Role — federated trust with GitHub Actions, no stored credentials

**Infrastructure as Code**
- Terraform — provisions all AWS resources, including the OIDC provider and role

**CI/CD**
- GitHub Actions, authenticating to AWS via OIDC

---

## The OIDC Issue — Root Cause and Fix

The trust policy connecting GitHub Actions to the IAM role looked correct on paper: the OIDC provider, the role, and a `sub` condition scoped to this exact repository. But every deployment failed with:

```
Not authorized to perform sts:AssumeRoleWithWebIdentity
```

**Root cause:** GitHub rolled out a change to their OIDC token format in July 2026. New repositories now receive an *immutable subject claim* that embeds the permanent numeric IDs of the repository and its owner, instead of just their names:

```
Old format:  repo:thepradeepz/oidc-practice-portfolio:ref:refs/heads/main
New format:  repo:thepradeepz@172504124/oidc-practice-portfolio@1320097761:ref:refs/heads/main
```

My trust policy was still written for the old, name-based format, so every token GitHub sent failed to match. I confirmed this by checking AWS CloudTrail's event history for the exact `AssumeRoleWithWebIdentity` calls, which showed the real subject string GitHub was sending.

**Fix:** updated the IAM role's trust policy to use AWS's newer, dedicated condition keys — `repository_id` and `repository_owner_id` — alongside an updated `sub` match, which AWS requires as a baseline condition on any OIDC trust policy. This is also a more durable fix than matching the full subject string, since it targets the permanent IDs directly rather than a string format that could change again.

---

## Deployment Architecture

```
Developer pushes to GitHub (main branch)
            │
            ▼
   GitHub Actions requests a short-lived OIDC token
            │
            ▼
   AWS STS verifies the token against the IAM role's trust policy
   (matched on repository_id + repository_owner_id)
            │
            ▼
   Temporary AWS credentials issued, valid only for this job
            │
            ▼
   Build → sync to S3 → invalidate CloudFront cache
            │
            ▼
   Live site updated, credentials expire automatically
```

No AWS access keys exist anywhere in this project — not in the repo, not in GitHub Secrets, not stored long-term anywhere. Every deployment authenticates with a token that's generated fresh and expires within minutes.

---

## CI/CD Workflow

Defined in `.github/workflows/deploy.yml`, triggered on every push to `main`:

1. Checkout code
2. Set up Node.js 20
3. Install dependencies (`npm ci`)
4. Build the production bundle
5. Request a federated identity token and assume the AWS IAM role via OIDC
6. Sync the build to S3
7. Invalidate the CloudFront cache

---

## Running Locally

```bash
git clone https://github.com/thepradeepz/oidc-practice-portfolio.git
cd oidc-practice-portfolio/app
npm install
npm run dev
```

Available at `http://localhost:5173`.

---

## Infrastructure Setup

```bash
cd infra
terraform init
terraform plan
terraform apply
```

Provisions the S3 bucket, CloudFront distribution, OIDC provider, and IAM role with its trust policy.

---

## Key Takeaway

OIDC federation is more secure than static credentials, but it depends on the identity provider's token format staying in sync with the trust policy on the receiving side. Platform changes on either end can silently break that link — the fix here wasn't a configuration mistake, it was keeping the trust policy current with a genuine, dated change to GitHub's token issuance behavior, found by reading the actual authorization logs rather than guessing.
