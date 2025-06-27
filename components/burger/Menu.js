import React from 'react'
import clsx from 'clsx'
import Link from 'next/link'
import ButtonLightNight from './ButtonLightNight'
import { authContextApi } from '@/context/authContext'

const Menu = ({ open }) => {
    const { isAuth, logout } = authContextApi()
    return (
        <nav
            className={clsx(
                'flex flex-col shadow-xl/20   rounded-br-[50px] bg-[linear-gradient(150deg,_#0a5197_35%,_#0080ff_100%)]  h-screen w-[220px] overflow-x-hidden text-left p-5 fixed gap-[20px] top-0 left-0 z-30 transition-transform duration-300 ease-in-out',
                open ? 'translate-x-0' : '-translate-x-full'
            )}
        >
            <Link
                href="/"
                className="mt-[160px] text-2xl font-medium tracking-widest text-white no-underline transition-colors duration-300"
            >
                Accueil
            </Link>
            <Link
                href="/reportages"
                className="text-2xl font-medium tracking-widest text-white no-underline transition-colors duration-300"
            >
                Reportages
            </Link>
            <Link
                href="/competitions"
                className="text-2xl font-medium tracking-widest text-white no-underline transition-colors duration-300"
            >
                Competitions
            </Link>
            {isAuth ? (
                <button
                    className="text-2xl text-start font-medium tracking-widest text-white no-underline transition-colors duration-300"
                    onClick={logout}
                >
                    Déconnexion
                </button>
            ) : (
                <>
                    <Link
                        href="/signup"
                        className="text-2xl font-medium tracking-widest text-white no-underline transition-colors duration-300"
                    >
                        Inscription
                    </Link>
                    <Link
                        href="/login"
                        className="text-2xl font-medium tracking-widest text-white no-underline transition-colors duration-300"
                    >
                        Connexion
                    </Link>
                </>
            )}
            <ButtonLightNight />
        </nav>
    )
}

export default Menu
