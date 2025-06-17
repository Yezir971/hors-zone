"use client";

import { supabase } from "@/lib/initSupabase";
import Link from "next/link";
import { useState } from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";


const SignUp = () => {
    const [dataForm, setDataForm] = useState({})



    const handleChange = (e) => {
        const {name, value}= e.target;
        setDataForm(prevState => ({
            ...prevState, [name]: value
        }))
    }

    const checkAllInput = () => {
        if(dataForm.name.trim().length == 0){
            toast.warn("Le champ nom est vide.", {
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
            return false 
        }else if(dataForm.password !== dataForm.passwordConfirm){
            toast.warn("Les champs mots de passe ne sont pas identique.", {
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
            return false 
        }
        return true
    } 


    const fetchProfil = async (e) => {
        e.preventDefault()
        if(!checkAllInput()) return
        try {
            const { error } = await supabase.auth.signUp({
                "email": dataForm.email,
                "password": dataForm.password,
                options: {
                    data: {
                        name: dataForm.name,
                    }
                }
            });
            if (error && error.message.includes('User already registered')) {
                toast.warning("Votre compte est déjà créé !", {
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
                return
            }
            toast.success("Compte créé ! Vérifiez votre boîte mail pour confirmer.", {
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
            
        } catch (error) {
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
            <div id="signup" className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Créer un compte</h2>
                    <form  onSubmit={fetchProfil} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Nom</label>
                        <input onChange={handleChange} name="name" type="text" className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" required/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input onChange={handleChange} name="email" type="email" className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Mot de passe</label>
                        <input onChange={handleChange} name="password" type="password" className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Confirmation du mot de passe</label>
                        <input type="password" onChange={handleChange} name="passwordConfirm" className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                    </div>
                    <button type="submit" className="cursor-pointer w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300">
                        S'inscrire
                    </button>
                    <p className="text-sm text-center text-gray-500 mt-4">
                        Vous avez déjà un compte ? <Link className="text-indigo-600 hover:underline" href="/login">Se connecter</Link>
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

export default SignUp