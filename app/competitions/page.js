'use client'
import HeroBanner from '@/components/home/HeroBanner'
import SectionEventHome from '@/components/home/SectionEventHome'
import Loading from '@/components/Loading'
import { ArticleContextApi } from '@/context/articleContext'
import { authContextApi } from '@/context/authContext'
import Footer from '@/components/footer/Footer'

const Competitions = () => {
    const { isLoadingUser, profil } = authContextApi()
    const { sports, isLoadingSports } = ArticleContextApi()

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
                    sports={sports}
                    titre={'Les compétitions insolites'}
                    type={'picture'}
                    filtre={true}
                    infiniteScroll={true}
                    profil={profil}
                    isLoading={!isLoadingSports}
                />
            </main>
            <Footer />
        </>
    )
}

export default Competitions
