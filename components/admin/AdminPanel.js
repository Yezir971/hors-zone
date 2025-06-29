'use client'

import { useEffect, useRef, useState } from 'react'
import { supabase } from '@/lib/initSupabase'
import { toast } from 'react-toastify'
import DATA_TOAST from '@/app/utils/constant/toast'
import { ArticleContextApi } from '@/context/articleContext'
import toSlug from '@/utils/slug'
import Loading from '../Loading'
import { FaUpload } from 'react-icons/fa'

export default function AdminPanel({ profil }) {
    const [uploading, setUploading] = useState(false)
    const [imageUrl, setImageUrl] = useState(null)
    const [dataForm, setDataForm] = useState({})
    const { update } = ArticleContextApi()
    const [showDropdown, setShowDropdown] = useState(false)
    const [categories, setCategories] = useState([])
    const formRef = useRef(null)
    const handleChange = (e) => {
        const { name, value, files } = e.target
        setDataForm((prevState) => ({
            ...prevState,

            [name]: name == 'fileName' ? files : value,
        }))
    }

    const handleCheckboxChange = (e) => {
        const { value } = e.target
        if (categories && categories.includes(value)) {
            setCategories(categories.filter((category) => category !== value))
        } else {
            setCategories([...(categories || []), value])
        }
    }
    const geocodeAddress = async (address) => {
        const response = await fetch(
            `https://api.opencagedata.com/geocode/v1/json?q=${address}&key=${process.env.NEXT_PUBLIC_LOCATION_API_KEY}`
        )
        const data = await response.json()

        if (!response.ok) {
            console.error('Erreur HTTP:', response.status, response.statusText)
            throw new Error(`Nominatim Error: ${response.status}`)
        }

        return {
            lat: data.results[0]['geometry'].lat,
            long: data.results[0]['geometry'].lng,
        }
    }

    const isValideDateEndStart = (dateStart, dateEnd) => {
        let start = new Date(dateStart)
        let end = new Date(dateEnd)
        return start <= end
    }

    const isValideDateStart = (dateStart) => {
        let now = new Date()
        let start = new Date(dateStart)

        now.setHours(0, 0, 0, 0)
        start.setHours(0, 0, 0, 0)
        return now <= start
    }

    const handleUpload = async (event) => {
        event.preventDefault()
        if (
            !isValideDateEndStart(dataForm['date_start'], dataForm['date_end'])
        ) {
            toast.error(
                'La date de début ne peut pas être supérieur à la date de fin.',
                DATA_TOAST
            )
            return
        }
        if (!isValideDateStart(dataForm['date_start'])) {
            toast.error(
                'La date de début ne peut pas être inférieure à la date actuelle.',
                DATA_TOAST
            )
            return
        }

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
                .from('sports')
                .upload(filePath, file)

            if (urlError) throw urlError

            let locationData = await geocodeAddress(dataForm['localisation'])

            if (!locationData) {
                toast.error(
                    "Adresse introuvable vérifiée l'orthographe de l'adresse",
                    DATA_TOAST
                )
                return
            }
            const { error: insertError } = await supabase
                .from('sports')
                .insert([
                    {
                        name: dataForm['titre'],
                        sub_title: dataForm['sous_titre'],
                        categories: categories,
                        city: dataForm['localisation'],
                        description: dataForm['description'],
                        id_admin_who_add: profil.id,
                        image_url: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${urlData.fullPath}`,
                        date_start: dataForm['date_start'],
                        date_end: dataForm['date_end'],
                        long: locationData.long,
                        lat: locationData.lat,
                        slug: toSlug(dataForm['titre']),
                    },
                ])
            if (insertError) {
                if (
                    insertError.message ==
                    'duplicate key value violates unique constraint "sports_slug_key"'
                ) {
                    toast.error(
                        `Un article du nom de "${dataForm['titre']}" existe déjà veuillez trouver un autre nom de sport.`,
                        DATA_TOAST
                    )
                    return
                }
                toast.error(
                    `Erreur base de données : ' + ${insertError.message}`,
                    DATA_TOAST
                )
                throw new Error(
                    'Erreur base de données : ' + insertError.message
                )
            }
            setImageUrl(urlData.publicUrl)
            toast.success('Événement ajouté avec succès', DATA_TOAST)
            update()
            setDataForm({})
            setCategories([])
            formRef.current?.reset()
        } catch (error) {
            toast.error("Erreur lors de l'upload: " + error.message, DATA_TOAST)
            return
        } finally {
            setUploading(false)
        }
    }

    return (
        <div className="max-w-2xl  mx-auto mt-10">
            <h2 className="text-center mb-5 font-bold text-2xl">Admin</h2>
            <p className="text-center  font-bold ">Ajouter un sport</p>

            <form
                ref={formRef}
                onSubmit={handleUpload}
                className="max-w-2xl mx-auto mt-10  bg-[var(--nuance-de-blanc-1)] rounded-2xl shadow-xl p-6"
            >
                {/* Label */}

                <div className="relative">
                    <label
                        className="block mb-2 top-3/4 left-1/2 -translate-x-1/2 text-center -translate-y-1/2 lg:text-sm text-xs font-medium absolute text-[var(--text-color)] "
                        htmlFor="dropzone-file"
                    >
                        Téléverser une image (maximum 50Mo)
                    </label>
                    <FaUpload className=" lg:text-5xl text-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute text-[var(--text-color)]" />

                    {/* Input file */}
                    <input
                        className="border cursor-pointer mb-5 border-dashed h-36 border-[var(--color-border-input-admin)] bg-[var(--color-background-input-admin)] text-[var(--text-color)] text-sm rounded-lg  block w-full p-2.5"
                        aria-describedby="user_avatar_help"
                        id="dropzone-file"
                        type="file"
                        accept="image/*"
                        name="fileName"
                        onChange={handleChange}
                        disabled={uploading}
                    />
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="titre"
                        className="block mb-2 text-sm font-medium text-[var(--text-color)]"
                    >
                        Titre du sport
                    </label>
                    <input
                        type="text"
                        id="titre"
                        name="titre"
                        onChange={handleChange}
                        className="border placeholder:text-[var(--placeholder-color)] text-[var(--text-color)] border-[var(--color-border-input-admin)] bg-[var(--color-background-input-admin)] text-sm rounded-lg  block w-full p-2.5"
                        placeholder="Aqua poney"
                        required
                    />
                </div>

                <div className="mb-5">
                    <label
                        htmlFor="sous_titre"
                        className="block mb-2 text-sm font-medium text-[var(--text-color)]"
                    >
                        Sous titre du sport
                    </label>
                    <input
                        type="text"
                        id="sous_titre"
                        name="sous_titre"
                        onChange={handleChange}
                        className="border placeholder:text-[var(--placeholder-color)] text-[var(--text-color)] border-[var(--color-border-input-admin)] bg-[var(--color-background-input-admin)] text-sm rounded-lg  block w-full p-2.5"
                        placeholder="Aqua poney"
                        required
                    />
                </div>

                {/* dropdown */}
                <button
                    id="dropdownBgHoverButton"
                    data-dropdown-toggle="dropdownBgHover"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
                    }  w-48 bg-white absolute rounded-lg shadow-sm dark:bg-gray-700`}
                >
                    <ul
                        className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200"
                        aria-labelledby="dropdownBgHoverButton"
                    >
                        <li>
                            <div className="flex items-center p-2 rounded-sm hover:bg-gray-100 dark:hover:bg-gray-600">
                                <input
                                    id="checkbox-item-4"
                                    type="checkbox"
                                    value="Quidditch"
                                    onChange={handleCheckboxChange}
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                />
                                <label
                                    htmlFor="checkbox-item-4"
                                    className="w-full ms-2 text-sm font-medium text-gray-900 rounded-sm dark:text-gray-300"
                                >
                                    Quidditch
                                </label>
                            </div>
                        </li>
                        <li>
                            <div className="flex items-center p-2 rounded-sm hover:bg-gray-100 dark:hover:bg-gray-600">
                                <input
                                    id="checkbox-item-5"
                                    type="checkbox"
                                    value="Sabre Laser"
                                    onChange={handleCheckboxChange}
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                />
                                <label
                                    htmlFor="checkbox-item-5"
                                    className="w-full ms-2 text-sm font-medium text-gray-900 rounded-sm dark:text-gray-300"
                                >
                                    Sabre Laser
                                </label>
                            </div>
                        </li>
                        <li>
                            <div className="flex items-center p-2 rounded-sm hover:bg-gray-100 dark:hover:bg-gray-600">
                                <input
                                    id="checkbox-item-6"
                                    type="checkbox"
                                    value="Tir à l'arc équestre"
                                    onChange={handleCheckboxChange}
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                />
                                <label
                                    htmlFor="checkbox-item-6"
                                    className="w-full ms-2 text-sm font-medium text-gray-900 rounded-sm dark:text-gray-300"
                                >
                                    Tir à l'arc équestre
                                </label>
                            </div>
                            <div className="flex items-center p-2 rounded-sm hover:bg-gray-100 dark:hover:bg-gray-600">
                                <input
                                    id="checkbox-item-7"
                                    type="checkbox"
                                    value="Yoga aérien"
                                    onChange={handleCheckboxChange}
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                />
                                <label
                                    htmlFor="checkbox-item-7"
                                    className="w-full ms-2 text-sm font-medium text-gray-900 rounded-sm dark:text-gray-300"
                                >
                                    Yoga aérien
                                </label>
                            </div>
                        </li>
                    </ul>
                </div>

                {/* enddropdown */}

                <div className="mb-5">
                    <label
                        htmlFor="localisation"
                        className="block my-5 mb-2 text-sm font-medium text-[var(--text-color)]"
                    >
                        Localisation
                    </label>
                    <input
                        type="text"
                        id="localisation"
                        name="localisation"
                        onChange={handleChange}
                        className="border placeholder:text-[var(--placeholder-color)] text-[var(--text-color)] border-[var(--color-border-input-admin)] bg-[var(--color-background-input-admin)] text-sm rounded-lg  block w-full p-2.5"
                        placeholder="	52 Rue Verdun 75012"
                        required
                    />
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="date_start"
                        className="block mb-2 text-sm font-medium text-[var(--text-color)]"
                    >
                        Date de début
                    </label>
                    <input
                        type="date"
                        id="date_start"
                        name="date_start"
                        onChange={handleChange}
                        className="border placeholder:text-[var(--placeholder-color)] text-[var(--text-color)] border-[var(--color-border-input-admin)] bg-[var(--color-background-input-admin)] text-sm rounded-lg  block w-full p-2.5"
                        required
                    />
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="dateEnd"
                        className="block mb-2 text-sm font-medium text-[var(--text-color)]"
                    >
                        Date de fin
                    </label>
                    <input
                        type="date"
                        id="dateEnd"
                        name="date_end"
                        onChange={handleChange}
                        className="border placeholder:text-[var(--placeholder-color)] text-[var(--text-color)] border-[var(--color-border-input-admin)] bg-[var(--color-background-input-admin)] text-sm rounded-lg  block w-full p-2.5"
                        required
                    />
                </div>
                <label
                    htmlFor="message"
                    className="block mb-2 text-sm font-medium text-[var(--text-color)]"
                >
                    Description du sport
                </label>
                <textarea
                    id="message"
                    rows="4"
                    name="description"
                    onChange={handleChange}
                    className="border placeholder:text-[var(--placeholder-color)] text-[var(--text-color)] border-[var(--color-border-input-admin)] bg-[var(--color-background-input-admin)] text-sm rounded-lg  block w-full p-2.5"
                    placeholder="Description"
                ></textarea>
                <button
                    type="submit"
                    disabled={uploading}
                    className="text-white mt-[19px] bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    {uploading ? <Loading /> : 'Ajouter'}
                </button>
            </form>
        </div>
    )
}
