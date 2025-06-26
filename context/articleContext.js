'use client'

import DATA_TOAST from '@/app/utils/constant/toast'
import { supabase } from '@/lib/initSupabase'
import { toast } from 'react-toastify'

const { createContext, useState, useContext, useEffect } = require('react')

const ArticleContext = createContext()

const ArticleProvider = ({ children }) => {
    const [sports, setSports] = useState([])
    const [isLoadingSports, setIsLoadingSports] = useState(false)
    const [isLoadingVideo, setIsLoadingVideo] = useState(false)
    const [video, setVideo] = useState([])
    const [updateListSports, setUpdatelistSports] = useState(false)
    const [updateListeVideoSports, setUpdateListeVideoSports] = useState(false)

    const update = () => {
        setUpdatelistSports(!updateListSports)
        fetchDataEvent()
    }
    const updateVideo = () => {
        setUpdateListeVideoSports(!updateListeVideoSports)
        fetchDataEvent()
    }

    const fetchDataEvent = async () => {
        try {
            const { data, error } = await supabase.from('sports').select()

            if (error) {
                console.error('Erreur Supabase:', error.message)
                return []
            }

            setSports(data)
        } catch (err) {
            console.error('Erreur inattendue:', err)
            return []
        } finally {
            setIsLoadingSports(true)
        }
    }
    const deleteSport = async (id, imageUrl) => {
        try {
            const { error } = await supabase
                .from('sports')
                .delete()
                .eq('id', id)

            let path = imageUrl
            path = path.replace(
                `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/sports/`,
                ''
            )

            // on supprime l'image dans le bucket
            const { error: erroBucket } = await supabase.storage
                .from('sports')
                .remove([path])
            if (erroBucket) {
                toast.error(
                    "Erreur à la suppression de l'image dans le bucket " +
                        erroBucket.erroBucket,
                    DATA_TOAST
                )
                return
            }

            if (error) {
                toast.error(
                    "Erreur à la suppression de l'événement " + error.message,
                    DATA_TOAST
                )
                return
            }
            toast.success('Événement supprimé avec succès !', DATA_TOAST)
            update()
        } catch (e) {
            toast.error(e, DATA_TOAST)
        }
    }
    const deleteVideo = async (id, videoUrl) => {
        try {
            const { error } = await supabase
                .from('videos')
                .delete()
                .eq('id', id)

            let path = videoUrl
            path = path.replace(
                `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/videos/`,
                ''
            )

            // on supprime lavidéo dans le bucket
            const { error: erroBucket } = await supabase.storage
                .from('videos')
                .remove([path])
            if (erroBucket) {
                toast.error(
                    'Erreur à la suppression de la vidéo dans le bucket ' +
                        erroBucket.message,
                    DATA_TOAST
                )
                return
            }

            if (error) {
                toast.error(
                    'Erreur à la suppression de la vidéo ' + error.message,
                    DATA_TOAST
                )
                return
            }
            toast.success('Vidéo supprimé avec succès !', DATA_TOAST)
            updateVideo()
        } catch (e) {
            toast.error(e, DATA_TOAST)
        }
    }
    const fetchVideo = async () => {
        try {
            const { data, error } = await supabase.from('videos').select()

            if (error) {
                console.error('Erreur Supabase:', error.message)
                return []
            }

            setVideo(data)
        } catch (err) {
            console.error('Erreur inattendue:', err)
            return []
        } finally {
            setIsLoadingVideo(true)
        }
    }

    useEffect(() => {
        fetchDataEvent()
        fetchVideo()
    }, [updateListSports, updateListeVideoSports])

    return (
        <>
            <ArticleContext.Provider
                value={{
                    deleteSport,
                    deleteVideo,
                    update,
                    updateListSports,
                    updateVideo,
                    updateListeVideoSports,
                    sports,
                    isLoadingSports,
                    isLoadingVideo,
                    video,
                }}
            >
                {children}
            </ArticleContext.Provider>
        </>
    )
}
export default ArticleProvider
export const ArticleContextApi = () => useContext(ArticleContext)
