'use client'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import Burger from '../burger/Burger'
import Menu from '../burger/Menu'
import ThemeToggle from '@/context/themeToggle'

const useOnClickOutside = (ref, handler) => {
    useEffect(() => {
        const listener = (event) => {
            if (!ref.current || ref.current.contains(event.target)) return
            handler(event)
        }
        document.addEventListener('mousedown', listener)

        return () => {
            document.removeEventListener('mousedown', listener)
        }
    }, [ref, handler])
}

const TopHeroBanner = () => {
    const [open, setOpen] = useState(false)
    const node = useRef()
    useOnClickOutside(node, () => setOpen(false))
    return (
        <>
            <div className="w-full flex content-between justify-between mt-16 mb-20">
                <div className="flex flex-row items-center" ref={node}>
                    <Menu open={open} setOpen={setOpen} />
                    <Burger open={open} setOpen={setOpen} />
                </div>

                <Image
                    src="/images/logo/logo.svg"
                    alt="arrow-left"
                    width={81}
                    height={79}
                />
                {/* <ThemeToggle /> */}
                <Image
                    src="/images/icons/user.svg"
                    alt="user icon"
                    width={30}
                    height={30}
                />
            </div>
        </>
    )
}

export default TopHeroBanner
