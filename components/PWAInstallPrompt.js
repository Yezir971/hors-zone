'use client'

import { useState, useEffect } from 'react'

const PWAInstallPrompt = () => {
    const [deferredPrompt, setDeferredPrompt] = useState(null)
    const [showInstallButton, setShowInstallButton] = useState(false)

    useEffect(() => {
        const handler = (e) => {
            // Empêcher Chrome 67 et versions antérieures d'afficher automatiquement le prompt
            e.preventDefault()
            // Stocker l'événement pour qu'il puisse être déclenché plus tard
            setDeferredPrompt(e)
            // Mettre à jour l'interface utilisateur pour notifier l'utilisateur qu'il peut installer l'application
            setShowInstallButton(true)
        }

        window.addEventListener('beforeinstallprompt', handler)

        return () => {
            window.removeEventListener('beforeinstallprompt', handler)
        }
    }, [])

    const handleInstallClick = async () => {
        if (!deferredPrompt) return

        // Afficher le prompt d'installation
        deferredPrompt.prompt()

        // Attendre que l'utilisateur réponde au prompt
        const { outcome } = await deferredPrompt.userChoice

        // Nous avons utilisé le prompt, et nous ne pouvons plus l'utiliser, le réinitialiser
        setDeferredPrompt(null)

        // Masquer le bouton d'installation
        setShowInstallButton(false)

        console.log(`User response to the install prompt: ${outcome}`)
    }

    const handleDismiss = () => {
        setShowInstallButton(false)
        setDeferredPrompt(null)
    }

    if (!showInstallButton) return null

    return (
        <div className="fixed bottom-4 left-4 right-4 bg-blue-600 text-white p-4 rounded-lg shadow-lg z-50">
            <div className="flex items-center justify-between">
                <div className="flex-1">
                    <h3 className="font-semibold text-sm">
                        Installer Hors Zone
                    </h3>
                    <p className="text-xs opacity-90">
                        Ajoutez l'application à votre écran d'accueil pour un
                        accès rapide
                    </p>
                </div>
                <div className="flex gap-2 ml-4">
                    <button
                        onClick={handleInstallClick}
                        className="bg-white text-blue-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors"
                    >
                        Installer
                    </button>
                    <button
                        onClick={handleDismiss}
                        className="text-white opacity-70 hover:opacity-100 text-sm"
                    >
                        ✕
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PWAInstallPrompt
