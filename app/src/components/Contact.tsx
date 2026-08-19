export default function Contact() {
  return (
    <section id="contact" className="max-w-4xl mx-auto px-6 py-16">
      <div className="flex items-baseline gap-3 mb-8">
        <span className="font-mono text-xs text-amber">03</span>
        <h2 className="font-display text-xl font-semibold text-ink">Contact</h2>
        <div className="flex-1 h-px bg-line" />
      </div>
      <div className="border border-line bg-panel rounded-lg px-8 py-10 text-center">
        <p className="text-faint mb-1">Chennai, India · +91 8072659127</p>
        <p className="text-faint mb-6">Open to DevOps and cloud infrastructure roles.</p>
        <a href="mailto:pradeep14x@gmail.com" className="inline-flex items-center gap-2 font-mono text-sm bg-amber text-base px-6 py-3 rounded-lg font-medium hover:bg-amber/90 transition-colors">
          pradeep14x@gmail.com
        </a>
      </div>
    </section>
  )
}
