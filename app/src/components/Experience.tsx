const highlights = [
  "Supported AWS cloud infrastructure across EC2, S3, IAM, and VPC — monitoring, troubleshooting, and resolving issues to maintain application uptime",
  "Built and maintained CI/CD pipelines using Jenkins, automating build and deployment steps and reducing manual release effort by 20%",
  "Worked on containerized deployments on Docker and Kubernetes, troubleshooting pod failures and maintaining smooth rollouts",
  "Wrote Bash scripts to automate log checks, backups, and server health monitoring, cutting manual effort by 3–4 hours/week",
  "Monitored infrastructure health using CloudWatch, helping identify issues early and reduce incident response time",
  "Built and deployed AWS Lambda functions to automate routine operational workflows",
  "Provisioned AWS infrastructure using Terraform, supporting consistent environment setup across Dev and Staging",
  "Collaborated with senior DevOps engineers on release cycles, deployment workflows, and access reviews",
]

export default function Experience() {
  return (
    <section id="experience" className="border-b border-line">
      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="font-mono text-xs text-faint mb-2">// EXPERIENCE</div>
        <h2 className="font-display text-2xl font-semibold text-ink mb-8">Where I've worked</h2>

        <div className="border border-line bg-panel rounded-lg p-6">
          <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
            <h3 className="font-display font-medium text-ink">Cloud &amp; DevOps Engineer</h3>
            <span className="font-mono text-xs text-teal">March 2025 — Present</span>
          </div>
          <div className="font-mono text-xs text-faint mb-5">SOR Tech Solutions · Hyderabad, Telangana, India</div>

          <ul className="space-y-3">
            {highlights.map((point) => (
              <li key={point} className="flex gap-3 text-sm text-faint leading-relaxed">
                <span className="text-amber mt-1.5 shrink-0">▸</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
