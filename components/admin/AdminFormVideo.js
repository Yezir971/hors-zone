import DATA_TOAST from '@/app/utils/constant/toast'
import { supabase } from '@/lib/initSupabase'
import { useRef, useState } from 'react'
import { toast } from 'react-toastify'
import Loading from '../Loading'
import { ArticleContextApi } from '@/context/articleContext'

const AdminFormVideo = ({ profil }) => {
    const formRef = useRef(null)
    const [uploading, setUploading] = useState(false)
    const [dataForm, setDataForm] = useState({})
    const [loading, setLoading] = useState(false)
    const { updateVideo } = ArticleContextApi()

    const handleChange = (e) => {
        const { name, value, files } = e.target
        setDataForm((prevState) => ({
            ...prevState,

            [name]: name == 'fileName' ? files : value,
        }))
    }

    const handleUpload = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            if (!profil) return
            setUploading(true)

            const file = dataForm.fileName?.[0]

            if (!file) {
                toast.error('Aucun fichier sélectionné', DATA_TOAST)
                throw new Error('Aucun fichier sélectionné')
            }

            const fileExt = file.name.split('.').pop()
            const fileName = `${Date.now()}.${fileExt}`
            const filePath = `uploads/${fileName}`

            const { error: urlError, data: urlData } = await supabase.storage
                .from('videos')
                .upload(filePath, file)

            if (urlError) throw urlError

            const { error: errorVideo } = await supabase.from('videos').insert([
                {
                    created_at: new Date().toISOString(),
                    video_name: dataForm.titre,
                    link_video: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${urlData.fullPath}`,
                    id_admin_who_add: profil?.id,
                },
            ])

            if (errorVideo) {
                toast.error(
                    "Erreur au moment de l'upload de la vidéo" +
                        errorVideo.message,
                    DATA_TOAST
                )
                console.table(errorVideo)
                console.log(errorVideo)
                return
            }
            toast.success('Vidéo upload avec succès.', DATA_TOAST)
            updateVideo()
        } catch (error) {
            toast.error(
                'Erreur de connexion avec la base de données, veuillez vérifier votre connexion.' +
                    error.message,
                DATA_TOAST
            )
            console.log(error)
        } finally {
            setUploading(false)
            formRef.current?.reset()
            setLoading(false)
        }
    }
    return (
        <>
            <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded-2xl shadow-xl">
                <h2 className="text-center border-amber-50 font-bold">
                    Ajouter une vidéo
                </h2>
                <form
                    ref={formRef}
                    onSubmit={handleUpload}
                    className="max-w-2xl mx-auto mt-10 bg-indigo-500 rounded-2xl shadow-xl p-6"
                >
                    {/* Label */}
                    <label
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        htmlFor="dropzone-file"
                    >
                        vidéo
                    </label>

                    {/* Input file */}
                    <input
                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        aria-describedby="video"
                        id="dropzone-file"
                        type="file"
                        accept="video/*"
                        name="fileName"
                        onChange={handleChange}
                        disabled={uploading}
                    />

                    <div className="mb-5">
                        <label
                            htmlFor="titre"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Titre de la vidéo
                        </label>
                        <input
                            type="text"
                            id="titre"
                            name="titre"
                            onChange={handleChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Aqua poney"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Submit
                    </button>
                    {loading && <Loading />}
                </form>
            </div>
        </>
    )
}
export default AdminFormVideo
