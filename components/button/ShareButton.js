import Image from 'next/image'
import { useState } from 'react'

const ShareButton = () => {
    const [open, setOpen] = useState(false)
    const [copied, setCopied] = useState(false)

    // Récupère l'URL de la page courante
    const url = typeof window !== 'undefined' ? window.location.href : ''

    const handleCopy = () => {
        navigator.clipboard.writeText(url)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <>
            <Image
                className="cursor-pointer"
                onClick={() => setOpen(true)}
                src="/images/icons/share.svg"
                alt="share"
                width={20}
                height={20}
            />

            {open && (
                <div className="fixed inset-0 flex items-center justify-center bg-white/50 bg-opacity-40 z-50">
                    <div className="bg-white p-6 rounded shadow-lg min-w-[300px] transition-all duration-300 opacity-0 translate-y-[-30%] animate-modalAppear">
                        <h2 className="text-lg font-bold mb-4">
                            Partager ce lien
                        </h2>
                        <input
                            type="text"
                            value={url}
                            readOnly
                            className="w-full border px-2 py-1 mb-2"
                            onFocus={(e) => e.target.select()}
                        />
                        <button
                            onClick={handleCopy}
                            className="bg-green-600 text-white px-3 py-1 rounded mr-2"
                        >
                            Copier le lien
                        </button>
                        <button
                            onClick={() => setOpen(false)}
                            className="bg-gray-300 px-3 py-1 rounded"
                        >
                            Fermer
                        </button>
                        {copied && (
                            <div className="text-green-600 mt-2">
                                Lien copié !
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    )
}

export default ShareButton
