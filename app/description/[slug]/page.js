'use client'
import HeartButton from '@/components/button/HeartButton'
import NotifButton from '@/components/button/NotifButton'
import ShareButton from '@/components/button/ShareButton'
import CommentBlock from '@/components/detail/CommentBlock'
import Map from '@/components/detail/Map'
import SectionEventHome from '@/components/home/SectionEventHome'
import Loading from '@/components/Loading'
import Return from '@/components/return/return'
import { supabase } from '@/lib/initSupabase'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const Description = () => {
    const { slug } = useParams()
    // const sport = sportData[slug]
    const [sport, setSport] = useState()
    const [sportLoad, setSportLoad] = useState(false)
    const router = useRouter()
    const handleBack = () => {
        router.back()
    }

    const fetchOneSport = async () => {
        try {
            const response = await supabase
                .from('sports')
                .select()
                .eq('slug', slug)

            if (response.status !== 200) {
                toast.error(
                    `Errur de réception des sports, le sport ${slug} n\'existe pas : ${e}`,
                    DATA_TOAST
                )
            }
            setSport(response.data[0])
        } catch (error) {
            toast.error(
                'Erreur de connexion, veuillez vérifier votre connexion internet : ' +
                    e,
                DATA_TOAST
            )
            throw new Error(`Le sport ${slug} n'existe pas !`)
        } finally {
            setSportLoad(true)
        }
    }
    useEffect(() => {
        fetchOneSport()
    }, [])

    if (!sportLoad) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loading />
            </div>
        )
    }

    return (
        <>
            <div
                className="bg-[var(--background-color)] mb-[46px] relative h-[80vh] bg-cover bg-center flex items-end justify-start"
                style={{ backgroundImage: `url(${sport.image_url})` }}
            >
                <div className="flex flex-col m-10 gap-8 z-20 text-white ">
                    <h1 className="w-max font-medium text-[14px] bg-white/30 border border-white/30 rounded-full px-5 py-2.5">
                        {sport.name}
                    </h1>
                    <p className="font-semibold text-[24px]">
                        {sport.sub_title}
                    </p>
                    <p className="font-normal text-[14px]">
                        {sport.description}
                    </p>
                </div>

                <div
                    className="absolute left-0 bottom-0 w-full h-5/6"
                    style={{
                        background:
                            'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%)',
                    }}
                />

                <Return />

                <div className="w-auto absolute right-[39px] top-8 flex flex-col items-end gap-4">
                    <HeartButton idSport={sport.id} />
                    <ShareButton />
                    <NotifButton />
                </div>
            </div>

            <div className="mb-[46px] flex flex-col gap-14 rounded-2xl border-[var(--gris-fonce)] border-t-[2px] rounded-t-[50px] p-[39px]">
                <div className="flex justify-between">
                    <p>
                        {sport.date_start} au {sport.date_end}
                    </p>
                    <p>{sport.city}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-14">
                    <div className="w-full h-[400px]">
                        <Map
                            long={sport.long}
                            lat={sport.lat}
                            titre={sport.name}
                        />
                    </div>
                    <div className="">
                        <CommentBlock idSport={sport.id} />
                    </div>
                    <SectionEventHome titre={'On en parle'} type={'picture'} />
                </div>
            </div>
        </>
    )
}
export default Description
