import { Poppins } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/context/authContext'
import ArticleProvider from '@/context/articleContext'
import NavBar from '@/components/navBar'

const popins = Poppins({
    variable: '--font-popins',
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

export const metadata = {
    title: 'Hors zone',
    description: 'Application web progressive',
}

export default function RootLayout({ children }) {
    return (
        <html lang="fr">
            <head>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <meta name="theme-color" content="#0080FF" />
                <link rel="manifest" href="/manifest.json" />
                <link rel="icon" href="/icons/icon-192x192.png" />
                <link
                    rel="apple-touch-icon"
                    sizes="192x192"
                    href="/images/logo/web-app-manifest-192x192.png"
                />
                <link
                    rel="apple-touch-icon"
                    sizes="512x512"
                    href="/icons/icon-512x512.png"
                />
                <meta name="apple-mobile-web-app-title" content="hors zone" />
            </head>
            <body className={`${popins.variable} antialiased`}>
                <AuthProvider>
                    <ArticleProvider>
                        <NavBar />
                        {children}
                    </ArticleProvider>
                </AuthProvider>
            </body>
        </html>
    )
}
