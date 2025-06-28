'use client'
import HeroBanner from '@/components/home/HeroBanner'
import SectionEventHome from '@/components/home/SectionEventHome'
import Loading from '@/components/Loading'
import { ArticleContextApi } from '@/context/articleContext'
import { authContextApi } from '@/context/authContext'
import Footer from '@/components/footer/Footer'

const Reportages = () => {
    const { isLoadingUser, profil } = authContextApi()
    const { isLoadingSports, isLoadingVideo, video } = ArticleContextApi()

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
                titre={'Envie de nouveauté ? '}
                description={
                    'Découvrez un nouveau sport insolite chaque semaine avec Hors Zone, le reportage qui te fera changer d’air.'
                }
                subDescription={''}
            />
            <main className="flex flex-col lg:px-[163px] px-5 gap-[52px] my-[72px]">
                <SectionEventHome
                    sports={video}
                    titre={'Derniers découvertes'}
                    type={'video'}
                    filtre={false}
                    infiniteScroll={false}
                    profil={profil}
                    isLoading={!isLoadingVideo}
                />

                <SectionEventHome
                    sports={video}
                    titre={'À voir aussi'}
                    type={'video'}
                    filtre={true}
                    infiniteScroll={false}
                    profil={profil}
                    isLoading={!isLoadingVideo}
                />
            </main>
            <Footer />
        </>
    )
}

export default Reportages
