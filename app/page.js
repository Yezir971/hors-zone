'use client'
import HeroBanner from '@/components/home/HeroBanner'
import SectionEventHome from '@/components/home/SectionEventHome'
import Loading from '@/components/Loading'
import { ArticleContextApi } from '@/context/articleContext'
import { authContextApi } from '@/context/authContext'
import Footer from '@/components/footer/Footer'

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
            <HeroBanner
                titre={'Explorez le sport autrement !'}
                description={
                    'Quidditch, sabre laser, tir à l’arc à cheval, yoga aérien… Hors Zone te fait découvrir des sports insolites et leurs événements près de chez toi.'
                }
                subDescription={'Change de zone. Vis l’aventure.'}
            />
            <main className="px-5 gap-[79px] mt-[92px] mb-[100px]">
                <SectionEventHome
                    sports={sports}
                    titre={'Événements à venir'}
                    type={'picture'}
                    filtre={false}
                    infiniteScroll={false}
                    profil={profil}
                    showMore={'/competitions'}
                    labelShowMore={'Tout afficher'}
                />
                <SectionEventHome
                    sports={video}
                    titre={'Les Reportages'}
                    type={'video'}
                    filtre={false}
                    infiniteScroll={true}
                    showMore={'/reportages'}
                    labelShowMore={'Tout afficher'}
                    profil={profil}
                />
            </main>
            <Footer />
        </>
    )
}
