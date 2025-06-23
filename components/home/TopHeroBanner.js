'use client'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import Burger from '../burger/Burger'
import Menu from '../burger/Menu'
import Link from 'next/link'

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
            <div className="w-full grid  grid-cols-3 items-center mt-16 mb-20 px-4">
                {/* Left: Burger */}
                <div className="flex items-center" ref={node}>
                    <Menu open={open} setOpen={setOpen} />
                    <Burger open={open} setOpen={setOpen} />
                </div>

                {/* Center: Logo */}
                <div className="flex justify-center">
                    <Image
                        src="/images/logo/logo.svg"
                        alt="arrow-left"
                        width={81}
                        height={79}
                    />
                </div>

                {/* Right: Profil */}
                <div className="flex justify-end">
                    <Link className="block w-[30px] h-[30px]" href="/profil">
                        <Image
                            src="/images/icons/user.svg"
                            alt="user icon"
                            width={30}
                            height={30}
                        />
                    </Link>
                </div>
            </div>
        </>
    )
}

export default TopHeroBanner
