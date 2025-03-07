import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarTrigger,
} from "@/components/ui/menubar"
import { ModeToggle } from "./ModeToggle"
import Link from "next/link"
import Image from "next/image";

export default function Nav() {
    return (
        <div className="w-full mb-5 p-7 border-b-4 border-dotted border-gray-900 dark:border-gray-100  flex items-center justify-between">

            <div className="flex items-center">
                <Link href="/dashboard">
                    <Image
                        src="/btc-logo.png"
                        alt="Logo"
                        width={100}
                        height={100}
                        className="mr-4"
                    />
                </Link>
            </div>
            <div className="flex-1 flex justify-center">
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
            <div className="flex justify-end">
                <ModeToggle />
            </div>
        </div>
    )
};