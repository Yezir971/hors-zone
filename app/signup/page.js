"use client";

import Link from "next/link";

const SignUp = () => {
    return(
        <>
            <div id="signup" className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Créer un compte</h2>
                    <form action="#" method="POST" className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Nom complet</label>
                        <input type="text" className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" required/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input type="email" className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Mot de passe</label>
                        <input type="password" className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
                    </div>
                    <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300">
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