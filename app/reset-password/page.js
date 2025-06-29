'use client'

import { useEffect, useState } from 'react'
import Loading from '@/components/Loading'
import TopLoginSignUp from '@/components/TopLoginSignup'
import { supabase } from '@/lib/initSupabase'
import DATA_TOAST from '../utils/constant/toast'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import checkEmail from '@/utils/checkemail'

const ResetPassword = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [errorEmail, setErrorEmail] = useState('')
    const router = useRouter()

    useEffect(() => {
        const checkUser = async () => {
            const { data } = await supabase.auth.getUser()
            if (data.user) {
                router.push('/')
            }
        }
        checkUser()
    }, [])

    const handleChangeEmail = (e) => {
        const { value } = e.target
        setEmail(value)
        setErrorEmail(checkEmail(value))
    }

    const fetchResetPassword = async (e) => {
        e.preventDefault()

        // Validation de l'email avant envoi
        const emailError = checkEmail(email)
        if (emailError) {
            setErrorEmail(emailError)
            toast.error(
                'Veuillez corriger les erreurs avant de continuer',
                DATA_TOAST
            )
            return
        }

        setIsLoading(true)
        try {
            // Construction de l'URL de redirection correcte
            const baseUrl =
                typeof window !== 'undefined' ? window.location.origin : ''
            const url = `${baseUrl}/reset-password/change`

            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: url,
            })

            if (error) {
                throw error
            }

            setEmail('')
            toast.success(
                'Email de réinitialisation envoyé avec succès ! Vérifiez votre boîte de réception.',
                DATA_TOAST
            )
        } catch (error) {
            console.error('Erreur lors de la réinitialisation:', error)

            // Gestion d'erreurs plus spécifique
            if (error.message.includes('Email not confirmed')) {
                toast.error(
                    "Cet email n'est pas confirmé. Veuillez d'abord confirmer votre email.",
                    DATA_TOAST
                )
            } else if (error.message.includes('User not found')) {
                toast.error('Aucun compte trouvé avec cet email.', DATA_TOAST)
            } else if (error.message.includes('Too many requests')) {
                toast.error(
                    'Trop de tentatives. Veuillez réessayer plus tard.',
                    DATA_TOAST
                )
            } else {
                toast.error(
                    `Erreur lors de l'envoi de l'email: ${error.message}`,
                    DATA_TOAST
                )
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <div className="p-10">
                <TopLoginSignUp />
                <div
                    id="reset-password"
                    className="flex items-center justify-center "
                >
                    <div className="rounded-2xl  w-full max-w-md">
                        <form onSubmit={fetchResetPassword}>
                            <div>
                                <label className="block mb-3 text-base font-normal">
                                    Email de réinitialisation
                                </label>
                                <input
                                    onChange={handleChangeEmail}
                                    name="email"
                                    type="email"
                                    placeholder="jeandupont@gmail.com"
                                    className="w-full h-14 placeholder:text-[var(--color-placeholder-input-login-signup)] bg-[var(--nuance-de-blanc-1)] border-[var(--gris-bleute)] rounded-[5px] border-[0.76px] px-3 py-2"
                                    required
                                />
                            </div>
                            {errorEmail && (
                                <p className="mt-2 text-[0.75rem] text-[var(--error-color)]">
                                    {errorEmail}
                                </p>
                            )}

                            <div className="w-full border mb-[30px] mt-[30px] border-[var(--gris-bleute)]"></div>
                            <button
                                type="submit"
                                className="cursor-pointer w-full bg-[var(--bleu-electrique)] hover:bg-[var(--bleu-fonce)] text-white font-semibold py-4 px-4 rounded-lg transition duration-300"
                            >
                                {isLoading ? (
                                    <span className="flex justify-center">
                                        <Loading />
                                    </span>
                                ) : (
                                    'Réinitialiser le mot de passe'
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ResetPassword
