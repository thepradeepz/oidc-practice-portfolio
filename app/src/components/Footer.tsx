export default function Footer() {
  return (
    <footer className="max-w-4xl mx-auto px-6 py-8 text-center font-mono text-[11px] text-faint">
      © {new Date().getFullYear()} Pradeep K · built with React, shipped via GitHub Actions
    </footer>
  )
}
