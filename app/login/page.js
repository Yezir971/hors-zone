"use client";

import Loading from "@/components/loading";
import { supabase } from "@/lib/initSupabase";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Bounce, toast, ToastContainer } from "react-toastify";

const Login = () => {
    const router = useRouter();
    
    const [dataForm, setDataForm] = useState({})
    const [isLoading, setIsLoading] = useState(false)

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
        setIsLoading(true)
        e.preventDefault()
        try {
            const {error} = await supabase.auth.signInWithPassword({
                "email": dataForm.email, 
                "password" : dataForm.password
            })
            if(error && error.message == "missing email or phone"){
                toast.warning("Mot de passe ou mail incorrect", {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Bounce,
                });
                console.log(`${error}`);
                return
            }
            setIsLoading(false)
            router.push('/home');

            
        } catch (error) {
            setIsLoading(false)
            toast.error("Errreur de connexion, Vérifier votre connexion internet ", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
            });
            throw new Error(`erreur de connexion avec supabase ${error}`);
        }
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
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                transition={Bounce}
            />

        </>
    )
}

export default Login