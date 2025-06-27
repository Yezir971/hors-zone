'use client'
import { useParams } from 'next/navigation'

const Profil = () => {
    const { id } = useParams()

    return (
        <>
            <div className="min-h-screen bg-gradient-to-br  flex items-center justify-center p-6">
                <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
                    <h1 className="text-2xl font-bold mb-4">Profil {id}</h1>
                </div>
            </div>
        </>
    )
}

export default Profil
