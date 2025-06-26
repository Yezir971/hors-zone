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

    // Construire l'URL YouTube avec les paramètres
    const buildYouTubeUrl = (videoId, autoplay, controls) => {
        const baseUrl = `https://www.youtube.com/embed/${videoId}`
        const params = new URLSearchParams()

        if (autoplay) params.append('autoplay', '1')
        if (!controls) params.append('controls', '0')
        params.append('rel', '0') // Ne pas afficher les vidéos liées
        params.append('modestbranding', '1') // Réduire le branding YouTube

        return params.toString() ? `${baseUrl}?${params.toString()}` : baseUrl
    }

    const handleLoad = () => {
        setIsLoading(false)
    }

    const handleError = () => {
        setIsLoading(false)
        setHasError(true)
    }

    const youtubeUrl = buildYouTubeUrl(videoId, autoplay, controls)

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
    if (!url) return null

    const patterns = [
        /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
        /youtube\.com\/watch\?.*v=([^&\n?#]+)/,
    ]

    for (const pattern of patterns) {
        const match = url.match(pattern)
        if (match) return match[1]
    }

    return null
}

export default YouTubeEmbed
