import { titleFont } from "@/config/fonts"
import Link from "next/link"

export const Footer = () => {
  return (
    <div className="shadow-[0_-20px_25px_-5px_rgba(0,0,0,0.1),0_-8px_10px_-6px_rgba(0,0,0,0.1)] py-3 flex w-full justify-center text-xs">
        <Link href='/' className="text text-decoration-none">
        <span className={`${ titleFont.className} font-bold `}>ShoesImport</span>
        <span> © {new Date().getFullYear()}</span>
        
        </Link>      
    </div>
  )
}
