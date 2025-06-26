import DATA_TOAST from '@/app/utils/constant/toast'
import { supabase } from '@/lib/initSupabase'
import { useRef, useState } from 'react'
import { toast } from 'react-toastify'
import Loading from '../Loading'
import { ArticleContextApi } from '@/context/articleContext'
import { FaUpload } from 'react-icons/fa'

const AdminFormVideo = ({ profil }) => {
    const formRef = useRef(null)
    const [uploading, setUploading] = useState(false)
    const [dataForm, setDataForm] = useState({})
    const [loading, setLoading] = useState(false)
    const [categories, setCategories] = useState([])
    const [showDropdown, setShowDropdown] = useState(false)

    const { updateVideo } = ArticleContextApi()

    const handleCheckboxChange = (e) => {
        const { value } = e.target
        if (categories.includes(value)) {
            setCategories(categories.filter((category) => category !== value))
        } else {
            setCategories([...categories, value])
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setDataForm((prevState) => ({
            ...prevState,

            [name]: value,
            // [name]: name == 'fileName' ? files : value,
        }))
    }
    console.log(dataForm)

    const handleUpload = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            if (!profil) return
            setUploading(true)

            // const file = dataForm.fileName?.[0]

            // if (!file) {
            //     toast.error('Aucun fichier sélectionné', DATA_TOAST)
            //     throw new Error('Aucun fichier sélectionné')
            // }

            // const fileExt = file.name.split('.').pop()
            // const fileName = `${Date.now()}.${fileExt}`
            // const filePath = `uploads/${fileName}`

            // const { error: urlError, data: urlData } = await supabase.storage
            //     .from('videos')
            //     .upload(filePath, file)

            // if (urlError) {
            //     toast.error(
            //         "Erreur au moment de l'upload de la vidéo " +
            //             urlError.message,
            //         DATA_TOAST
            //     )
            //     return
            // }

            const { error: errorVideo } = await supabase.from('videos').insert([
                {
                    created_at: new Date().toISOString(),
                    video_name: dataForm.titre,
                    link_video: dataForm.link_video,
                    // link_video: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${urlData.fullPath}`,
                    id_admin_who_add: profil?.id,
                    description: dataForm.description,
                    categories: categories,
                },
            ])

            if (errorVideo) {
                toast.error(
                    "Erreur au moment de l'upload de la vidéo" +
                        errorVideo.message,
                    DATA_TOAST
                )
                return
            }
            toast.success('Vidéo upload avec succès.', DATA_TOAST)
            updateVideo()
            formRef.current?.reset()
        } catch (error) {
            toast.error(
                'Erreur de connexion avec la base de données, veuillez vérifier votre connexion.' +
                    error.message,
                DATA_TOAST
            )
            return
        } finally {
            setUploading(false)
            setLoading(false)
        }
    }
    return (
        <>
            <div className="max-w-2xl  mx-auto mt-10">
                <h2 className="text-center text-[var(--text-color)] font-bold">
                    Ajouter une vidéo
                </h2>
                <form
                    ref={formRef}
                    onSubmit={handleUpload}
                    className="max-w-2xl mx-auto mt-10  bg-[var(--nuance-de-blanc-1)] rounded-2xl shadow-xl p-6"
                >
                    {/* Label */}
                    {/* <div className="relative">
                        <label
                            className="block mb-2 top-3/4 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm font-medium absolute text-[var(--text-color)] "
                            htmlFor="dropzone-file"
                        >
                            Téléverser une vidéo (maximum 50Mo)
                        </label>
                        <FaUpload className="text-5xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute text-[var(--text-color)]" />
                        <input
                            className="border z-30 mb-5 cursor-pointer border-dashed h-36 border-[var(--color-border-input-admin)] bg-[var(--color-background-input-admin)] text-[var(--text-color)] text-sm rounded-lg  block w-full p-2.5"
                            aria-describedby="user_avatar_help"
                            id="dropzone-file"
                            type="file"
                            accept="video/*"
                            name="fileName"
                            onChange={handleChange}
                            disabled={uploading}
                        />
                    </div> */}

                    <div className="mb-5">
                        <label
                            htmlFor="link_video"
                            className="block mb-2 text-sm font-medium text-[var(--text-color)]"
                        >
                            Lien de la vidéo (youtube)
                        </label>
                        <input
                            type="text"
                            id="link_video"
                            name="link_video"
                            onChange={handleChange}
                            className="border placeholder:text-[var(--text-color)] text-[var(--text-color)] border-[var(--color-border-input-admin)] bg-[var(--color-background-input-admin)] text-sm rounded-lg  block w-full p-2.5"
                            placeholder="https://www.youtube.com/watch?v=os0bfBqS7mo"
                            required
                        />
                    </div>

                    <div className="mb-5">
                        <label
                            htmlFor="titre"
                            className="block mb-2 text-sm font-medium text-[var(--text-color)]"
                        >
                            Titre de la vidéo
                        </label>
                        <input
                            type="text"
                            id="titre"
                            name="titre"
                            onChange={handleChange}
                            className="border placeholder:text-[var(--text-color)] text-[var(--text-color)] border-[var(--color-border-input-admin)] bg-[var(--color-background-input-admin)] text-sm rounded-lg  block w-full p-2.5"
                            placeholder="Aqua poney"
                            required
                        />
                    </div>
                    {/* dropdown */}
                    <button
                        id="dropdownBgHoverButton"
                        data-dropdown-toggle="dropdownBgHover"
                        className="text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        type="button"
                        onClick={() => setShowDropdown(!showDropdown)}
                    >
                        Categories{' '}
                        <svg
                            className="w-2.5 h-2.5 ms-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 10 6"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m1 1 4 4 4-4"
                            />
                        </svg>
                    </button>

                    <div
                        id="dropdownBgHover"
                        className={`z-10 ${
                            !showDropdown && 'hidden'
                        }  w-48 bg-white absolute flex flex-col rounded-lg shadow-sm dark:bg-gray-700`}
                    >
                        <ul
                            className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200"
                            aria-labelledby="dropdownBgHoverButton"
                        >
                            <li>
                                <div className="flex items-center p-2 rounded-sm hover:bg-gray-100 dark:hover:bg-gray-600">
                                    <input
                                        id="checkbox-item-video-4"
                                        type="checkbox"
                                        value="Quidditch"
                                        onChange={handleCheckboxChange}
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                    />
                                    <label
                                        htmlFor="checkbox-item-video-4"
                                        className="w-full ms-2 text-sm font-medium text-gray-900 rounded-sm dark:text-gray-300"
                                    >
                                        Quidditch
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div className="flex items-center p-2 rounded-sm hover:bg-gray-100 dark:hover:bg-gray-600">
                                    <input
                                        id="checkbox-item-video-5"
                                        type="checkbox"
                                        value="Sabre Laser"
                                        onChange={handleCheckboxChange}
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                    />
                                    <label
                                        htmlFor="checkbox-item-video-5"
                                        className="w-full ms-2 text-sm font-medium text-gray-900 rounded-sm dark:text-gray-300"
                                    >
                                        Sabre Laser
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div className="flex items-center p-2 rounded-sm hover:bg-gray-100 dark:hover:bg-gray-600">
                                    <input
                                        id="checkbox-item-video-6"
                                        type="checkbox"
                                        value="Tir à l'arc équestre"
                                        onChange={handleCheckboxChange}
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                    />
                                    <label
                                        htmlFor="checkbox-item-video-6"
                                        className="w-full ms-2 text-sm font-medium text-gray-900 rounded-sm dark:text-gray-300"
                                    >
                                        Tir à l'arc équestre
                                    </label>
                                </div>
                                <div className="flex items-center p-2 rounded-sm hover:bg-gray-100 dark:hover:bg-gray-600">
                                    <input
                                        id="checkbox-item-video-7"
                                        type="checkbox"
                                        value="Yoga aérien"
                                        onChange={handleCheckboxChange}
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                    />
                                    <label
                                        htmlFor="checkbox-item-video-7"
                                        className="w-full ms-2 text-sm font-medium text-gray-900 rounded-sm dark:text-gray-300"
                                    >
                                        Yoga aérien
                                    </label>
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* enddropdown */}

                    <div className="my-5">
                        <label
                            className="block mb-2 text-sm font-medium text-[var(--text-color)]"
                            htmlFor="description"
                        >
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            onChange={handleChange}
                            rows={4}
                            className="border placeholder:text-[var(--text-color)] text-[var(--text-color)] border-[var(--color-border-input-admin)] bg-[var(--color-background-input-admin)] text-sm rounded-lg  block w-full p-2.5"
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
