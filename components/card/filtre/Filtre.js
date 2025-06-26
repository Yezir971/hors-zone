'use client'

import { useEffect, useState, useCallback } from 'react'

// Composant de filtre local pour les catégories
// Utilisation: <Filtre data={mesDonnees} onFilterChange={handleFilterChange} />
const Filtre = ({ data, onFilterChange }) => {
    const [filteredSports, setFilteredSports] = useState([])
    const [selectedCategories, setSelectedCategories] = useState([])
    const [allCategories, setAllCategories] = useState([])

    // Fonction pour extraire toutes les catégories uniques
    const extractCategories = useCallback((sportsData) => {
        const categories = new Set()
        sportsData.forEach((data) => {
            if (data.categories && Array.isArray(data.categories)) {
                data.categories.forEach((category) => {
                    categories.add(category)
                })
            }
        })
        return Array.from(categories).sort()
    }, [])

    // Fonction pour filtrer les sports par catégories
    const filterSportsByCategories = useCallback((sportsData, categories) => {
        if (categories.length === 0) {
            return sportsData
        }

        return sportsData.filter((data) => {
            if (!data.categories || !Array.isArray(data.categories)) {
                return false
            }

            return categories.some((selectedCategory) =>
                data.categories.includes(selectedCategory)
            )
        })
    }, [])

    // Fonction pour ajouter/retirer une catégorie du filtre
    const toggleCategory = (category) => {
        setSelectedCategories((prev) => {
            if (prev.includes(category)) {
                return prev.filter((cat) => cat !== category)
            } else {
                return [...prev, category]
            }
        })
    }

    // Fonction pour réinitialiser tous les filtres
    const clearAllFilters = () => {
        setSelectedCategories([])
    }

    // Effet pour filtrer les sports quand les catégories sélectionnées changent
    useEffect(() => {
        const filtered = filterSportsByCategories(data, selectedCategories)
        setFilteredSports(filtered)

        // Notifier le parent du changement
        if (onFilterChange) {
            onFilterChange(filtered, selectedCategories)
        }
    }, [selectedCategories, data, filterSportsByCategories, onFilterChange])

    // Effet pour initialiser les catégories quand les données changent
    useEffect(() => {
        if (data && data.length > 0) {
            setAllCategories(extractCategories(data))
        }
    }, [data, extractCategories])

    // Couleurs pour les badges (cycle à travers les couleurs)
    const badgeColors = [
        'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
        'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
        'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300',
        'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
        'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
        'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
        'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300',
    ]

    const getBadgeColor = (index) => {
        return badgeColors[index % badgeColors.length]
    }

    const getSelectedBadgeColor = (index) => {
        const baseColor = badgeColors[index % badgeColors.length]
        // Pour les catégories sélectionnées, on ajoute une bordure et un fond plus foncé
        return (
            baseColor.replace('bg-', 'bg-').replace('text-', 'text-') +
            ' border-2 border-blue-500'
        )
    }

    if (allCategories.length === 0) {
        return null
    }

    return (
        <div className="mt-[26px] mb-[29px]">
            <div className="flex flex-wrap gap-2 items-center">
                {allCategories.map((category, index) => {
                    const isSelected = selectedCategories.includes(category)
                    const badgeClass = isSelected
                        ? getSelectedBadgeColor(index)
                        : getBadgeColor(index)

                    return (
                        <span
                            key={category}
                            onClick={() => toggleCategory(category)}
                            className={`${badgeClass} border-transparent border-2 cursor-pointer text-xs font-medium px-3 py-2 rounded-full transition-all duration-200 hover:scale-105 ${
                                isSelected
                                    ? 'ring-2 ring-blue-500 ring-opacity-50'
                                    : ''
                            }`}
                        >
                            {category}
                        </span>
                    )
                })}

                {selectedCategories.length > 0 && (
                    <button
                        onClick={clearAllFilters}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs font-medium px-3 py-2 rounded-full transition-all duration-200"
                    >
                        Effacer les filtres
                    </button>
                )}
            </div>

            <div className="mt-2 text-sm text-gray-600">
                {selectedCategories.length > 0 ? (
                    <>
                        <span>
                            {filteredSports.length} résultat
                            {filteredSports.length > 1 ? 's' : ''} sur{' '}
                            {data.length} événement{data.length > 1 ? 's' : ''}
                        </span>
                        <span className="ml-2">
                            (Filtré par : {selectedCategories.join(', ')})
                        </span>
                    </>
                ) : (
                    <span>
                        {data.length} événement{data.length > 1 ? 's' : ''} au
                        total
                    </span>
                )}
            </div>
        </div>
    )
}

export default Filtre
// fait avec chatgpt