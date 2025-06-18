"use client";

import Loading from "@/components/loading";
import { authContextApi } from "@/context/authContext";
import { supabase } from "@/lib/initSupabase";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Login = () => {
    const router = useRouter();
    
    const [dataForm, setDataForm] = useState({})

    const {login, isLoading} = authContextApi()

    useEffect(() => {
        const checkUser = async () => {
            const { data } = await supabase.auth.getUser();
            if (data.user) {
                router.push("/home");
            } 
        };

        checkUser();
    }, []);

    const handleChange = (e) => {
        const {name, value}= e.target;
        setDataForm(prevState => ({
            ...prevState, [name]: value
        }))
    }
    const fetchLogin = async (e) => {
        e.preventDefault()
        await login(dataForm)
    }

    return(
        <>
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Connexion</h2>
                    <form onSubmit={fetchLogin} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input onChange={handleChange} name="email" type="email" className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Mot de passe</label>
                        <input onChange={handleChange} name="password" type="password" className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                    </div>

                    <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300">
                        {isLoading ? <Loading />: "Se connecter"}
                    </button>
                    <p className="text-sm text-center text-gray-500 mt-4">
                        Pas encore de compte ? <Link className="text-indigo-600 hover:underline" href="/signup">Créer un compte</Link> 
                    </p>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login