import { ArticleContextApi } from '@/context/articleContext'
import { useState } from 'react'
import Loading from '../Loading'
import SectionEventHome from '../home/SectionEventHome'

const ListVideoAdd = ({ profil }) => {
    const { video } = ArticleContextApi()
    const [loading, setIsLoading] = useState(true)

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
                />
            </div>
        </>
    )
}

export default ListVideoAdd
