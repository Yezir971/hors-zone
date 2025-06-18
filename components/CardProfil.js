'use client'
import { authContextApi } from '@/context/authContext'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const CardProfil = ({ user }) => {
  const { logout } = authContextApi()
  const router = useRouter()
  if (!user) return null
  return (
    <div className="max-w-2xl mx-auto p-6 mt-10 bg-white shadow-xl rounded-2xl">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Mon profil
      </h1>

      <div className="space-y-4">
        <div className="flex gap-3.5">
          <span className="text-gray-600 font-medium">Email :</span>
          <span className="text-gray-800">{user.email}</span>
        </div>

        <div className="flex gap-3.5">
          <span className="text-gray-600 font-medium">Nom :</span>
          <span className="text-gray-800">
            {user.user_metadata?.name || 'Non renseigné'}
          </span>
        </div>
      </div>

      <div className="mt-10 flex gap-4 justify-center">
        <Link href="/user/edit">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl">
            Modifier le profil
          </button>
        </Link>

        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-xl"
        >
          Se déconnecter
        </button>
      </div>
    </div>
  )
}

export default CardProfil
