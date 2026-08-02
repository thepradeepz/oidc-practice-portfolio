const projects = [
  {
    title: 'Containerized App Deployment with Docker, K8s & CI/CD',
    description:
      'Containerized a web app with Docker, published images to Docker Hub, and deployed to Kubernetes with self-healing and replica-based scaling. GitHub Actions CI/CD cut deployment time from 15 minutes to under 3.',
    tech: 'Docker, Docker Hub, Kubernetes, GitHub Actions, AWS, CloudWatch',
  },
  {
    title: 'Cloud Infrastructure Automation with Terraform & Ansible',
    description:
      'Provisioned AWS infrastructure (VPC, EC2, IAM, S3, Route 53) using modular Terraform configs with a remote S3 backend for state management. Ansible playbooks automated server configuration and deployment.',
    tech: 'Terraform, Ansible, AWS, GitHub Actions',
  },
  {
    title: 'Highly Available 3-Tier Web App Architecture on AWS',
    description:
      'Designed a multi-AZ VPC with public/private subnets for Web, App, and DB tiers. Built Auto Scaling Groups and ALBs, a Bastion Host for secure access, and per-tier security groups with an RDS MySQL backend.',
    tech: 'AWS (VPC, EC2, ASG, ALB, RDS, IAM), MySQL, Linux, Bash',
  },
]

export default function Projects() {
  return (
    <section id="projects" className="max-w-5xl mx-auto px-6 py-16">
      <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Projects</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {projects.map((p) => (
          <div key={p.title} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <h3 className="font-semibold text-gray-900 mb-2">{p.title}</h3>
            <p className="text-sm text-gray-600 mb-3">{p.description}</p>
            <p className="text-xs text-gray-400">{p.tech}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
