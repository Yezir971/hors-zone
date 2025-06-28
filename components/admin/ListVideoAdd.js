import { ArticleContextApi } from '@/context/articleContext'
import Loading from '../Loading'
import SectionEventHome from '../home/SectionEventHome'

const ListVideoAdd = ({ profil }) => {
    const { video, isLoadingVideo } = ArticleContextApi()

    if (!video) {
        return (
            <div className="flex justify-center items-center h-screen mb-[100px]">
                <Loading />
            </div>
        )
    }

    return (
        <>
            <div className="mb-[100px]">
                <SectionEventHome
                    sports={video}
                    titre={'Liste des vidéos'}
                    type={'video'}
                    filtre={true}
                    profil={profil}
                    isLoading={!isLoadingVideo}
                />
            </div>
        </>
    )
}

export default ListVideoAdd
