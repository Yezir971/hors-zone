'use client'

import { useState } from 'react'

const YouTubeEmbed = ({
    videoId,
    title = 'YouTube video player',
    width = '100%',
    height = '315',
    className = '',
    autoplay = false,
    controls = true,
    ...props
}) => {
    const [isLoading, setIsLoading] = useState(true)
    const [hasError, setHasError] = useState(false)

    // Debug
    console.log('YouTubeEmbed props:', { videoId, title, width, height })

    // Construire l'URL YouTube avec les paramètres
    const buildYouTubeUrl = (videoId, autoplay, controls) => {
        if (!videoId) {
            console.error('VideoId is missing or invalid:', videoId)
            return null
        }

        const baseUrl = `https://www.youtube.com/embed/${videoId}`
        const params = new URLSearchParams()

        if (autoplay) params.append('autoplay', '1')
        if (!controls) params.append('controls', '0')
        params.append('rel', '0') // Ne pas afficher les vidéos liées
        params.append('modestbranding', '1') // Réduire le branding YouTube

        const finalUrl = params.toString()
            ? `${baseUrl}?${params.toString()}`
            : baseUrl
        console.log('Built YouTube URL:', finalUrl)
        return finalUrl
    }

    const handleLoad = () => {
        console.log('YouTube iframe loaded successfully')
        setIsLoading(false)
    }

    const handleError = () => {
        console.error('YouTube iframe failed to load')
        setIsLoading(false)
        setHasError(true)
    }

    const youtubeUrl = buildYouTubeUrl(videoId, autoplay, controls)

    if (!youtubeUrl) {
        return (
            <div className={`relative ${className}`}>
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
                    <p className="text-gray-500 text-center p-4">
                        ID vidéo invalide: {videoId}
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className={`relative ${className}`}>
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
                </div>
            )}

            {hasError && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
                    <p className="text-gray-500">
                        Erreur de chargement de la vidéo YouTube
                    </p>
                </div>
            )}

            <iframe
                src={youtubeUrl}
                title={title}
                width={width}
                height={height}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                loading="lazy"
                onLoad={handleLoad}
                onError={handleError}
                className={`w-full ${
                    isLoading ? 'opacity-0' : 'opacity-100'
                } transition-opacity duration-300`}
                {...props}
            />
        </div>
    )
}

// Fonction utilitaire pour extraire l'ID vidéo d'une URL YouTube
export const extractYouTubeId = (url) => {
    console.log('Extracting YouTube ID from:', url)

    if (!url) {
        console.log('URL is null or undefined')
        return null
    }

    // Nettoyer l'URL - supprimer les caractères indésirables au début
    let cleanUrl = url.trim()

    // Supprimer le @ au début si présent
    if (cleanUrl.startsWith('@')) {
        cleanUrl = cleanUrl.substring(1)
        console.log('Removed @ from URL:', cleanUrl)
    }

    // Supprimer d'autres caractères indésirables potentiels
    cleanUrl = cleanUrl.replace(/^[^h]*/, '')

    console.log('Clean URL:', cleanUrl)

    const patterns = [
        // youtube.com/watch?v=VIDEO_ID
        /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
        // youtube.com/watch?other_params&v=VIDEO_ID
        /youtube\.com\/watch\?.*v=([^&\n?#]+)/,
        // youtube.com/embed/VIDEO_ID
        /youtube\.com\/embed\/([^&\n?#]+)/,
        // youtu.be/VIDEO_ID
        /youtu\.be\/([^&\n?#]+)/,
    ]

    for (const pattern of patterns) {
        const match = cleanUrl.match(pattern)
        if (match) {
            const videoId = match[1]
            console.log('Extracted video ID:', videoId)
            return videoId
        }
    }

    console.log('No video ID found in URL')
    return null
}

export default YouTubeEmbed
