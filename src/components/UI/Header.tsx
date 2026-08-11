import { Atom } from 'lucide-react'

export function Header() {
  return (
    <div className="flex gap-1 text-xl font-semibold items-center text-[#faa7fa] rounded-l-3xl absolute top-8 left-12">
      <Atom size={20} />
      <span>Nebula</span>
    </div>
  )
}
