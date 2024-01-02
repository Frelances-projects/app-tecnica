import Link from 'next/link'

interface NavigationButtonProps {
  title: string
  href: string
}

export function NavigationButton({ title, href }: NavigationButtonProps) {
  return (
    <Link
      href={href}
      className="block px-4 py-2 text-sm text-zinc-800 hover:text-[#E86255]"
    >
      {title}
    </Link>
  )
}
