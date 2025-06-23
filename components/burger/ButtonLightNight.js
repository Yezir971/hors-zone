'use client'
import { authContextApi } from '@/context/authContext'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { FiSun, FiMoon } from 'react-icons/fi'

const ButtonLightNight = () => {
    const { logout, isAuth } = authContextApi()

    const [darkMode, setDarkMode] = useState(false)

    useEffect(() => {
        if (darkMode) {
            document.body.classList.add('dark')
        } else {
            document.body.classList.remove('dark')
        }
    }, [darkMode])
    return (
        <div className="flex items-start justify-start ">
            <input
                id="theme-toggle"
                type="checkbox"
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
                className="sr-only"
            />
            <label
                htmlFor="theme-toggle"
                className={clsx(
                    'flex items-center justify-between w-14 h-8 px-1 bg-gradient-to-t from-[#003366] to-[#0a2a4d] rounded-full cursor-pointer transition-colors  border-solid border-1 border-amber-50'
                )}
            >
                <FiMoon className="text-white text-sm" />
                <FiSun className="text-white text-sm" />
                <span
                    className={clsx(
                        'absolute bg-white w-6 h-6 rounded-full shadow-md transform transition-transform flex justify-center items-center',
                        darkMode ? 'translate-x-6' : 'translate-x-0'
                    )}
                >
                    {darkMode ? (
                        <FiSun className="text-[#0A5197] text-sm" />
                    ) : (
                        <FiMoon className="text-[#0A5197] text-sm" />
                    )}
                </span>
            </label>
        </div>
    )
}

export default ButtonLightNight
