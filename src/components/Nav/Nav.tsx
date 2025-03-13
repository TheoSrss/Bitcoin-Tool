"use client"

import {useState} from "react"
import {ModeToggle} from "./ModeToggle"
import Link from "next/link"
import Image from "next/image"
import {Menu, X} from "lucide-react"
import {usePathname} from "next/navigation";

const NAV_ITEMS = [{name: "Dashboard", path: "/"}, {name: "DCA Simulation", path: "/dca"}, {
    name: "FAQ",
    path: "/faq"
}]
export default function Nav() {
    const [isOpen, setIsOpen] = useState(false)
    const pathname = usePathname();

    return (<nav
        className="w-full p-5 border-b-4 border-dotted border-gray-900 dark:border-gray-100 flex items-center justify-between z-0">

        <div className="flex items-center">
            <Link href="/">
                <Image
                    src="/btc-logo.png"
                    alt="Logo"
                    width={50}
                    height={50}
                    className="mr-4"
                />
            </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-42 uppercase font-bold text-lg">
            {NAV_ITEMS.map(({name, path}) => (<li key={path} className="relative list-none">
                {pathname === path && (<span
                    className="absolute -z-10 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-orange-300 opacity-50 blur-lg rounded-full w-[calc(100%+50px)] h-[150%]"></span>)}
                <Link href={path} className="relative  transition-colors duration-200">
                    {name}
                </Link>
            </li>))}
        </div>

        {/* Mobile Menu Icon */}
        <button
            className="md:hidden block"
            onClick={() => setIsOpen(!isOpen)}
        >
            {isOpen ? <X size={28}/> : <Menu size={28}/>}
        </button>

        {/* Mode Toggle */}
        <div className="hidden md:block">
            <ModeToggle/>
        </div>

        {/* Mobile Menu */}
        {isOpen && (<div
            className="absolute top-16 left-0 w-full bg-white dark:bg-black shadow-md md:hidden transition-all duration-300">
            <ul className="flex flex-col items-center gap-6 p-5 uppercase font-bold text-lg">
                {NAV_ITEMS.map(({name, path}) => (<li key={path}>
                    <Link href={path} onClick={() => setIsOpen(false)}>
                        {name}
                    </Link>
                </li>))}
                <li className="mt-3"><ModeToggle/></li>
            </ul>
        </div>)}
    </nav>)
}