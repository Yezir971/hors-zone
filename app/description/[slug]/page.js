"use client";
import { useParams } from "next/navigation";

const sportData = {
  football: {
    name: "Football",
    category: "Sport collectif",
    description:
      "Le football est un sport populaire opposant deux équipes de 11 joueurs. L’objectif est de marquer plus de buts que l’équipe adverse.",
    objective: "Marquer des buts dans le camp adverse.",
    rules: [
      "Utilisation des pieds uniquement (sauf gardien).",
      "Match en deux mi-temps de 45 minutes.",
      "Fautes sanctionnées par des coups francs ou penalties."
    ],
    players: "11 par équipe",
    field: "Gazon (100-110m x 64-75m)",
    competitions: ["Coupe du Monde", "Ligue des Champions"],
    regions: "Mondial – populaire en Europe, Afrique, Amérique du Sud"
  },
};
const Description = () => {
    const { slug } = useParams();
    const sport = sportData[slug];

    if (!sport) {
        return (
        <div className="min-h-screen flex items-center justify-center">
            <p className="text-lg text-gray-500">Sport introuvable.</p>
        </div>
        );
    }
    return(
           <div className="min-h-screen bg-gray-100 p-6">
                <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8">
                    <h1 className="text-3xl font-bold text-indigo-700 mb-4">{sport.name}</h1>
                    <p className="text-gray-700 mb-2"><strong>Catégorie :</strong> {sport.category}</p>
                    <p className="text-gray-700 mb-4"><strong>Description :</strong> {sport.description}</p>
                    <p className="text-gray-700 mb-4"><strong>Objectif :</strong> {sport.objective}</p>

                    <div className="mb-4">
                    <strong className="text-gray-800">Règles principales :</strong>
                    <ul className="list-disc ml-6 mt-2 text-gray-700">
                        {sport.rules.map((rule, i) => (
                        <li key={i}>{rule}</li>
                        ))}
                    </ul>
                    </div>

                    <p className="text-gray-700"><strong>Nombre de joueurs :</strong> {sport.players}</p>
                    <p className="text-gray-700"><strong>Terrain :</strong> {sport.field}</p>
                    <p className="text-gray-700"><strong>Compétitions :</strong> {sport.competitions.join(", ")}</p>
                    <p className="text-gray-700"><strong>Zones géographiques :</strong> {sport.regions}</p>
                </div>
            </div>
    )
}
export default Description