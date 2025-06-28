'use client'
import Link from 'next/link'
import Image from 'next/image'

const Error404 = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-900 to-blue-600 relative px-4">
            {/* Header logo et menu minimaliste */}
            <div className="absolute top-6 left-6 flex items-center gap-2">
                <Image
                    width={100}
                    height={100}
                    src="images/logo/logo.svg"
                    alt="Hors Zone Logo"
                    className="w-10 h-10 rounded-full shadow-lg"
                    priority
                />
                <span className="text-white font-bold text-lg tracking-wide">
                    HORS ZONE
                </span>
            </div>

            {/* Animation centrale : balle qui rebondit */}
            <div className="mt-24 flex flex-col items-center">
                <div className="relative w-20 h-20">
                    <div className="absolute inset-0 flex items-end justify-center">
                        <svg
                            className="animate-bounce"
                            width="64"
                            height="64"
                            viewBox="0 0 64 64"
                            fill="none"
                        >
                            <circle
                                cx="32"
                                cy="32"
                                r="28"
                                fill="#FBBF24"
                                stroke="#fff"
                                strokeWidth="4"
                            />
                            <path
                                d="M32 10 Q40 32 32 54"
                                stroke="#2563eb"
                                strokeWidth="4"
                                fill="none"
                            />
                        </svg>
                    </div>
                </div>
                <h1 className="mt-8 text-6xl md:text-8xl font-extrabold text-white drop-shadow-lg">
                    404
                </h1>
                <p className="mt-4 text-2xl md:text-3xl font-semibold text-white">
                    Zone introuvable !
                </p>
                <p className="mt-2 text-lg text-blue-100 max-w-md text-center">
                    Oups, tu viens de sortir des sentiers battus.
                    <br />
                    Cette page n’existe pas (ou plus) dans la Hors Zone.
                </p>
                <Link
                    href="/"
                    className="mt-8 px-6 py-3 bg-yellow-400 text-blue-900 font-bold rounded-lg shadow-lg hover:bg-yellow-300 transition duration-300"
                >
                    Retour à l’accueil
                </Link>
            </div>
        </div>
    )
}

export default Error404
