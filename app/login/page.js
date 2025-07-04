'use client'

import Loading from '@/components/Loading'
import TopLoginSignUp from '@/components/TopLoginSignup'
import { authContextApi } from '@/context/authContext'
import { supabase } from '@/lib/initSupabase'
import checkEmail from '@/utils/checkemail'
import checkPassword from '@/utils/checkpassword'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { LuEye, LuEyeClosed } from 'react-icons/lu'

const Login = () => {
    const router = useRouter()
    const [showPassword, setShowPassword] = useState(false)
    const [errorPassword, setErrorPassword] = useState('')
    const [errorEmail, setErrorEmail] = useState('')

    const [dataForm, setDataForm] = useState({})
    const togglePasswordVisibility = () => setShowPassword((v) => !v)

    const { login, isLoading, isLoadingUser, isAuth } = authContextApi()

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

        if (name === 'password') {
            setErrorPassword(checkPassword(value))
        }
        if (name === 'email') {
            setErrorEmail(checkEmail(value))
        }

       
    }
    const fetchLogin = async (e) => {
        e.preventDefault()
        await login(dataForm)
    }

    if (isLoadingUser) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loading />
            </div>
        )
    }

    if (isAuth) {
        return null
    }

    return (
        <>
            <div className="p-10">
                <TopLoginSignUp />

                <div id="login" className="flex items-center justify-center ">
                    <div className="rounded-2xl  w-full max-w-md">
                        <form onSubmit={fetchLogin}>
                            <div>
                                <label className="block mb-3 text-base font-normal">
                                    Email
                                </label>
                                <input
                                    onChange={handleChange}
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
                            <div>
                                <label className="block mt-7 mb-3 text-base font-normal">
                                    Mot de passe
                                </label>
                                <div className="relative">
                                    <input
                                        onChange={handleChange}
                                        name="password"
                                        placeholder="********"
                                        type={`${
                                            showPassword ? 'text' : 'password'
                                        }`}
                                        className="w-full placeholder:text-[var(--color-placeholder-input-login-signup)] h-14 bg-[var(--nuance-de-blanc-1)] border-[var(--gris-bleute)] rounded-[5px] border-[0.76px] px-3 py-2"
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

                            <Link
                                href="/reset-password"
                                className="mt-2 text-[0.75rem] text-[var(--bleu-electrique)]"
                            >
                                Mot de passe oublié ?
                            </Link>
                            <span className="flex mb-16 gap-3 mt-4 items-center">
                                <input type="checkbox" id="remember" />
                                <label
                                    className="text-xs  font-normal text-[var(--gris-bleute)]"
                                    htmlFor="remember"
                                >
                                    Se souvenir de moi
                                </label>
                            </span>

                            <button
                                type="submit"
                                className="cursor-pointer w-full bg-[var(--bleu-electrique)] hover:bg-[var(--bleu-fonce)] text-white font-semibold py-4 px-4 rounded-lg transition duration-300"
                            >
                                {isLoading ? (
                                    <span className="flex justify-center">
                                        <Loading />
                                    </span>
                                ) : (
                                    'Se connecter'
                                )}
                            </button>

                            <div className="w-full border mb-[30px] mt-[30px] border-[var(--gris-bleute)]"></div>

                            <Link
                                href="/signup"
                                className="block text-center cursor-pointer  w-full bg-[#F9F9F9] text-black font-semibold border border-[#6B7280] rounded-[8px] px-6 py-3"
                            >
                                S'inscrire
                            </Link>

                            {/* <p className="text-sm text-center text-gray-500 mt-4">
                            Pas encore de compte ?{' '}
                            <Link
                                className="text-[var(--orange-1)] hover:underline"
                                href="/signup"
                            >
                                Créer un compte
                            </Link>
                        </p> */}
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
