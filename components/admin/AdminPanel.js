'use client'

import { useEffect, useRef, useState } from 'react'
import { supabase } from '@/lib/initSupabase'
import { toast } from 'react-toastify'
import DATA_TOAST from '@/app/utils/constant/toast'
import { ArticleContextApi } from '@/context/articleContext'
import toSlug from '@/utils/slug'

export default function AdminPanel({ profil }) {
    const [uploading, setUploading] = useState(false)
    const [imageUrl, setImageUrl] = useState(null)
    const [dataForm, setDataForm] = useState({})
    const { update } = ArticleContextApi()
    const formRef = useRef(null)
    const handleChange = (e) => {
        const { name, value, files } = e.target
        setDataForm((prevState) => ({
            ...prevState,

            [name]: name == 'fileName' ? files : value,
        }))
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
        } catch (error) {
            toast.error('Erreur lors de l’upload: ' + error, DATA_TOAST)
        } finally {
            formRef.current?.reset()
            setUploading(false)
        }
    }

    return (
        <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded-2xl shadow-xl">
            <h1 className="text-center border-amber-50 font-bold">Admin</h1>

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
                    Upload file
                </label>

                {/* Input file */}
                <input
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    aria-describedby="user_avatar_help"
                    id="dropzone-file"
                    type="file"
                    accept="image/*"
                    name="fileName"
                    onChange={handleChange}
                    disabled={uploading}
                />
                <div className="mb-5">
                    <label
                        htmlFor="titre"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Titre sport
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
                <div className="mb-5">
                    <label
                        htmlFor="localisation"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Localisation
                    </label>
                    <input
                        type="text"
                        id="localisation"
                        name="localisation"
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="	52 Rue Verdun 75012"
                        required
                    />
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="date_start"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Date de début
                    </label>
                    <input
                        type="date"
                        id="date_start"
                        name="date_start"
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                    />
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="dateEnd"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Date de fin
                    </label>
                    <input
                        type="date"
                        id="dateEnd"
                        name="date_end"
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                    />
                </div>
                <label
                    htmlFor="message"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    Description du sport
                </label>
                <textarea
                    id="message"
                    rows="4"
                    name="description"
                    onChange={handleChange}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Description"
                ></textarea>
                <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Submit
                </button>
            </form>
        </div>
    )
}
