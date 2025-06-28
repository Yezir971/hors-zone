'use client'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { FaInstagram, FaTiktok, FaFacebook } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/initSupabase'
import { toast } from 'react-toastify'
import SectionEventHome from '@/components/home/SectionEventHome'
import Return from '@/components/return/return'
import Loading from '@/components/Loading'
import DATA_TOAST from '@/app/utils/constant/toast'
import Footer from '@/components/footer/Footer'

const Profil = () => {
    const { id } = useParams()
    const [profil, setProfil] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [sport, setSport] = useState([])
    const [isLoadingSport, setIsLoadingSport] = useState(false)
    useEffect(() => {
        const fetchProfil = async () => {
            try {
                setIsLoading(true)
                const { error, data } = await supabase
                    .from('profil')
                    .select()
                    .eq('id', id)
                    .single()
                if (error) {
                    toast.error(error.message, DATA_TOAST)
                }
                setProfil(data)
            } catch (error) {
                toast.error(error.message, DATA_TOAST)
            } finally {
                setIsLoading(false)
            }
        }

        fetchProfil()
    }, [id])

    useEffect(() => {
        const fetchSport = async () => {
            if (!profil?.id) return // Vérification pour éviter l'erreur bigint undefined

            try {
                setIsLoadingSport(true)
                const { data, error } = await supabase
                    .from('like')
                    .select(
                        'sports_who_like(id, name, categories, description, image_url, slug)'
                    )
                    .eq('user_who_like', profil.id)
                if (error) {
                    toast.error(error.message, DATA_TOAST)
                } else {
                    const sports = data.map((item) => item.sports_who_like)
                    setSport(sports)
                }
            } catch (error) {
                toast.error(error.message, DATA_TOAST)
            } finally {
                setIsLoadingSport(false)
            }
        }

        fetchSport()
    }, [profil])
    console.log(sport)
    console.log(profil)
    return (
        <>
            {isLoading && isLoadingSport && (
                <div className="flex justify-center items-center h-screen">
                    <Loading />
                </div>
            )}
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
                </div>
            </div>
            <SectionEventHome
                titre={'Favoris'}
                sports={sport}
                type={'picture'}
                icons={'like'}
                isLoading={isLoadingSport}
                filtre={true}
            />
            <Footer />
        </>
    )
}

export default Profil
