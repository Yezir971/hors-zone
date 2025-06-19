'use client'

import { authContextApi } from '@/context/authContext'
import { supabase } from '@/lib/initSupabase'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import DATA_TOAST from '../utils/constant/toast'
import Loading from '@/components/Loading'
import TopLoginSignUp from '@/components/TopLoginSignup'

const SignUp = () => {
    const [dataForm, setDataForm] = useState({})
    const router = useRouter()
    const { signUp, isLoading } = authContextApi()

    useEffect(() => {
        const checkUser = async () => {
            const { data } = await supabase.auth.getUser()
            if (data.user) {
                router.push('/home')
            }
        }
        checkUser()
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target
        setDataForm((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }

    const checkAllInputSignup = () => {
        if (dataForm.pseudo.trim().length == 0) {
            toast.warn('Le champ pseudo est vide.', DATA_TOAST)
            return false
        } else if (dataForm.password !== dataForm.passwordConfirm) {
            toast.warn(
                'Les champs mots de passe ne sont pas identique.',
                DATA_TOAST
            )
            return false
        }
        return true
    }

    const fetchSignUp = async (e) => {
        e.preventDefault()
        if (!checkAllInputSignup()) return
        signUp(dataForm)
    }

    return (
        <>
            <div className='p-10'>
                <TopLoginSignUp />
                <div id="signup" className="flex items-center justify-center ">
                    <div className="rounded-2xl  w-full max-w-md">
                        {/* <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
                            Créer un compte
                        </h2> */}
                        <form onSubmit={fetchSignUp} className="space-y-4">
                            <div>
                                <label className="block mb-3 text-base font-normal">
                                    Pseudo
                                </label>
                                <input
                                    onChange={handleChange}
                                    name="pseudo"
                                    type="text"
                                    className="w-full h-14 bg-[var(--nuance-de-blanc-1)] border-[var(--gris-bleute)] rounded-[5px] border-[0.76px] px-3 py-2 "
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-3 text-base font-normal">
                                    Email
                                </label>
                                <input
                                    onChange={handleChange}
                                    name="email"
                                    type="email"
                                    className="w-full h-14 bg-[var(--nuance-de-blanc-1)] border-[var(--gris-bleute)] rounded-[5px] border-[0.76px] px-3 py-2"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-3 text-base font-normal">
                                    Mot de passe
                                </label>
                                <input
                                    onChange={handleChange}
                                    name="password"
                                    type="password"
                                    className="w-full h-14 bg-[var(--nuance-de-blanc-1)] border-[var(--gris-bleute)] rounded-[5px] border-[0.76px] px-3 py-2"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-3 text-base  text-black">
                                    Confirmation du mot de passe
                                </label>
                                <input
                                    type="password"
                                    onChange={handleChange}
                                    name="passwordConfirm"
                                    className="w-full h-14 bg-[var(--nuance-de-blanc-1)] border-[var(--gris-bleute)] rounded-[5px] border-[0.76px] px-3 py-2"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="cursor-pointer w-full bg-[var(--orange-1)] hover:bg-amber-500 text-white font-semibold py-4 px-4 rounded-lg transition duration-300"
                            >
                                {isLoading ? (
                                    <span className="flex justify-center">
                                        <Loading />
                                    </span>
                                ) : (
                                    "S'inscrire"
                                )}
                            </button>

                            <p className="text-sm text-center text-gray-500 mt-4">
                                Vous avez déjà un compte ?{' '}
                                <Link
                                    className="text-[var(--orange-1)] hover:underline"
                                    href="/login"
                                >
                                    Connectez-vous !
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignUp
