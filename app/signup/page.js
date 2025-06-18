"use client";

import { authContextApi } from "@/context/authContext";
import { supabase } from "@/lib/initSupabase";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import DATA_TOAST from "../utils/constant/toast";


const SignUp = () => {
    const [dataForm, setDataForm] = useState({})
    const router = useRouter();
    const {signUp} = authContextApi()
    
    
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

    const checkAllInputSignup = () => {
        if(dataForm.name.trim().length == 0){
            toast.warn("Le champ nom est vide.", DATA_TOAST);
            return false 
        }else if(dataForm.password !== dataForm.passwordConfirm){
            toast.warn("Les champs mots de passe ne sont pas identique.", DATA_TOAST);
            return false 
        }
        return true
    } 


    const fetchSignUp = async (e) => {
        e.preventDefault()
        if(!checkAllInputSignup()) return
        signUp(dataForm)
    }
    
    return(
        <>
            <div id="signup" className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Créer un compte</h2>
                    <form  onSubmit={fetchSignUp} className="space-y-4">
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
        </>
    )
}

export default SignUp