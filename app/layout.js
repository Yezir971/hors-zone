import { Poppins } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/context/authContext'
import ArticleProvider from '@/context/articleContext'
import NavBar from '@/components/navBar'
import Footer from '@/components/footer/Footer'
const popins = Poppins({
    variable: '--font-popins',
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

// export const metadata = {
//     applicationName: 'Hors Zone',
//     title: {
//         default: "Hors Zone - Explorez les sports l'inattendu",
//         template: '%s | Hors Zone',
//     },
//     description:
//         'Découvrez Hors Zone, une application innovante pour explorer des contenus dynamiques et personnalisés.',
//     manifest: '/manifest.json',
//     appleWebApp: {
//         capable: true,
//         statusBarStyle: 'default',
//         title: "Hors Zone - Explorez l'inattendu",
//         // startUpImage: [],
//     },
//     formatDetection: {
//         telephone: false,
//     },
//     openGraph: {
//         type: 'website',
//         siteName: 'Hors Zone',
//         title: {
//             default: "Hors Zone - Explorez l'inattendu",
//             template: '%s | Hors Zone',
//         },
//         description:
//             'Découvrez Hors Zone, une application innovante pour explorer des contenus dynamiques et personnalisés.',
//     },
//     twitter: {
//         card: 'summary',
//         title: {
//             default: "Hors Zone - Explorez l'inattendu",
//             template: '%s | Hors Zone',
//         },
//         description:
//             'Découvrez Hors Zone, une application innovante pour explorer des contenus dynamiques et personnalisés.',
//     },
// }

export const metadata = {
    applicationName: 'Hors Zone',
    title: {
        default: "Hors Zone - Découvrez les sports insolites et l'inattendu",
        template: '%s | Hors Zone',
    },
    description:
        "Hors Zone est l'application dédiée aux sports insolites : explorez des disciplines inattendues, localisez les événements proches, laissez des commentaires, ajoutez vos favoris et découvrez des vidéos inspirantes.",
    manifest: '/manifest.json',
    appleWebApp: {
        capable: true,
        statusBarStyle: 'default',
        title: 'Hors Zone - Sports insolites et découvertes',
    },
    formatDetection: {
        telephone: false,
    },
    openGraph: {
        type: 'website',
        siteName: 'Hors Zone',
        url: 'https://hors-zone.vercel.app', // domaine final
        title: {
            default: 'Hors Zone - Découvrez les sports insolites',
            template: '%s | Hors Zone',
        },
        description:
            "Explorez les sports alternatifs et lieux d'événements insolites avec Hors Zone. Regardez des vidéos, commentez, partagez et créez vos favoris.",
        images: [
            {
                url: 'https://hors-zone.vercel.app/images/og-image.jpg', // ajoute une image 1200x630 dans /public
                width: 1200,
                height: 630,
                alt: 'Hors Zone - Sports insolites',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: {
            default: 'Hors Zone - Sports insolites et découvertes',
            template: '%s | Hors Zone',
        },
        description:
            "Trouvez des événements insolites, explorez des sports originaux et partagez vos découvertes. Hors Zone, l'app pour sortir des sentiers battus.",
        images: ['https://hors-zone.vercel.app/images/og-image.jpg'],
        // creator: '@tonTwitter', // pour le compte tweeter lier a l'aapp
    },
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
            <body className={`${popins.variable} bg-[var(--background-color)] text-[var(--text-color)] antialiased`}>
                <AuthProvider>
                    <ArticleProvider>
                        <NavBar />
                        {children}
                        <Footer />
                    </ArticleProvider>
                </AuthProvider>
            </body>
        </html>
    )
}
