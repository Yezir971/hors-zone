'use client'

import AdminPanel from '@/components/admin/AdminPanel'
import CardProfil from '@/components/CardProfil'
import Loading from '@/components/Loading'
import { authContextApi } from '@/context/authContext'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import DATA_TOAST from '../utils/constant/toast'
import { supabase } from '@/lib/initSupabase'
import SectionEventHome from '@/components/home/SectionEventHome'
import AdminFormVideo from '@/components/admin/AdminFormVideo'
import ListSportsAdd from '@/components/admin/ListSportsAdd'
import ListVideoAdd from '@/components/admin/ListVideoAdd'

export default function ProfilePage() {
    const { user, isAuth, isLoadingUser, profil } = authContextApi()
    const router = useRouter()
    const [likedSports, setLikedSports] = useState()
    useEffect(() => {
        if (isAuth && profil?.id) {
            fetchUserSportLike()
        }
        if (!isAuth && profil) {
            router.push('/')
        }
    }, [profil])

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

                return
            }
        } catch (error) {
            toast.error(
                'Erreur de réception des soirts aimé. Veuillez vérifier votre connexion internet : ' +
                    error,
                DATA_TOAST
            )
        }
    }

    return (
        <>
            <CardProfil user={user} />
            <SectionEventHome
                sports={likedSports}
                titre={'Évènements favoris'}
                type={'picture'}
            />
            {profil && profil.is_admin && (
                <>
                    <AdminPanel profil={profil} />
                    <ListSportsAdd profil={profil} />
                    <AdminFormVideo profil={profil} />
                    <ListVideoAdd profil={profil} />
                </>
            )}
        </>
    )
}
