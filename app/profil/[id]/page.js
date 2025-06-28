// /app/profil/[id]/page.js
import { supabase } from '@/lib/initSupabase'
import Image from 'next/image'
import Link from 'next/link'
import { FaInstagram, FaTiktok, FaFacebook } from 'react-icons/fa'
import SectionEventHome from '@/components/home/SectionEventHome'
import Footer from '@/components/footer/Footer'
import Return from '@/components/return/return'

export async function generateMetadata({ params }) {
    return {
        title: `Profil - ${params.id}`,
    }
}

export default async function ProfilPage({ params }) {
    const id = params.id

    // Fetch profil (serveur)
    const { data: profil, error: profilError } = await supabase
        .from('profil')
        .select()
        .eq('id', id)
        .single()

    // Fetch sports likés
    const { data: likeData, error: sportError } = await supabase
        .from('like')
        .select(
            'sports_who_like(id, name, categories, description, image_url, slug)'
        )
        .eq('user_who_like', id)

    const sports = likeData?.map((item) => item.sports_who_like) || []
    const errorMessage = profilError?.message || sportError?.message || null

    return (
        <>
            <div className="h-4/12 lg:h-96 flex justify-center items-center shadow-xl/20 p-10 text-white bg-[linear-gradient(90deg,_#0a5197_35%,_#0080ff_100%)] rounded-b-[50px]">
                <Return />
                <div className="text-center gap-[62px]">
                    <div className="flex flex-col justify-center items-center gap-2.5">
                        <Image
                            src={
                                profil?.avatar_url?.trim() ||
                                '/images/icons/user.svg'
                            }
                            alt="avatar"
                            width={100}
                            height={100}
                            className="rounded-full"
                        />
                        <p className="text-2xl font-normal">
                            {profil?.pseudo || 'Utilisateur inconnu'}
                        </p>
                    </div>

                    <div className="flex my-[62px] justify-center items-center gap-[33px]">
                        {profil?.link_instagram && (
                            <Link
                                href={profil.link_instagram}
                                className="text-white"
                            >
                                <FaInstagram />
                            </Link>
                        )}
                        {profil?.link_tiktok && (
                            <Link
                                href={profil.link_tiktok}
                                className="text-white"
                            >
                                <FaTiktok />
                            </Link>
                        )}
                        {profil?.link_facebook && (
                            <Link
                                href={profil.link_facebook}
                                className="text-white"
                            >
                                <FaFacebook />
                            </Link>
                        )}
                    </div>
                </div>
            </div>
            <main className="flex flex-col lg:px-[163px] px-5 gap-[52px] my-[72px]">
                <SectionEventHome
                    titre="Favoris"
                    sports={sports}
                    type="picture"
                    icons="like"
                    isLoading={false}
                />
            </main>

            <Footer />

            {errorMessage && (
                <div className="text-red-500 text-center mt-4">
                    ⚠️ Une erreur s’est produite : {errorMessage}
                </div>
            )}
        </>
    )
}
