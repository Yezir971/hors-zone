'use client'
import truncate from '@/utils/truncate'
import truncateDate from '@/utils/truncateDate'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect, useCallback } from 'react'
import TitleCard from '../card/TitleCard'
import Filtre from '../card/filtre/Filtre'
import { ArticleContextApi } from '@/context/articleContext'
import YouTubeEmbed, { extractYouTubeId } from '../YouTubeEmbed'
import { MdOutlineArrowBackIos } from 'react-icons/md'
import { MdOutlineArrowForwardIos } from 'react-icons/md'
import Squeleton from '../card/Squeleton'

const SectionEventHome = ({
    sports,
    titre,
    type,
    icons,
    filtre,
    infiniteScroll,
    showMore,
    labelShowMore,
    profil,
    isLoading,
}) => {
    const [filteredData, setFilteredData] = useState(sports || [])
    const [selectedCategories, setSelectedCategories] = useState([])
    const { deleteSport, deleteVideo } = ArticleContextApi()

    // Fonction pour filtrer les données selon les catégories sélectionnées
    const filterDataByCategories = useCallback((data, categories) => {
        if (categories.length === 0) {
            return data
        }

        return data.filter((item) => {
            if (!item.categories || !Array.isArray(item.categories)) {
                return false
            }

            return categories.some((selectedCategory) =>
                item.categories.includes(selectedCategory)
            )
        })
    }, [])

    // Mettre à jour les données filtrées quand les sports changent OU quand les catégories changent
    useEffect(() => {
        const filtered = filterDataByCategories(
            sports || [],
            selectedCategories
        )
        setFilteredData(filtered)
    }, [sports, selectedCategories, filterDataByCategories])

    // Callback pour recevoir les données filtrées du composant Filtre
    const handleFilterChange = useCallback((filteredSports, categories) => {
        setSelectedCategories(categories)
        // Note: setFilteredData sera géré par le useEffect ci-dessus
    }, [])

    return (
        <>
            <div className="flex items-center text-[var(--noir)]">
                <div
                    className={`absolute left-[87px] hidden ${
                        infiniteScroll ? 'lg:hidden' : 'lg:block'
                    } `}
                >
                    <MdOutlineArrowBackIos className="text-2xl cursor-pointer" />
                </div>
                <section className="w-full  ">
                    <TitleCard
                        title={titre}
                        showMore={showMore}
                        icons={icons}
                        labelShowMore={labelShowMore}
                    />

                    {filtre && (
                        <Filtre
                            data={sports}
                            onFilterChange={handleFilterChange}
                        />
                    )}
                    {/* <div className="flex justify-between items-center text-[var(--noir)]"> */}
                    {isLoading ? (
                        <div className="flex gap-4 flex-wrap">
                            <Squeleton />
                            <Squeleton />
                            <Squeleton />
                            <Squeleton />
                        </div>
                    ) : (
                        <>
                            {filteredData && filteredData?.length != 0 ? (
                                <div
                                    className={
                                        infiniteScroll
                                            ? 'flex gap-6 flex-wrap custom-scrollbar overflow-y-auto'
                                            : 'flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth custom-scrollbar   '
                                    }
                                >
                                    {filteredData.map((sport, id) => (
                                        <div
                                            key={id}
                                            className={`w-[334px]  border-[20px] border-solid border-[var(--card-color-nuance-1)] shrink-0 snap-start bg-[var(--card-color-nuance-1)] rounded-xl shadow-md overflow-hidden`}
                                        >
                                            {type == 'picture' ? (
                                                <>
                                                    <img
                                                        src={sport?.image_url}
                                                        alt={`image ${sport?.name}`}
                                                        className="h-48 w-full object-cover rounded-[10px] "
                                                    />
                                                </>
                                            ) : (
                                                <>
                                                    <div className="h-48 w-full rounded-[10px] overflow-hidden">
                                                        {sport?.link_video ? (
                                                            <YouTubeEmbed
                                                                videoId={extractYouTubeId(
                                                                    sport.link_video
                                                                )}
                                                                title={
                                                                    sport?.name ||
                                                                    'Vidéo YouTube'
                                                                }
                                                                height="100%"
                                                                className="h-full"
                                                            />
                                                        ) : (
                                                            <div className="h-full flex items-center justify-center bg-gray-100">
                                                                <p className="text-gray-500">
                                                                    Aucune vidéo
                                                                    disponible
                                                                </p>
                                                            </div>
                                                        )}
                                                    </div>
                                                </>
                                            )}

                                            <div className="pt-[10px]">
                                                <h3 className="text-lg font-semibold text-[var(--text-color)] mb-2">
                                                    {type == 'picture'
                                                        ? sport?.name
                                                        : sport?.video_name}
                                                </h3>
                                                {type != 'picture' && (
                                                    <p className="text-sm text-[var(--text-color)] mb-3">
                                                        {truncate(
                                                            sport?.description,
                                                            100
                                                        )}
                                                    </p>
                                                )}

                                                {/* Affichage des catégories */}
                                                {sport?.categories &&
                                                    sport.categories.length >
                                                        0 && (
                                                        <>
                                                            <div className="flex flex-wrap gap-1 mb-3">
                                                                {sport.categories.map(
                                                                    (
                                                                        category,
                                                                        index
                                                                    ) => (
                                                                        <span
                                                                            key={
                                                                                index
                                                                            }
                                                                            className="bg-blue-100 text-blue-800 text-xs  font-medium px-2 py-1 rounded-full"
                                                                        >
                                                                            {
                                                                                category
                                                                            }
                                                                        </span>
                                                                    )
                                                                )}
                                                            </div>
                                                            {type ==
                                                                'picture' && (
                                                                <p className="text-[10px] text-[var(--text-color)]">
                                                                    Du{' '}
                                                                    {truncateDate(
                                                                        sport?.date_start
                                                                    )}{' '}
                                                                    au{' '}
                                                                    {truncateDate(
                                                                        sport?.date_end
                                                                    )}
                                                                </p>
                                                            )}
                                                        </>
                                                    )}

                                                <div className="flex justify-between items-center mt-[32px]">
                                                    {type == 'picture' ? (
                                                        <>
                                                            <Link
                                                                href={`/description/${sport?.slug}`}
                                                                className="inline-flex items-center   px-[15px] py-[5px] text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 "
                                                            >
                                                                Voir plus
                                                                <svg
                                                                    className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                                                                    aria-hidden="true"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    fill="none"
                                                                    viewBox="0 0 14 10"
                                                                >
                                                                    <path
                                                                        stroke="currentColor"
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth="2"
                                                                        d="M1 5h12m0 0L9 1m4 4L9 9"
                                                                    />
                                                                </svg>
                                                            </Link>

                                                            <div className="flex justify-between items-center">
                                                                {profil?.is_admin && (
                                                                    <>
                                                                        <Image
                                                                            onClick={() =>
                                                                                deleteSport(
                                                                                    sport?.id,
                                                                                    sport?.image_url
                                                                                )
                                                                            }
                                                                            src="/images/icons/trash.svg"
                                                                            alt="trash"
                                                                            width={
                                                                                20
                                                                            }
                                                                            height={
                                                                                20
                                                                            }
                                                                            className="cursor-pointer"
                                                                        />
                                                                    </>
                                                                )}
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <div className="flex justify-between items-center w-full">
                                                            <p className="text-sm text-[var(--text-color)]">
                                                                Publié le{' '}
                                                                {truncateDate(
                                                                    sport?.created_at
                                                                )}
                                                            </p>

                                                            {profil?.is_admin && (
                                                                <Image
                                                                    onClick={() =>
                                                                        deleteVideo(
                                                                            sport?.id,
                                                                            sport?.link_video
                                                                        )
                                                                    }
                                                                    src="/images/icons/trash.svg"
                                                                    alt="trash"
                                                                    width={20}
                                                                    height={20}
                                                                    className="cursor-pointer"
                                                                />
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <p className="text-gray-500 text-lg">
                                        {filtre
                                            ? 'Aucun événement ne correspond à vos critères de recherche.'
                                            : 'Aucun évènement à venir'}
                                    </p>
                                    {filtre && (
                                        <p className="text-gray-400 text-sm mt-2">
                                            Essayez de modifier vos filtres ou
                                            de les effacer pour voir tous les
                                            événements.
                                        </p>
                                    )}
                                </div>
                            )}
                        </>
                        // fin </div>
                    )}
                </section>
                <div
                    className={`absolute right-[87px] hidden ${
                        infiniteScroll ? 'lg:hidden' : 'lg:block'
                    } `}
                >
                    <MdOutlineArrowForwardIos className="text-2xl cursor-pointer" />
                </div>
            </div>
        </>
    )
}

export default SectionEventHome
