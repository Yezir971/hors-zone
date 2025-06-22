'use client'
import HeroBanner from '@/components/home/HeroBanner'
import SectionEventHome from '@/components/home/SectionEventHome'
import Loading from '@/components/Loading'
import { authContextApi } from '@/context/authContext'
import { supabase } from '@/lib/initSupabase'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Home() {
    const router = useRouter()
    const { isAuth, user, isLoadingUser } = authContextApi()
    const [sports, setSports] = useState([])
    const [isLoadingSports, setIsLoadingSports] = useState(false)
    const [isLoadingVideo, setIsLoadingVideo] = useState(false)
    const [video, setVideo] = useState([])
    const fetchDataEvent = async () => {
        try {
            const { data, error } = await supabase.from('sports').select()

            if (error) {
                console.error('Erreur Supabase:', error.message)
                return []
            }

            // return data
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
    // useEffect(() => {
    //     const getData = async () => {
    //         const data = await fetchDataEvent()
    //         await fetchVideo()
    //         setSports(data)
    //     }

    //     getData()
    // }, [])

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
            <main className="px-5">
                <SectionEventHome
                    sports={sports}
                    titre={'Événements à venir'}
                    type={'picture'}
                />
                <SectionEventHome
                    sports={video}
                    titre={'Les Reportages'}
                    type={'video'}
                />
            </main>
        </>
    )
}
