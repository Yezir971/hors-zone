'use client'
import HeartButton from '@/components/button/HeartButton'
import NotifButton from '@/components/button/NotifButton'
import ShareButton from '@/components/button/ShareButton'
import CommentBlock from '@/components/detail/CommentBlock'
import Map from '@/components/detail/Map'
import SectionEventHome from '@/components/home/SectionEventHome'
import Loading from '@/components/Loading'
import Return from '@/components/return/return'
import { ArticleContextApi } from '@/context/articleContext'
import { authContextApi } from '@/context/authContext'
import { supabase } from '@/lib/initSupabase'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Footer from '@/components/footer/Footer'
import truncateDate from '@/utils/truncateDate'

const Description = () => {
    const { slug } = useParams()
    const [sportDataFiltre, setSportDataFiltre] = useState([])
    const [sport, setSport] = useState()
    const [sportLoad, setSportLoad] = useState(false)
    const router = useRouter()
    const { isLoadingUser, profil } = authContextApi()
    const { video, isLoadingVideo } = ArticleContextApi()

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
                    error,
                DATA_TOAST
            )
            throw new Error(`Le sport ${slug} n'existe pas !`)
        } finally {
            setSportLoad(true)
        }
    }

    // Filtrer les vidéos quand sport ou video changent
    useEffect(() => {
        if (sport && video && Array.isArray(video)) {
            const videoFilter = video.filter(
                (videoItem) =>
                    videoItem.categories &&
                    sport.categories &&
                    videoItem.categories.some((cat) =>
                        sport.categories.includes(cat)
                    )
            )
            setSportDataFiltre(videoFilter)
        }
    }, [sport, video])
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
                className="lg:px-[153px] bg-[var(--background-color)]  relative h-[80vh] bg-cover bg-center flex items-end justify-start"
                // className="lg:px-[153px] bg-[var(--background-color)]  relative h-[80vh] bg-cover bg-center flex items-end justify-start"
                style={{ backgroundImage: `url(${sport.image_url})` }}
            >
                <div className="flex flex-col ml-10 mb-[45px] lg:mb-[px] lg:ml-[0px] gap-8 z-20 text-white ">
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
                    <NotifButton profil={profil} sport={sport} />
                </div>
            </div>

            <div className=" flex flex-col gap-[40px] bg-[var(--color-background-container-description)] rounded-2xl border-[var(--gris-fonce)] border-t-[2px] z-10  rounded-t-[50px] pt-[48px] pb-[72px] px-[39px] lg:px-[153px]">
                <div className="flex justify-between  text-sm gap-3.5 lg:text-base">
                    <p>
                        Du {truncateDate(sport.date_start)} au{' '}
                        {truncateDate(sport.date_end)}
                    </p>
                    <p>{sport.city}</p>
                </div>
                <div className="grid grid-cols-1 mb-[11px] md:grid-cols-2 gap-10 ">
                    <div className="w-full h-[400px]">
                        <Map
                            long={sport.long}
                            lat={sport.lat}
                            titre={sport.name}
                        />
                    </div>
                    <div className="w-full h-[400px] ">
                        <CommentBlock idSport={sport.id} />
                    </div>
                </div>
                <SectionEventHome
                    isLoading={!isLoadingVideo}
                    sports={sportDataFiltre}
                    titre={'On en parle'}
                    type={'video'}
                    filtre={false}
                    infiniteScroll={false}
                    profil={profil}
                />
            </div>
            <div className="bg-black h-[100vh] absolute -z-10 top-0 left-0 w-full"></div>

            <Footer />
        </>
    )
}
export default Description
