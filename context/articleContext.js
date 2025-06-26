'use client'

import { supabase } from '@/lib/initSupabase'

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
    }
    const updateVideo = () => {
        setUpdateListeVideoSports(!updateListeVideoSports)
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
    }, [])

    return (
        <>
            <ArticleContext.Provider
                value={{
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
