'use client'
import HeroBanner from '@/components/home/HeroBanner'
import SectionEventHome from '@/components/home/SectionEventHome'
import Loading from '@/components/Loading'
import { ArticleContextApi } from '@/context/articleContext'
import { authContextApi } from '@/context/authContext'
import Footer from '@/components/footer/Footer'
import { useState } from 'react'
import { useEffect } from 'react'

export default function Home() {
    const { isLoadingUser, profil } = authContextApi()
    const { sports, isLoadingSports, isLoadingVideo, video } =
        ArticleContextApi()

    const [videoReverse, setVideoReverse] = useState([])

    useEffect(() => {
        setVideoReverse(video.reverse())
    }, [video])

    if (isLoadingUser && !isLoadingSports) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loading />
            </div>
        )
    }

    return (
        <>
            <HeroBanner
                titre={'Explore le sport autrement !'}
                description={'Des sports méconnus à vivre près de chez vous.'}
                subDescription={"Change de zone. Vis l'aventure."}
            />
            <main className="flex flex-col lg:px-[163px] px-5 gap-[52px] my-[72px] ">
                <SectionEventHome
                    sports={videoReverse}
                    titre={'Actualités'}
                    type={'video'}
                    filtre={false}
                    infiniteScroll={false}
                    showMore={'/reportages'}
                    labelShowMore={'Tout afficher'}
                    profil={profil}
                    isLoading={!isLoadingVideo}
                />
                <SectionEventHome
                    sports={sports}
                    titre={'Prochaines compétitions'}
                    type={'picture'}
                    filtre={false}
                    infiniteScroll={false}
                    profil={profil}
                    showMore={'/competitions'}
                    labelShowMore={'Tout afficher'}
                    isLoading={!isLoadingSports}
                />
            </main>
            <Footer />
        </>
    )
}
