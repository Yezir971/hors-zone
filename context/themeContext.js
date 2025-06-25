'use client'
import { createContext, useState, useEffect, useContext } from 'react'

const ThemeContext = createContext()

const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('light')
    useEffect(() => {
        const theme = localStorage.getItem('theme')
        if (theme) {
            setTheme(theme)
            document.documentElement.classList.remove(
                theme === 'light' ? 'dark' : 'light'
            )
            document.documentElement.classList.add(theme)
        } else {
            document.documentElement.classList.remove('dark')
            document.documentElement.classList.add('light')
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('theme', theme)
        document.documentElement.classList.remove(
            theme === 'light' ? 'dark' : 'light'
        )
        document.documentElement.classList.add(theme)
    }, [theme])

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light'
        setTheme(newTheme)
        document.documentElement.classList.remove(theme)
        document.documentElement.classList.add(newTheme)
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider

export const useTheme = () => useContext(ThemeContext)
