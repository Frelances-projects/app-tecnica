import { useRouter } from "next/router"

import { useAuth } from "@/hooks/useAuth"

interface NavigationButtonProps {
  href?: string
  title: string
}

export function NavigationButton({ href, title }: NavigationButtonProps) {
  const router = useRouter()
  const { logout } = useAuth()

  return (
    <button
      onClick={() => href ? router.push(href) : logout()}
      className="w-full py-3 px-10 rounded-full text-white bg-[#E3000F] hover:bg-[#E86255] hover:cursor-pointer flex items-center justify-center transition-colors duration-300 ease-out"
    >          
      {title}
    </button>
  )
}