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
import { LuEye, LuEyeClosed } from 'react-icons/lu'
import checkPassword from '@/utils/checkpassword'
import checkEmail from '@/utils/checkemail'
import checkName from '@/utils/checkname'

const SignUp = () => {
    const [dataForm, setDataForm] = useState({})
    const router = useRouter()
    const { signUp, isLoading, isLoadingUser } = authContextApi()
    const [showPassword, setShowPassword] = useState(false)
    const [showPassword2, setShowPassword2] = useState(false)
    const [errorPassword, setErrorPassword] = useState('')
    const [errorPassword2, setErrorPassword2] = useState('')
    const [errorEmail, setErrorEmail] = useState('')
    const [errorPseudo, setErrorPseudo] = useState('')

    const togglePasswordVisibility = () => setShowPassword((v) => !v)
    const togglePassword2Visibility = () => setShowPassword2((v) => !v)

    useEffect(() => {
        const checkUser = async () => {
            const { data } = await supabase.auth.getUser()
            if (data.user) {
                router.push('/')
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
        if (name === 'passwordConfirm') {
            setErrorPassword2(checkPassword(value))
        }
        if (name === 'password') {
            setErrorPassword(checkPassword(value))
        }
        if (name === 'email') {
            setErrorEmail(checkEmail(value))
        }
        if (name === 'pseudo') {
            setErrorPseudo(checkName(value))
        }
    }

    const checkAllInputSignup = () => {
        if (!dataForm.pseudo || dataForm.pseudo.trim().length === 0) {
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
    if (isLoadingUser) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loading />
            </div>
        )
    }

    return (
        <>
            <div className="p-10">
                <TopLoginSignUp />
                <div id="signup" className="flex items-center justify-center ">
                    <div className="rounded-2xl w-full max-w-md">
                        <form onSubmit={fetchSignUp} className="space-y-4">
                            <div>
                                <label className="block mb-3 text-base font-normal">
                                    Pseudo{' '}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    onChange={handleChange}
                                    name="pseudo"
                                    placeholder="JeanDupont"
                                    type="text"
                                    className="w-full placeholder:text-[var(--color-placeholder-input-login-signup)] h-14 bg-[var(--nuance-de-blanc-1)] border-[var(--gris-bleute)] rounded-[5px] border-[0.76px] px-3 py-2"
                                    required
                                />
                            </div>
                            {errorPseudo && (
                                <p className="mt-2 text-[0.75rem] text-[var(--error-color)]">
                                    {errorPseudo}
                                </p>
                            )}
                            <div>
                                <label className="block mb-3 text-base font-normal">
                                    Email{' '}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    onChange={handleChange}
                                    name="email"
                                    placeholder="jeandupont@gmail.com"
                                    type="email"
                                    className="w-full placeholder:text-[var(--color-placeholder-input-login-signup)] h-14 bg-[var(--nuance-de-blanc-1)] border-[var(--gris-bleute)] rounded-[5px] border-[0.76px] px-3 py-2"
                                    required
                                />
                            </div>
                            {errorEmail && (
                                <p className="mt-2 text-[0.75rem] text-[var(--error-color)]">
                                    {errorEmail}
                                </p>
                            )}
                            <div>
                                <label className="block mb-3 text-base font-normal">
                                    Mot de passe{' '}
                                    <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <input
                                        onChange={handleChange}
                                        placeholder="********"
                                        type={
                                            showPassword ? 'text' : 'password'
                                        }
                                        name="password"
                                        id="password"
                                        className="w-full placeholder:text-[var(--color-placeholder-input-login-signup)] h-14 bg-[var(--nuance-de-blanc-1)] border-[var(--gris-bleute)] rounded-[5px] border-[0.76px] px-3 py-2 pr-12"
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-xl text-gray-400 hover:text-gray-700"
                                        onClick={togglePasswordVisibility}
                                        tabIndex={-1}
                                    >
                                        {showPassword ? (
                                            <LuEye />
                                        ) : (
                                            <LuEyeClosed />
                                        )}
                                    </button>
                                </div>
                                {errorPassword && (
                                    <p className="mt-2 text-[0.75rem] text-[var(--error-color)]">
                                        {errorPassword}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label className="block mb-3 text-base font-normal">
                                    Confirmation du mot de passe{' '}
                                    <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <input
                                        placeholder="********"
                                        type={
                                            showPassword2 ? 'text' : 'password'
                                        }
                                        onChange={handleChange}
                                        name="passwordConfirm"
                                        className="w-full placeholder:text-[var(--color-placeholder-input-login-signup)] h-14 bg-[var(--nuance-de-blanc-1)] border-[var(--gris-bleute)] rounded-[5px] border-[0.76px] px-3 py-2 pr-12"
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-xl text-gray-400 hover:text-gray-700"
                                        onClick={togglePassword2Visibility}
                                        tabIndex={-1}
                                    >
                                        {showPassword2 ? (
                                            <LuEye />
                                        ) : (
                                            <LuEyeClosed />
                                        )}
                                    </button>
                                </div>
                                {errorPassword2 && (
                                    <p className="mt-2 text-[0.75rem] text-[var(--error-color)]">
                                        {errorPassword2}
                                    </p>
                                )}
                            </div>
                            <button
                                type="submit"
                                className="cursor-pointer w-full mt-16 bg-[var(--bleu-electrique)] hover:bg-[var(--bleu-fonce)] text-white font-semibold py-4 px-4 rounded-lg transition duration-300"
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
                                    className="text-[var(--bleu-electrique)] hover:underline"
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
