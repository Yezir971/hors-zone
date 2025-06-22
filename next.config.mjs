import withPWAInit from '@ducanh2912/next-pwa'
const withPWA = withPWAInit({
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
    // disable: process.env.NODE_ENV === 'development',
})
// export default withPWA({
//   // Your Next.js config
// });

const nextConfig = {
    images: {
        domains: [process.env.NEXT_PUBLIC_SUPABASE_URL],
    },
}

export default withPWA(nextConfig)
