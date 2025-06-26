'use client'

const LikedSportsCard = ({ likedSports }) => {
    return (
        <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded-2xl shadow-xl">
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
                Mes sports aimés
            </h2>

            {likedSports.length == 0 ? (
                <p className="text-center text-gray-500">
                    Aucun sport aimé pour le moment.
                </p>
            ) : (
                <div className="space-y-6">
                    {likedSports.map((sport, index) => (
                        <div
                            key={index}
                            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-gray-50 p-4 rounded-xl shadow hover:shadow-md transition"
                        >
                            <img
                                src={sport.sports_who_like.image_url}
                                alt={sport.sports_who_like.name}
                                className="w-full sm:w-40 h-32 object-cover rounded-xl"
                            />
                            <div className="flex-1">
                                <h3 className="text-xl font-semibold text-indigo-700">
                                    {sport.name}
                                </h3>
                                <p className="text-gray-600 mt-1 text-sm">
                                    {sport.sports_who_like.description}
                                </p>
                            </div>
                            <button
                                // onClick={() => onRemove(sport)}
                                className="mt-2 sm:mt-0 bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-xl"
                            >
                                Retirer
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
export default LikedSportsCard
