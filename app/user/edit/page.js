'use client'

import DATA_TOAST from '@/app/utils/constant/toast'
import Loading from '@/components/Loading'
import Return from '@/components/return/return'
import { authContextApi } from '@/context/authContext'
import { supabase } from '@/lib/initSupabase'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'

const EditProfil = () => {
    const { profil, isAuth, isLoadingUser, user } = authContextApi()
    const [uploading, setUploading] = useState(false)
    const formRef = useRef(null)
    const [dataForm, setDataForm] = useState(null)
    const [flagAvatar, setFlagAvatar] = useState()
    const router = useRouter()
    useEffect(() => {
        if (profil) {
            setFlagAvatar(profil.avatar_url)
            setDataForm({
                name: profil.name || '',
                last_name: profil.last_name || '',
                pseudo: profil.pseudo || '',
                bio: profil.bio || '',
                link_facebook: profil.link_facebook || '',
                link_instagram: profil.link_instagram || '',
                link_tiktok: profil.link_tiktok || '',
                avatar_url: profil.avatar_url || '',
            })
        }
    }, [profil])

    const handleBack = () => {
        router.push('/profil')
    }

    useEffect(() => {
        if (!isLoadingUser && !isAuth) {
            router.push('/login')
        }
    }, [isAuth, isLoadingUser, router])

    const deleteArticle = async (imageUrl) => {
        try {
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
                        erroBucket,
                    DATA_TOAST
                )
                return
            }
        } catch (e) {
            toast.error(e, DATA_TOAST)
        }
    }

    const handleChange = (e) => {
        const { name, value, files } = e.target
        setDataForm((prevState) => ({
            ...prevState,

            [name]: name == 'avatar_url' ? files : value,
        }))
    }

    const handleUpload = async (e) => {
        e.preventDefault()
        try {
            setUploading(true)
            const file = dataForm.avatar_url?.[0]
            let uploadedImageUrl = null

            if (file) {
                const fileExt = file.name.split('.').pop()
                const fileName = `${Date.now()}.${fileExt}`
                const filePath = `avatars/${fileName}`

                const { error: urlError, data: urlData } =
                    await supabase.storage.from('sports').upload(filePath, file)

                if (urlError) {
                    toast.error(
                        `Format de l'image incompatible : ${urlError}`,
                        DATA_TOAST
                    )
                    return
                }

                // Supprimer l'ancienne image si elle existe
                if (flagAvatar !== null) {
                    await deleteArticle(flagAvatar)
                }

                // Construire l'URL complète de l'image
                uploadedImageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/sports/${urlData.path}`
            }

            // Mettre à jour le profil avec ou sans nouvelle image
            const updateData = uploadedImageUrl
                ? { ...dataForm, avatar_url: uploadedImageUrl }
                : { ...dataForm }

            const { error: insertError } = await supabase
                .from('profil')
                .update(updateData)
                .eq('id', profil?.id)

            if (insertError) {
                toast.error(
                    `Erreur base de données : ${insertError.message}`,
                    DATA_TOAST
                )
                return
            }

            toast.success('Profil mis à jour avec succès', DATA_TOAST)
        } catch (error) {
            toast.error(
                'Erreur lors de la mise à jour du compte : ' + error,
                DATA_TOAST
            )
        } finally {
            setUploading(false)
        }
    }

    // Afficher un loading tant qu'on ne sait pas si l'utilisateur est connecté
    if (isLoadingUser) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loading />
            </div>
        )
    }

    // Si l'utilisateur n'est pas connecté, ne rien afficher (redirection en cours)
    if (!isAuth) {
        return null
    }

    return (
        <>
            <div className="min-h-screen bg-gradient-to-br  flex items-center justify-center p-6">
                <div
                    onClick={handleBack}
                    className="absolute left-8 top-8 cursor-pointer text-black"
                >
                    <Image
                        src="/images/icons/arrow-left.svg"
                        alt="arrow-left"
                        width={20}
                        height={20}
                    />
                </div>
                <div className=" shadow-2xl rounded-2xl max-w-lg w-full p-10">
                    <h2 className="text-3xl font-extrabold text-[var(--text-color-footer)] mb-8 text-center">
                        Modifier le profil
                    </h2>

                    <form
                        ref={formRef}
                        onSubmit={handleUpload}
                        className="space-y-6"
                    >
                        <div>
                            <label
                                className="block text-gray-700 font-semibold mb-2"
                                htmlFor="name"
                            >
                                Nom
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={dataForm?.name || ''}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-indigo-300 transition"
                            />
                        </div>

                        <div>
                            <label
                                className="block text-gray-700 font-semibold mb-2"
                                htmlFor="lastName"
                            >
                                Prénom
                            </label>
                            <input
                                type="text"
                                id="lastName"
                                name="last_name"
                                value={dataForm?.last_name || ''}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-indigo-300 transition"
                            />
                        </div>

                        <div>
                            <label
                                className="block text-gray-700 font-semibold mb-2"
                                htmlFor="pseudo"
                            >
                                Pseudo
                            </label>
                            <input
                                type="text"
                                id="pseudo"
                                name="pseudo"
                                value={dataForm?.pseudo || ''}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-indigo-300 transition"
                            />
                        </div>
                        {/* Label */}
                        <label
                            className="block mb-2 text-sm font-medium text-gray-900 "
                            htmlFor="dropzone-file"
                        >
                            Avatar
                        </label>

                        {/* Input file */}
                        <input
                            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                            aria-describedby="user_avatar_help"
                            id="dropzone-file"
                            type="file"
                            accept="image/*"
                            name="avatar_url"
                            onChange={handleChange}
                            disabled={uploading}
                        />

                        <div>
                            <label
                                className="block text-gray-700 font-semibold mb-2"
                                htmlFor="facebook"
                            >
                                Lien facebook
                            </label>
                            <input
                                id="facebook"
                                name="link_facebook"
                                type="facebook"
                                value={dataForm?.link_facebook || ''}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-indigo-300 transition"
                            />
                        </div>

                        <div>
                            <label
                                className="block text-gray-700 font-semibold mb-2"
                                htmlFor="facebook"
                            >
                                Lien instagram
                            </label>
                            <input
                                id="instagram"
                                name="link_instagram"
                                type="instagram"
                                value={dataForm?.link_instagram || ''}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-indigo-300 transition"
                            />
                        </div>

                        <div>
                            <label
                                className="block text-gray-700 font-semibold mb-2"
                                htmlFor="tiktok"
                            >
                                Lien tiktok
                            </label>
                            <input
                                id="tiktok"
                                name="link_tiktok"
                                type="tiktok"
                                value={dataForm?.link_tiktok || ''}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-indigo-300 transition"
                            />
                        </div>

                        <div>
                            <label
                                className="block text-gray-700 font-semibold mb-2"
                                htmlFor="bio"
                            >
                                Bio
                            </label>
                            <textarea
                                id="bio"
                                name="bio"
                                value={dataForm?.bio || ''}
                                onChange={handleChange}
                                rows={4}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-indigo-300 transition resize-none"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-[var(--bleu-electrique)] cursor-pointer text-white font-bold py-3 rounded-lg hover:bg-[#0a5197] transition"
                        >
                            Enregistrer les modifications
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default EditProfil
