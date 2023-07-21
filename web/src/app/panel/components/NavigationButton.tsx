import Link from 'next/link'

interface NavigationButtonProps {
  title: string
  href: string
}

export function NavigationButton({ title, href }: NavigationButtonProps) {
  return (
    <Link href={href} className='flex items-center justify-center w-48 h-44 py-14 rounded-md px-10 bg-[#D9D9D9] text-black text-xl text-center'>
      {title}
    </Link>
  )
}