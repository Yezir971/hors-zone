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
                className={`fixed top-0 right-0 w-full px-[21px] lg:px-[163px]    z-50 py-4 ${
                    changeBackground &&
                    'shadow-md bg-[linear-gradient(90deg,_#0a5197_35%,_#0080ff_100%)]'
                }  transition-all duration-300`}
            >
                <div
                    className="flex justify-between items-center h-[80px] px-6 lg:px-[0px] relative"
                    ref={node}
                >
                    {/* Left: Burger */}
                    <div className="flex items-center">
                        <Menu open={open} setOpen={setOpen} />
                        <Burger open={open} setOpen={setOpen} />
                    </div>

                    {/* Center: Logo */}
                    <div
                        className={`flex justify-center absolute left-[50%] translate-x-[-50%] lg:top-[58%] lg:translate-y-[-50%] top-[${
                            isScrolled ? '28px' : '58px'
                        }] transition-all duration-300 ease-linear`}
                    >
                        {/* <div className="flex justify-center transition-all duration-300"> */}
                        <Link href="/">
                            <Image
                                src="/images/logo/logo.svg"
                                alt="logo"
                                width={isScrolled ? 40 : 81}
                                height={isScrolled ? 40 : 79}
                                className={`transition-all duration-300 ease-linear`}
                            />
                        </Link>
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
