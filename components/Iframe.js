'use client'

import { useState } from 'react'

const Iframe = ({
    src,
    title,
    width = '100%',
    height = '315',
    className = '',
    allowFullScreen = true,
    loading = 'lazy',
    ...props
}) => {
    const [isLoading, setIsLoading] = useState(true)
    const [hasError, setHasError] = useState(false)

    const handleLoad = () => {
        setIsLoading(false)
    }

    const handleError = () => {
        setIsLoading(false)
        setHasError(true)
    }

    return (
        <div className={`relative ${className}`}>
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
            )}

            {hasError && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
                    <p className="text-gray-500">
                        Erreur de chargement de la vidéo
                    </p>
                </div>
            )}

            <iframe
                src={src}
                title={title}
                width={width}
                height={height}
                frameBorder="0"
                allowFullScreen={allowFullScreen}
                loading={loading}
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

export default Iframe
