'use client'

import AdminPanel from '@/components/AdminPanel'
import CardProfil from '@/components/CardProfil'
import LikedSportsCard from '@/components/LikedSportsCard'
import ListArticleAdd from '@/components/ListSportsAdd'
import Loading from '@/components/Loading'
import { authContextApi } from '@/context/authContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function ProfilePage() {
  const { user, isAuth, isLoadingUser, profil } = authContextApi()
  const router = useRouter()

  useEffect(() => {
    if (!isAuth) {
      router.push('/')
    }
  }, [])

  if (isLoadingUser && !user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading />
      </div>
    )
  }
  const likedSports = [
    {
      name: 'Basketball',
      description: "Deux équipes s'affrontent pour marquer des paniers.",
      image:
        'https://www.shutterstock.com/image-vector/let-madness-begin-march-tshirt-600nw-2328754759.jpg',
    },
    {
      name: 'Natation',
      description: 'Parcours aquatique avec différents styles de nage.',
      image: 'https://www.aquaponey.fr/header.jpg',
    },
  ]
  return (
    <>
      <CardProfil user={user} />
      <LikedSportsCard likedSports={likedSports} />
      {profil && profil.is_admin && 
      <>
        <AdminPanel profil={profil} />
        <ListArticleAdd profil={profil} />
        
      </>
        }
        
    </>
  )
}
