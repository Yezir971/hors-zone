'use client'

import DATA_TOAST from '@/app/utils/constant/toast'
import { authContextApi } from '@/context/authContext'
import { supabase } from '@/lib/initSupabase'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

export default function HeartButton({ idSport }) {
    const [likeToogle, setLikeToggle] = useState(false)
    const [numberLike, setNumberLike] = useState(0)
    const { profil, isAuth } = authContextApi()
    const router = useRouter()
    useEffect(() => {
        if (profil?.id) {
            fetchLike()
        }
    }, [profil])

    const sendlike = async () => {
        if (!isAuth) {
            toast.warning('Connecte-toi pour ajouter un like', DATA_TOAST)
            router.push('/login')
            return
        }
        try {
            if (!likeToogle) {
                await supabase.from('like').insert([
                    {
                        user_who_like: profil?.id,
                        sports_who_like: idSport,
                    },
                ])
                setLikeToggle(!likeToogle)
                toast.success('Like pris en compte.', DATA_TOAST)
                setNumberLike(numberLike + 1)
            } else {
                await supabase
                    .from('like')
                    .delete()
                    .eq('user_who_like', profil?.id)
                    .eq('sports_who_like', idSport)

                setNumberLike(numberLike - 1)
                setLikeToggle(!likeToogle)
                toast.warning('Like supprimer.', DATA_TOAST)
            }
        } catch (error) {
            toast.error(
                'Erreur de connexion sendLike(), veuillez vérifier votre connexion internet : ' +
                    error,
                DATA_TOAST
            )
            return
        }
    }
    const fetchLike = async () => {
        try {
            const { error: errorDatalike, data: dataLike } = await supabase
                .from('like')
                .select()
                .eq('sports_who_like', idSport)

            const { data: dataIslike, error: errorIsLike } = await supabase
                .from('like')
                .select()
                .eq('user_who_like', profil?.id)
                .eq('sports_who_like', idSport)
            if (errorDatalike) {
                toast.error(
                    'Erreur envoyer depuis la bdd, nombre de like, veuillez vérifier votre connexion internet : ' +
                        errorDatalike,
                    DATA_TOAST
                )
                return
            }
            if (errorIsLike) {
                toast.error(
                    'Erreur envoyer depuis la bdd pour la réception des like utilisateur, veuillez vérifier votre connexion internet : ' +
                        errorIsLike,
                    DATA_TOAST
                )
                console.table(errorDatalike)
                return
            }
            if (errorDatalike || errorIsLike) {
                toast.error('Erreur lors du chargement des likes.', DATA_TOAST)
                return
            }
            if (dataLike) {
                setNumberLike(dataLike.length)
            }

            if (dataIslike && dataIslike.length > 0) {
                setLikeToggle(true)
            }
        } catch (error) {
            toast.error(
                'Erreur de connexion fetchLike() : ' + error,
                DATA_TOAST
            )
        }
    }

    return (
        <>
            <div className="flex gap-2 text-white text-2xl">
                <p>{numberLike}</p>
                <Image
                    onClick={sendlike}
                    className="cursor-pointer"
                    src={
                        likeToogle
                            ? '/images/icons/like-red.svg'
                            : '/images/icons/like-white.svg'
                    }
                    width={28}
                    height={24}
                    alt="button like"
                />
            </div>
        </>
    )
}
