'use client'
import HeroBanner from '@/components/home/HeroBanner'
import SectionEventHome from '@/components/home/SectionEventHome'
import Loading from '@/components/Loading'
import { ArticleContextApi } from '@/context/articleContext'
import { authContextApi } from '@/context/authContext'

export default function Home() {
    const { isLoadingUser, profil } = authContextApi()
    const { sports, isLoadingSports, isLoadingVideo, video } =
        ArticleContextApi()

    if (isLoadingUser && !isLoadingSports) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loading />
            </div>
        )
    }
    return (
        <>
            <HeroBanner />
            <main className="px-5 gap-[79px] mt-[92px] mb-[100px]">
                <SectionEventHome
                    sports={sports}
                    titre={'Événements à venir'}
                    type={'picture'}
                    filtre={false}
                    infiniteScroll={false}
                    profil={profil}
                />
                <SectionEventHome
                    sports={video}
                    titre={'Les Reportages'}
                    type={'video'}
                    filtre={true}
                    infiniteScroll={true}
                    showMore={'/profil'}
                    labelShowMore={'Voir plus'}
                    profil={profil}
                />
            </main>
        </>
    )
}
