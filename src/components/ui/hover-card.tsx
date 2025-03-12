"use client"

import * as React from "react"
import * as HoverCardPrimitive from "@radix-ui/react-hover-card"

import {cn} from "@/lib/utils"
import {Info} from "lucide-react";
import {useEffect, useState} from "react";

function HoverCard({
                       ...props
                   }: React.ComponentProps<typeof HoverCardPrimitive.Root>) {
    return <HoverCardPrimitive.Root data-slot="hover-card" {...props} />
}

function HoverCardTrigger({
                              ...props
                          }: React.ComponentProps<typeof HoverCardPrimitive.Trigger>) {
    return (<HoverCardPrimitive.Trigger data-slot="hover-card-trigger" {...props} />)
}

function HoverCardContent({
                              className, align = "center", sideOffset = 4, ...props
                          }: React.ComponentProps<typeof HoverCardPrimitive.Content>) {
    return (<HoverCardPrimitive.Content
            data-slot="hover-card-content"
            align={align}
            sideOffset={sideOffset}
            className={cn("bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-64 rounded-md border p-4 shadow-md outline-hidden", className)}
            {...props}
        />)
}

interface SpanHoverCardProps {
    label: string;
    children: React.ReactNode;
    className?: string;
}

const SpanHoverCard: React.FC<SpanHoverCardProps> = ({ label, children, className }) => {
    const [isMobile, setIsMobile] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const checkIsMobile = () => setIsMobile(window.innerWidth < 768);
        checkIsMobile();
        window.addEventListener("resize", checkIsMobile);
        return () => window.removeEventListener("resize", checkIsMobile);
    }, []);

    useEffect(() => {
        if (!isMobile || !open) return;

        const handleClickOutside = (event: MouseEvent) => {
            if (!(event.target as HTMLElement)?.closest("[data-slot='hover-card']")) {
                setOpen(false);
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, [isMobile, open]);

    return (
        <HoverCard
            open={isMobile ? open : undefined}
            onOpenChange={() => {setOpen(isMobile ? open : false)}}
        >
            <HoverCardTrigger asChild {...(isMobile ? { onClick: () => setOpen(!open) } : {})}>
                <span
                    className={cn(
                        "inline-flex items-center gap-1 cursor-pointer decoration-dotted hover:underline",
                        className
                    )}
                >
                    {label} <Info className="w-4 h-4" />
                </span>
            </HoverCardTrigger>
            <HoverCardContent className='text-sm font-light'>
                {children}
            </HoverCardContent>
            {" "}
        </HoverCard>
    );
};

export {HoverCard, HoverCardTrigger, HoverCardContent,SpanHoverCard}
