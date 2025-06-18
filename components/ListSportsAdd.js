import { supabase } from '@/lib/initSupabase'
import { useEffect, useState } from 'react'
import Loading from './Loading'
import { ArticleContextApi } from '@/context/articleContext'
import { toast } from 'react-toastify'
import DATA_TOAST from '@/app/utils/constant/toast'

const ListSportsAdd = ({ profil }) => {
  const { updateListSports, update } = ArticleContextApi()
  const [sports, setSports] = useState()
  const [loading, setIsLoading] = useState(true)

  const fetchAllSports = async () => {
    try {
      const { data, error } = await supabase.from('sports').select()
      if (error) {
        toast.error(error, DATA_TOAST)
      }
      setSports(data)
    } catch (e) {
      toast.error('errur de réception des sports : ' + e, DATA_TOAST)
      throw new Error('errur de réception des sports : ' + e)
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    fetchAllSports()
  }, [updateListSports])
  if (!sports) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading />
      </div>
    )
  }

  const deleteArticle = async (id) => {
    try {
      const { error } = await supabase.from('sports').delete().eq('id', id)
      if (error) {
        toast.error(
          "Erreur à la suppression de l'événement " + error,
          DATA_TOAST
        )
        return
      }
      toast.success('Événement supprimé avec succès !', DATA_TOAST)
      update()
    } catch (e) {
      toast.error(e, DATA_TOAST)
    }
  }

  return (
    <>
      <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded-2xl shadow-xl">
        <h1 className="text-center font-bold">List d'article ajouter</h1>
        {sports.length == 0 ? (
          <p className="text-center text-gray-500">
            Aucun sport ajouter pour le moment.
          </p>
        ) : (
          <div className="space-y-6">
            {sports.map((sport, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-gray-50 p-4 rounded-xl shadow hover:shadow-md transition"
              >
                <img
                  src={sport.image_url}
                  alt={sport.name}
                  className="w-full sm:w-40 h-32 object-cover rounded-xl"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-indigo-700">
                    {sport.name}
                  </h3>
                  <p className="text-gray-600 mt-1 text-sm">
                    {sport.description}
                  </p>
                </div>
                <button
                  onClick={() => deleteArticle(sport.id)}
                  className={`mt-2 sm:mt-0 ${
                    sport.id_admin_who_add == profil.id
                      ? 'bg-red-500 hover:bg-red-600 cursor-pointer'
                      : 'bg-red-300 '
                  }  text-white font-semibold px-4 py-2 rounded-xl`}
                  disabled={sport.id_admin_who_add !== profil.id}
                >
                  Supprimer
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default ListSportsAdd
