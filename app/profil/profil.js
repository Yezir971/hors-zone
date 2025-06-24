// import { useState, useContext } from 'react'
// import { supabase } from '@/lib/initSupabase'
// import { authContextApi } from '@/context/authContext'
// import { toast } from 'react-toastify'
// import DATA_TOAST from '../utils/constant/toast'

// export default function EditProfil() {
//     const { user, setUser } = useContext(authContextApi)
//     const [form, setForm] = useState({
//         pseudo: user?.pseudo || '',
//         email: user?.email || ''
//     })
//     const [media, setMedia] = useState(null)
//     const [loading, setLoading] = useState(false)

//     const handleChange = (e) => {
//         setForm({ ...form, [e.target.name]: e.target.value })
//     }

//     const handleMediaChange = (e) => {
//         if (e.target.files && e.target.files[0]) {
//             setMedia(e.target.files[0])
//         }
//     }

//     const handleSubmit = async (e) => {
//         e.preventDefault()
//         setLoading(true)

//         let mediaUrl = user?.media || null

//         // Upload du média si un fichier est sélectionné
//         if (media) {
//             const fileExt = media.name.split('.').pop()
//             const fileName = `${user.id}_${Date.now()}.${fileExt}`
//             const { data, error: uploadError } = await supabase
//                 .storage
//                 .from('medias')
//                 .upload(fileName, media, {
//                     cacheControl: '3600',
//                     upsert: true
//                 })

//             if (uploadError) {
//                 toast.error("Erreur lors de l'upload du média", DATA_TOAST)
//                 setLoading(false)
//                 return
//             }
//             // Récupère l'URL publique du média
//             const { data: publicUrlData } = supabase
//                 .storage
//                 .from('medias')
//                 .getPublicUrl(fileName)
//             mediaUrl = publicUrlData.publicUrl
//         }

//         // Mise à jour des infos utilisateur
//         const { error } = await supabase
//             .from('users')
//             .update({ pseudo: form.pseudo, email: form.email, media: mediaUrl })
//             .eq('id', user.id)

//         setLoading(false)
//         if (error) {
//             toast.error("Erreur lors de la mise à jour", DATA_TOAST)
//         } else {
//             toast.success("Profil mis à jour !", DATA_TOAST)
//             setUser({ ...user, ...form, media: mediaUrl })
//         }
//     }

//     return (
//         <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto p-8 rounded-xl shadow"
//             style={{
//                 backgroundColor: "var(--background-color)",
//                 color: "var(--text-color)",
//                 transition: "background-color 0.3s, color 0.3s"
//             }}
//         >
//             <div>
//                 <label className="block mb-2" style={{ color: "var(--text-color)" }}>Pseudo</label>
//                 <input
//                     type="text"
//                     name="pseudo"
//                     value={form.pseudo}
//                     onChange={handleChange}
//                     className="w-full border rounded px-3 py-2"
//                     style={{
//                         backgroundColor: "var(--nuance-de-blanc-1)",
//                         color: "var(--text-color)",
//                         borderColor: "var(--gris-bleute)"
//                     }}
//                 />
//             </div>
//             <div>
//                 <label className="block mb-2" style={{ color: "var(--text-color)" }}>Email</label>
//                 <input
//                     type="email"
//                     name="email"
//                     value={form.email}
//                     onChange={handleChange}
//                     className="w-full border rounded px-3 py-2"
//                     style={{
//                         backgroundColor: "var(--nuance-de-blanc-1)",
//                         color: "var(--text-color)",
//                         borderColor: "var(--gris-bleute)"
//                     }}
//                 />
//             </div>
//             <div>
//                 <label className="block mb-2" style={{ color: "var(--text-color)" }}>Média (photo ou vidéo)</label>
//                 <input
//                     type="file"
//                     name="media"
//                     accept="image/*,video/*"
//                     onChange={handleMediaChange}
//                     className="w-full border rounded px-3 py-2"
//                     style={{
//                         backgroundColor: "var(--nuance-de-blanc-1)",
//                         color: "var(--text-color)",
//                         borderColor: "var(--gris-bleute)"
//                     }}
//                 />
//                 {user?.media && (
//                     <div className="mt-2">
//                         <span className="text-xs">Aperçu actuel :</span><br />
//                         {user.media.match(/\.(mp4|webm|ogg)$/i) ? (
//                             <video src={user.media} controls width={120} className="rounded mt-1" />
//                         ) : (
//                             <img src={user.media} alt="media" width={120} className="rounded mt-1" />
//                         )}
//                     </div>
//                 )}
//             </div>
//             <button
//                 type="submit"
//                 className="w-full bg-[var(--bleu-electrique)] hover:bg-[var(--bleu-fonce)] text-white px-4 py-2 rounded transition"
//                 disabled={loading}
//             >
//                 {loading ? "Enregistrement..." : "Enregistrer"}
//             </button>
//         </form>
//     )
// }
