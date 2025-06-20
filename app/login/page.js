'use client'

import Loading from '@/components/Loading'
import TopLoginSignUp from '@/components/TopLoginSignup'
import { authContextApi } from '@/context/authContext'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const Login = () => {
    const router = useRouter()

    const [dataForm, setDataForm] = useState({})

    const { login, isLoading, isLoadingUser, isAuth, user } = authContextApi()

    // useEffect(() => {
    //     const checkUser = async () => {
    //         const { data } = await supabase.auth.getUser();
    //         if (data.user) {
    //             router.push("/home");
    //         }
    //     };

    //     checkUser();
    // }, []);

    useEffect(() => {
        if (!isLoadingUser && user) {
            router.push('/home')
        }
    }, [isAuth, isLoadingUser])

    const handleChange = (e) => {
        const { name, value } = e.target
        setDataForm((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }
    const fetchLogin = async (e) => {
        e.preventDefault()
        await login(dataForm)
    }

    if (isLoadingUser && !user) {
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
                                    className="w-full h-14 bg-[var(--nuance-de-blanc-1)] border-[var(--gris-bleute)] rounded-[5px] border-[0.76px] px-3 py-2"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mt-7 mb-3 text-base font-normal">
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

                            <p className="mt-2 text-[0.75rem] text-[var(--orange-1)]">
                                Mot de passe oublié ?
                            </p>
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
                                className="cursor-pointer w-full bg-[var(--orange-1)] hover:bg-amber-500 text-white font-semibold py-4 px-4 rounded-lg transition duration-300"
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
