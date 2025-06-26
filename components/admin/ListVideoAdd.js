import { ArticleContextApi } from '@/context/articleContext'
import { useEffect, useState } from 'react'
import Loading from '../Loading'
import { toast } from 'react-toastify'
import DATA_TOAST from '@/app/utils/constant/toast'
import { supabase } from '@/lib/initSupabase'

const ListVideoAdd = ({ profil }) => {
    const { updateVideo, updateListeVideoSports, deleteVideo } =
        ArticleContextApi()
    const [sports, setSports] = useState()
    const [loading, setIsLoading] = useState(true)

    const fetchAllSports = async () => {
        try {
            const { data, error } = await supabase.from('videos').select()
            if (error) {
                toast.error(error, DATA_TOAST)
            }
            setSports(data)
        } catch (e) {
            toast.error('errur de réception des sports : ' + e, DATA_TOAST)
            throw new Error('errur de réception des sports : ' + e)
        } finally {
            setIsLoading(false)
        }
    }
    useEffect(() => {
        fetchAllSports()
    }, [updateListeVideoSports])
    if (!sports) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loading />
            </div>
        )
    }
    // const deleteVideo = async (id, videoUrl) => {
    //     try {
    //         const { error } = await supabase
    //             .from('videos')
    //             .delete()
    //             .eq('id', id)

    //         let path = videoUrl
    //         path = path.replace(
    //             `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/videos/`,
    //             ''
    //         )

    //         // on supprime lavidéo dans le bucket
    //         const { error: erroBucket } = await supabase.storage
    //             .from('videos')
    //             .remove([path])
    //         if (erroBucket) {
    //             toast.error(
    //                 'Erreur à la suppression de la vidéo dans le bucket ' +
    //                     erroBucket.message,
    //                 DATA_TOAST
    //             )
    //             return
    //         }

    //         if (error) {
    //             toast.error(
    //                 'Erreur à la suppression de la vidéo ' + error.message,
    //                 DATA_TOAST
    //             )
    //             return
    //         }
    //         toast.success('Vidéo supprimé avec succès !', DATA_TOAST)
    //         updateVideo()
    //     } catch (e) {
    //         toast.error(e, DATA_TOAST)
    //     }
    // }

    return (
        <>
            <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded-2xl shadow-xl">
                <h1 className="text-center font-bold">
                    List des vidéos ajouter
                </h1>
                {sports.length == 0 ? (
                    <p className="text-center text-gray-500">
                        Aucune vidéo ajouter.
                    </p>
                ) : (
                    <div className="space-y-6">
                        {sports.map((sport, index) => (
                            <div
                                key={index}
                                className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-gray-50 p-4 rounded-xl shadow hover:shadow-md transition"
                            >
                                <video
                                    controls
                                    width="302"
                                    className="rounded-xl shadow-md"
                                >
                                    <source
                                        src={sport.link_video}
                                        type="video/mp4"
                                    />
                                    Votre navigateur ne supporte pas la lecture
                                    vidéo.
                                </video>

                                <div className="flex-1">
                                    <h3 className="text-xl font-semibold text-indigo-700">
                                        {sport.name}
                                    </h3>
                                </div>
                                <button
                                    onClick={() =>
                                        deleteVideo(sport.id, sport.link_video)
                                    }
                                    className={`mt-2 sm:mt-0 ${
                                        sport.id_admin_who_add == profil.id
                                            ? 'bg-red-500 hover:bg-red-600 cursor-pointer'
                                            : 'bg-red-300 '
                                    }  text-white font-semibold px-4 py-2 rounded-xl`}
                                    disabled={
                                        sport.id_admin_who_add !== profil.id
                                    }
                                >
                                    Supprimer
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}

export default ListVideoAdd
