import { supabase } from '@/lib/initSupabase'
import { useEffect, useState } from 'react'
import Loading from '../Loading'
import { ArticleContextApi } from '@/context/articleContext'
import { toast } from 'react-toastify'
import DATA_TOAST from '@/app/utils/constant/toast'
import SectionEventHome from '../home/SectionEventHome'

const ListSportsAdd = ({ profil }) => {
    const { sports, isLoadingSports } = ArticleContextApi()

    if (!sports) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loading />
            </div>
        )
    }
    return (
        <>
            <SectionEventHome
                sports={sports}
                titre={'Tous les évènements'}
                type={'picture'}
                filtre={true}
                profil={profil}
                isLoading={!isLoadingSports}
            />
        </>
    )
}

export default ListSportsAdd
