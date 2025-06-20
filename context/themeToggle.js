'use client'

import { useEffect, useState } from 'react'

const ThemeToggle = () => {
    const dataLocalstorage = localStorage.getItem('darkMode')
    const [darkMode, setDarkMode] = useState(
        dataLocalstorage ? JSON.parse(dataLocalstorage) : false
    )

    useEffect(() => {
        const root = window.document.documentElement
        if (darkMode) {
            root.classList.add('dark')
            localStorage.setItem('darkMode', true)
        } else {
            localStorage.setItem('darkMode', false)
            root.classList.remove('dark')
        }
    }, [darkMode])

    return (
        <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
        >
            {darkMode ? '☀️ Light' : '🌙 Dark'}
        </button>
    )
}

export default ThemeToggle
