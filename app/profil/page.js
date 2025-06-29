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
import Return from '@/components/return/return'
import Link from 'next/link'
import { FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa'
import Footer from '@/components/footer/Footer'
import Image from 'next/image'

export default function ProfilePage() {
    const { user, isAuth, isLoadingUser, profil } = authContextApi()
    const router = useRouter()
    const [likedSports, setLikedSports] = useState()
    const [isLoadingLikedSports, setIsLoadingLikedSports] = useState(false)
    const [notifSports, setNotifSports] = useState([])
    const [isLoadingNotifSports, setIsLoadingNotifSports] = useState(false)
    useEffect(() => {
        if (isAuth && profil?.id) {
            fetchUserSportLike()
            fetchNotifSports()
        }
    }, [profil])

    useEffect(() => {
        if (!isLoadingUser && !isAuth) {
            router.push('/login')
        }
    }, [isAuth, isLoadingUser, router])

    if (isLoadingUser) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loading />
            </div>
        )
    }

    if (!isAuth) {
        return null
    }
    const fetchNotifSports = async () => {
        setIsLoadingNotifSports(true)
        try {
            const { data, error } = await supabase
                .from('notif')
                .select(
                    'sport_notif(id, name, categories, description, image_url, slug, date_start, date_end)'
                )
                .eq('user_who_want_notif', profil?.id)
            if (error) {
                toast.error(error.message, DATA_TOAST)
            }
            if (data) {
                const notif = data.map((item) => item.sport_notif)
                const notifFilter = notif.filter((item) => {
                    if (item.date_start && item.date_end) {
                        const eventStartDate = new Date(item.date_start)
                        const eventEndDate = new Date(item.date_end)

                        // Alternative : utiliser UTC pour éviter les problèmes de fuseau horaire
                        const currentDateUTC = new Date()
                            .toISOString()
                            .split('T')[0] // Format YYYY-MM-DD
                        const eventStartDateUTC = eventStartDate
                            .toISOString()
                            .split('T')[0]
                        const eventEndDateUTC = eventEndDate
                            .toISOString()
                            .split('T')[0]

                        // Vérifier que la date actuelle est comprise entre date_start et date_end
                        const isCurrentDateInRange =
                            currentDateUTC >= eventStartDateUTC &&
                            currentDateUTC <= eventEndDateUTC

                        // Garder seulement les événements où la date actuelle est dans la plage
                        return isCurrentDateInRange
                    }

                    return false // Exclure les événements sans dates
                })
                setNotifSports(notifFilter)
            }
        } catch (error) {
            toast.error(
                'Erreur de réception des soirts aimé. Veuillez vérifier votre connexion internet : ' +
                    error,
                DATA_TOAST
            )
        } finally {
            setIsLoadingNotifSports(false)
        }
    }
    const fetchUserSportLike = async () => {
        setIsLoadingLikedSports(true)
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
        } finally {
            setIsLoadingLikedSports(false)
        }
    }

    return (
        <>
            <div className="h-4/12 lg:h-96 flex justify-center items-center  shadow-xl/20 p-10 text-white bg-[linear-gradient(90deg,_#0a5197_35%,_#0080ff_100%)] rounded-b-[50px]">
                <Return />
                <div className="text-center gap-[62px]">
                    <div className="flex flex-col justify-center items-center gap-2.5">
                        {profil?.avatar_url &&
                        profil.avatar_url.trim() !== '' ? (
                            <Image
                                src={profil?.avatar_url}
                                alt="avatar"
                                width={100}
                                height={100}
                                className="rounded-full h-[100px] object-cover"
                            />
                        ) : (
                            <Image
                                src="/images/icons/user.svg"
                                alt="avatar"
                                width={100}
                                height={100}
                                className="rounded-full"
                            />
                        )}
                        <p className="text-2xl font-normal">{profil?.pseudo}</p>
                    </div>
                    <div className="flex my-[62px] justify-center items-center gap-[33px]">
                        {profil?.link_instagram && (
                            <Link
                                href={profil?.link_instagram}
                                className="text-white"
                            >
                                <FaInstagram />
                            </Link>
                        )}
                        {profil?.link_tiktok && (
                            <Link
                                href={profil?.link_tiktok}
                                className="text-white"
                            >
                                <FaTiktok />
                            </Link>
                        )}
                        {profil?.link_facebook && (
                            <Link
                                href={profil?.link_facebook}
                                className="text-white"
                            >
                                <FaFacebook />
                            </Link>
                        )}
                    </div>
                    <Link
                        className=" text-white font-semibold cursor-pointer"
                        href="/user/edit"
                    >
                        Modifier le profil
                    </Link>
                </div>
            </div>
            <main className="flex flex-col lg:px-[163px] px-5 gap-[52px] my-[72px]">
                <SectionEventHome
                    sports={notifSports}
                    titre={'Mes rappels'}
                    type={'picture'}
                    icons={'notification'}
                    isLoading={isLoadingNotifSports}
                />
                <SectionEventHome
                    sports={likedSports}
                    titre={'Favoris'}
                    type={'picture'}
                    icons={'like'}
                    isLoading={isLoadingLikedSports}
                />
            </main>
            {profil && profil.is_admin && (
                <>
                    <AdminPanel profil={profil} />
                    <div className="flex flex-col lg:px-[163px] px-5 gap-[52px] my-[72px]">
                        <ListSportsAdd profil={profil} />
                    </div>
                    <AdminFormVideo profil={profil} />
                    <div className="flex flex-col lg:px-[163px] px-5 gap-[52px] my-[72px]">
                        <ListVideoAdd profil={profil} />
                    </div>
                </>
            )}
            <Footer />
        </>
    )
}
