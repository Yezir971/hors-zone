'use client'
import { useEffect, useState } from 'react'
import TopLoginSignUp from '@/components/TopLoginSignup'
import { supabase } from '@/lib/initSupabase'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import Loading from '@/components/Loading'
import DATA_TOAST from '@/app/utils/constant/toast'

const ChangePassword = () => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [errorPassword, setErrorPassword] = useState('')
    const [errorPasswordConfirm, setErrorPasswordConfirm] = useState('')

    useEffect(() => {
        const checkUser = async () => {
            const { data } = await supabase.auth.getUser()
            if (!data.user) {
                router.push('/login')
            }
        }
        checkUser()
    }, [])

    const validatePassword = (password) => {
        if (password.length < 6) {
            return 'Le mot de passe doit contenir au moins 6 caractères'
        }
        return ''
    }

    const handlePasswordChange = (e) => {
        const value = e.target.value
        setPassword(value)
        setErrorPassword(validatePassword(value))
    }

    const handlePasswordConfirmChange = (e) => {
        const value = e.target.value
        setPasswordConfirm(value)
        if (value !== password) {
            setErrorPasswordConfirm('Les mots de passe ne correspondent pas')
        } else {
            setErrorPasswordConfirm('')
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        // Validation des mots de passe
        const passwordError = validatePassword(password)
        if (passwordError) {
            setErrorPassword(passwordError)
            toast.error(
                'Veuillez corriger les erreurs avant de continuer',
                DATA_TOAST
            )
            return
        }

        if (password !== passwordConfirm) {
            setErrorPasswordConfirm('Les mots de passe ne correspondent pas')
            toast.error('Les mots de passe ne correspondent pas', DATA_TOAST)
            return
        }

        setIsLoading(true)
        try {
            const { error } = await supabase.auth.updateUser({
                password: password,
            })

            if (error) {
                throw error
            }

            toast.success('Mot de passe réinitialisé avec succès !', DATA_TOAST)
            router.push('/login')
        } catch (error) {
            console.error('Erreur lors de la réinitialisation:', error)

            if (error.message.includes('Password should be at least')) {
                toast.error(
                    'Le mot de passe doit contenir au moins 6 caractères',
                    DATA_TOAST
                )
            } else {
                toast.error(
                    `Erreur lors de la réinitialisation: ${error.message}`,
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
                <div className="flex items-center justify-center">
                    <div className="rounded-2xl w-full max-w-md">
                        <h1 className="text-2xl font-bold mb-6 text-center">
                            Réinitialiser le mot de passe
                        </h1>
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-4">
                                <div>
                                    <label className="block mb-3 text-base font-normal">
                                        Nouveau mot de passe
                                    </label>
                                    <input
                                        type="password"
                                        placeholder="Nouveau mot de passe"
                                        value={password}
                                        onChange={handlePasswordChange}
                                        className="w-full h-14 placeholder:text-[var(--color-placeholder-input-login-signup)] bg-[var(--nuance-de-blanc-1)] border-[var(--gris-bleute)] rounded-[5px] border-[0.76px] px-3 py-2"
                                        required
                                    />
                                    {errorPassword && (
                                        <p className="mt-2 text-[0.75rem] text-[var(--error-color)]">
                                            {errorPassword}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block mb-3 text-base font-normal">
                                        Confirmer le mot de passe
                                    </label>
                                    <input
                                        type="password"
                                        placeholder="Confirmer le mot de passe"
                                        value={passwordConfirm}
                                        onChange={handlePasswordConfirmChange}
                                        className="w-full h-14 placeholder:text-[var(--color-placeholder-input-login-signup)] bg-[var(--nuance-de-blanc-1)] border-[var(--gris-bleute)] rounded-[5px] border-[0.76px] px-3 py-2"
                                        required
                                    />
                                    {errorPasswordConfirm && (
                                        <p className="mt-2 text-[0.75rem] text-[var(--error-color)]">
                                            {errorPasswordConfirm}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="w-full border mb-[30px] mt-[30px] border-[var(--gris-bleute)]"></div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="cursor-pointer w-full bg-[var(--bleu-electrique)] hover:bg-[var(--bleu-fonce)] text-white font-semibold py-4 px-4 rounded-lg transition duration-300 disabled:opacity-50"
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

export default ChangePassword
