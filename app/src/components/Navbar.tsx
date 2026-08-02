export default function Navbar() {
  return (
    <nav className="w-full border-b border-gray-200 bg-white/80 backdrop-blur sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
        <span className="font-semibold text-lg text-gray-900">Pradeep K</span>
        <div className="flex gap-6 text-sm text-gray-600">
          <a href="#about" className="hover:text-gray-900">About</a>
          <a href="#projects" className="hover:text-gray-900">Projects</a>
          <a href="#contact" className="hover:text-gray-900">Contact</a>
        </div>
      </div>
    </nav>
  )
}
