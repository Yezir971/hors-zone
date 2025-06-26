'use client'
import HeroBanner from '@/components/home/HeroBanner'
import SectionEventHome from '@/components/home/SectionEventHome'
import Loading from '@/components/Loading'
import { ArticleContextApi } from '@/context/articleContext'
import { authContextApi } from '@/context/authContext'

const Reportages = () => {
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
                titre={'Envie de nouveauté ? '}
                description={
                    'Découvrez un nouveau sport insolite chaque semaine avec Hors Zone, le reportage qui te fera changer d’air.'
                }
                subDescription={''}
            />
            <main className="px-5 gap-[79px] mt-[92px] mb-[100px]">
                <SectionEventHome
                    sports={video}
                    titre={'Derniers découvertes'}
                    type={'video'}
                    filtre={false}
                    infiniteScroll={false}
                    profil={profil}
                />

                <SectionEventHome
                    sports={video}
                    titre={'A voir aussi'}
                    type={'video'}
                    filtre={true}
                    infiniteScroll={false}
                    profil={profil}
                />
            </main>
        </>
    )
}

export default Reportages
