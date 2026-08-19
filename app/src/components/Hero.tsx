import { useEffect, useState } from "react"

const phrases = [
  "provisioning infrastructure with Terraform",
  "automating deployments with Jenkins & GitHub Actions",
  "monitoring uptime with CloudWatch",
  "orchestrating containers on Kubernetes",
]

export default function Hero() {
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = phrases[phraseIndex]
    const speed = deleting ? 30 : 55
    const timeout = setTimeout(() => {
      if (!deleting && charIndex < current.length) setCharIndex(charIndex + 1)
      else if (!deleting && charIndex === current.length) setTimeout(() => setDeleting(true), 1200)
      else if (deleting && charIndex > 0) setCharIndex(charIndex - 1)
      else { setDeleting(false); setPhraseIndex((phraseIndex + 1) % phrases.length) }
    }, speed)
    return () => clearTimeout(timeout)
  }, [charIndex, deleting, phraseIndex])

  return (
    <section id="about" className="max-w-4xl mx-auto px-6 pt-20 pb-24">
      <div className="flex items-center gap-2 mb-8 font-mono text-xs text-teal">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-teal" />
        </span>
        STATUS: OPEN TO DEVOPS &amp; CLOUD ROLES
      </div>
      <h1 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-ink mb-3">
        Pradeep K
      </h1>
      <p className="text-faint text-base max-w-lg leading-relaxed mb-10">
        Cloud &amp; DevOps Engineer building automated, production-style deployments —
        from infrastructure as code to CI/CD pipelines that ship on every push.
      </p>
      <div className="border border-line bg-panel rounded-lg px-5 py-4 font-mono text-sm text-ink inline-flex items-center gap-2 min-h-[3.25rem]">
        <span className="text-amber">$</span>
        <span>
          {phrases[phraseIndex].slice(0, charIndex)}
          <span className="inline-block w-[2px] h-4 bg-amber ml-0.5 align-middle animate-pulse" />
        </span>
      </div>
    </section>
  )
}
