'use client'
import CommentBlock from '@/components/detail/CommentBlock'
import Map from '@/components/detail/Map'
import Loading from '@/components/Loading'
import { supabase } from '@/lib/initSupabase'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

// const sportData = {
//     football: {
//         name: 'Football',
//         category: 'Sport collectif',
//         description:
//             'Le football est un sport populaire opposant deux équipes de 11 joueurs. L’objectif est de marquer plus de buts que l’équipe adverse.',
//         objective: 'Marquer des buts dans le camp adverse.',
//         rules: [
//             'Utilisation des pieds uniquement (sauf gardien).',
//             'Match en deux mi-temps de 45 minutes.',
//             'Fautes sanctionnées par des coups francs ou penalties.',
//         ],
//         players: '11 par équipe',
//         field: 'Gazon (100-110m x 64-75m)',
//         competitions: ['Coupe du Monde', 'Ligue des Champions'],
//         regions: 'Mondial – populaire en Europe, Afrique, Amérique du Sud',
//     },
// }
const Description = () => {
    const { slug } = useParams()
    // const sport = sportData[slug]
    const [sport, setSport] = useState()
    const [sportLoad, setSportLoad] = useState(false)

    const fetchOneSport = async () => {
        try {
            const response = await supabase
                .from('sports')
                .select()
                .eq('slug', slug)

            if (response.status !== 200) {
                toast.error(
                    `Errur de réception des sports, le sport ${slug} n\'existe pas : ${e}`,
                    DATA_TOAST
                )
            }
            setSport(response.data[0])
        } catch (error) {
            toast.error(
                'Erreur de connexion, veuillez vérifier votre connexion internet : ' +
                    e,
                DATA_TOAST
            )
            throw new Error(`Le sport ${slug} n'existe pas !`)
        } finally {
            setSportLoad(true)
        }
    }
    useEffect(() => {
        fetchOneSport()
    }, [])

    if (!sportLoad) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loading />
            </div>
        )
    }

    return (
        <>
            <div className="min-h-screen bg-gray-100 p-6">
                <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8">
                    <h1 className="text-3xl font-bold text-indigo-700 mb-4">
                        {sport.name}
                    </h1>
                    <img src={sport.image_url} />
                    <p className="text-gray-700 mb-2">
                        <strong>Catégorie :</strong> {sport.category}
                    </p>
                    <p className="text-gray-700 mb-4">
                        <strong>Description :</strong> {sport.description}
                    </p>
                    <p className="text-gray-700">
                        <strong>Terrain :</strong> {sport.field}
                    </p>
                </div>
                <div className="container  mx-auto w-full flex justify-center ">
                    <Map long={sport.long} lat={sport.lat} titre={sport.name} />
                </div>
                <div className="container  mx-auto">
                    <CommentBlock idSport={sport.id}  />
                </div>
            </div>
        </>
    )
}
export default Description
