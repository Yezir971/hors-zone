'use client'
import { authContextApi } from '@/context/authContext'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const NavBar = () => {
    const { logout, isAuth } = authContextApi()

    return (
        <nav style={styles.nav}>
            <div style={styles.buttons}>
                {!isAuth ? (
                    <>
                        <Link style={styles.button} href="/login">
                            Se connecter
                        </Link>
                        <Link style={styles.button} href="/signup">
                            S'inscrire
                        </Link>
                    </>
                ) : (
                    <>
                        <Link style={styles.button} href="/profil">
                            Voir le profil
                        </Link>

                        <Link style={styles.button} href="/">
                            page d'accueil
                        </Link>

                        <button style={styles.button} onClick={logout}>
                            Se déconnecter
                        </button>
                    </>
                )}
            </div>
        </nav>
    )
}
const styles = {
    nav: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '10px 20px',
        backgroundColor: '#222',
        color: '#fff',
        position: 'absolute',
    },
    logo: {
        margin: 0,
    },
    buttons: {
        display: 'flex',
        gap: '10px',
    },
    button: {
        backgroundColor: '#555',
        border: 'none',
        padding: '8px 12px',
        color: 'white',
        cursor: 'pointer',
        borderRadius: '4px',
    },
}
export default NavBar
