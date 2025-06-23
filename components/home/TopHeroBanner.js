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
    const [isScrolled, setIsScrolled] = useState(false)
    const [changeBackground, setChangeBackground] = useState(false)
    const node = useRef()

    useOnClickOutside(node, () => setOpen(false))

    // Écoute le scroll
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
            setChangeBackground(window.scrollY > 60)
        }

        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return (
        <>
            <div
                className={`fixed top-0 right-0 w-full z-50 py-4 ${
                    changeBackground &&
                    'shadow-md bg-[linear-gradient(90deg,_#0a5197_35%,_#0080ff_100%)]'
                }  transition-all duration-300`}
            >
                <div
                    className="grid grid-cols-3 items-center h-[80px] px-6"
                    ref={node}
                >
                    {/* Left: Burger */}
                    <div className="flex items-center">
                        <Menu open={open} setOpen={setOpen} />
                        <Burger open={open} setOpen={setOpen} />
                    </div>

                    {/* Center: Logo */}
                    <div className="flex justify-center transition-all duration-300">
                        <Image
                            src="/images/logo/logo.svg"
                            alt="logo"
                            width={isScrolled ? 40 : 81}
                            height={isScrolled ? 40 : 79}
                            className="transition-all duration-300"
                        />
                    </div>

                    {/* Right: Profil */}
                    <div className="flex justify-end">
                        <Link
                            className="block w-[30px] h-[30px]"
                            href="/profil"
                        >
                            <Image
                                src="/images/icons/user.svg"
                                alt="user icon"
                                width={30}
                                height={30}
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TopHeroBanner
