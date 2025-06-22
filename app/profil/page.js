'use client'

import AdminPanel from '@/components/AdminPanel'
import CardProfil from '@/components/CardProfil'
import LikedSportsCard from '@/components/LikedSportsCard'
import ListArticleAdd from '@/components/ListSportsAdd'
import Loading from '@/components/Loading'
import { authContextApi } from '@/context/authContext'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import DATA_TOAST from '../utils/constant/toast'
import { supabase } from '@/lib/initSupabase'
import SectionEventHome from '@/components/home/SectionEventHome'

export default function ProfilePage() {
    const { user, isAuth, isLoadingUser, profil } = authContextApi()
    const router = useRouter()
    const [likedSports, setLikedSports] = useState()
    useEffect(() => {
        if (isAuth && profil?.id) {
            fetchUserSportLike()
        }
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
    const fetchUserSportLike = async () => {
        try {
            const { data, error: likeError } = await supabase
                .from('like')
                .select(
                    'sports_who_like(id, name, categories, description, image_url, slug)'
                )
                .eq('user_who_like', profil?.id)
            if (!likeError) {

                const sports = data.map((item) => item.sports_who_like)
                setLikedSports(sports)
            } else {
                toast.error(
                    'Erreur de réception des soirts aimé.' + likeError,
                    DATA_TOAST
                )
                console.log(likeError)

                return
            }
        } catch (error) {
            toast.error(
                'Erreur de réception des soirts aimé. Veuillez vérifier votre connexion internet : ' +
                    error,
                DATA_TOAST
            )
            console.log(error)
        }
    }

    return (
        <>
            <CardProfil user={user} />
            <SectionEventHome sports={likedSports} />
            {profil && profil.is_admin && (
                <>
                    <AdminPanel profil={profil} />
                    <ListArticleAdd profil={profil} />
                </>
            )}
        </>
    )
}
