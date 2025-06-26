import withPWAInit from '@ducanh2912/next-pwa'
const withPWA = withPWAInit({
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
    // disable: process.env.NODE_ENV === 'development',
})
// export default withPWA({
//   // Your Next.js config
// });
const supabaseUrl = new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname
const nextConfig = {
    images: {
        domains: [supabaseUrl, 'yezir971.github.io'],
    },
    // Configuration pour les iframes
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'X-Frame-Options',
                        value: 'SAMEORIGIN',
                    },
                ],
            },
        ]
    },
    // Configuration pour les Content Security Policy (optionnel)
    async rewrites() {
        return [
            {
                source: '/api/youtube-proxy/:path*',
                destination: 'https://www.youtube.com/:path*',
            },
        ]
    },
}

export default withPWA(nextConfig)
