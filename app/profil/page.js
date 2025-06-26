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
import Image from 'next/image'
import Link from 'next/link'
import { FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa'

export default function ProfilePage() {
    const { user, isAuth, isLoadingUser, profil } = authContextApi()
    const router = useRouter()
    const [likedSports, setLikedSports] = useState()
    useEffect(() => {
        if (isAuth && profil?.id) {
            fetchUserSportLike()
        }
        if (!isAuth && !profil) {
            router.push('/login')
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
            <div className="h-4/12 lg:h-96 flex justify-center items-center  shadow-xl/20 p-10 text-white bg-[linear-gradient(90deg,_#0a5197_35%,_#0080ff_100%)] rounded-b-[50px]">
                <Return />
                <div className="text-center gap-[62px]">
                    <div className="flex flex-col justify-center items-center gap-2.5">
                        {profil?.avatar_url ? (
                            <Image
                                src={profil?.avatar_url}
                                alt="avatar"
                                width={100}
                                height={100}
                                className="rounded-full"
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

            {/* <CardProfil user={user} /> */}
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
