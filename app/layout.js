import { Poppins } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/context/authContext'
import NavBar from '@/components/NavBar'
import ArticleProvider from '@/context/articleContext'

const popins = Poppins({
    variable: '--font-popins',
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

export default function RootLayout({ children }) {
    return (
        <html lang="fr">
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
