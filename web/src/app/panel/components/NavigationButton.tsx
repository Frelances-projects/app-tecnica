import Link from 'next/link'

interface NavigationButtonProps {
  title: string
  href: string
  isActive: boolean
}

export function NavigationButton({ title, href, isActive }: NavigationButtonProps) {
  return (
    <Link href={href} className={`flex items-center justify-center w-48 h-44 py-14 rounded-md px-10 text-xl text-center ${isActive ? 'bg-[#E3000F] text-white' : 'bg-[#D9D9D9] text-black'}`}>
      {title}
    </Link>
  )
}