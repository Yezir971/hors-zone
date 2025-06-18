'use client'

import { useState } from 'react'

const EditProfil = () => {
  const [formData, setFormData] = useState({
    name: 'Jean Dupont',
    email: 'jean@example.com',
    bio: 'Développeur web passionné et amateur de nouvelles technologies.',
  })

  const handleChange = (e) => {
    const { value, name } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex items-center justify-center p-6">
        <div className="bg-white shadow-2xl rounded-2xl max-w-lg w-full p-10">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
            Modifier le profil
          </h2>

          <form className="space-y-6">
            <div>
              <label
                className="block text-gray-700 font-semibold mb-2"
                htmlFor="name"
              >
                Nom complet
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-indigo-300 transition"
              />
            </div>

            <div>
              <label
                className="block text-gray-700 font-semibold mb-2"
                htmlFor="email"
              >
                Adresse e-mail
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-indigo-300 transition"
              />
            </div>

            <div>
              <label
                className="block text-gray-700 font-semibold mb-2"
                htmlFor="bio"
              >
                Bio
              </label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-indigo-300 transition resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700 transition"
            >
              Enregistrer les modifications
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default EditProfil
