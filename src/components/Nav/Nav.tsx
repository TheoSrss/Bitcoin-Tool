"use client"

import { useState } from "react"
import { ModeToggle } from "./ModeToggle"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"

export default function Nav() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <nav className="w-full p-5 border-b-4 border-dotted border-gray-900 dark:border-gray-100 flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
                <Link href="/dashboard">
                    <Image
                        src="/btc-logo.png"
                        alt="Logo"
                        width={50}
                        height={50}
                        className="mr-4"
                    />
                </Link>
            </div>

            <div className="hidden md:block">
                <ul className="flex gap-42 uppercase font-bold text-lg">
                    <li>
                        <Link href="/dashboard">Dashboard</Link>
                    </li>
                    <li>
                        <Link href="/dca">DCA Simulation</Link>
                    </li>
                    <li>
                        <Link href="/books">BookShop</Link>
                    </li>
                </ul>
            </div>
            {/* Mobile Menu Icon */}
            <button
                className="md:hidden block"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>

            {/* Mode Toggle */}
            <div className="hidden md:block">
                <ModeToggle />
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="absolute top-16 left-0 w-full bg-white dark:bg-black shadow-md md:hidden transition-all duration-300">
                    <ul className="flex flex-col items-center gap-6 p-5 uppercase font-bold text-lg">
                        <li><Link href="/dashboard" onClick={() => setIsOpen(false)}>Dashboard</Link></li>
                        <li><Link href="/dca" onClick={() => setIsOpen(false)}>DCA Simulation</Link></li>
                        <li><Link href="/books" onClick={() => setIsOpen(false)}>BookShop</Link></li>
                        <li className="mt-3"><ModeToggle /></li>
                    </ul>
                </div>
            )}
        </nav>
    )
}