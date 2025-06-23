'use client'
import truncate from '@/utils/truncate'
import Image from 'next/image'
import Link from 'next/link'

const SectionEventHome = ({ sports, titre, type }) => {
    return (
        <>
            <section>
                <h2 className="mt-[100px] mb-[1.9rem] font-bold text-[1.87rem]">
                    {' '}
                    {titre}
                </h2>
                {sports && sports?.length != 0 ? (
                    <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth  ">
                        {sports.map((sport, id) => (
                            <div
                                key={id}
                                className="min-w-[300px] shrink-0 snap-start bg-[var(--nuance-de-blanc-2)] rounded-xl shadow-md overflow-hidden"
                            >
                                {type == 'picture' ? (
                                    <>
                                        <img
                                            src={sport?.image_url}
                                            alt={`image ${sport?.name}`}
                                            className="h-48 w-full object-cover rounded-t-xl"
                                        />
                                    </>
                                ) : (
                                    <>
                                        <video
                                            controls
                                            className="h-48 w-full object-cover rounded-t-xl"
                                        >
                                            <source
                                                src={sport?.link_video}
                                                type="video/mp4"
                                            />
                                            Votre navigateur ne supporte pas la
                                            lecture vidéo.
                                        </video>
                                    </>
                                )}

                                <div className="p-5">
                                    <a href="#">
                                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                                            {type == 'picture'
                                                ? sport?.name
                                                : sport?.video_name}
                                        </h5>
                                    </a>
                                    {type == 'picture' && (
                                        <>
                                            <p className="mb-3 font-normal text-gray-700">
                                                {truncate(
                                                    sport?.description,
                                                    50
                                                )}
                                            </p>
                                            <Link
                                                href={`/description/${sport?.slug}`}
                                                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 "
                                            >
                                                En savoir plus
                                                <svg
                                                    className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                                                    aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 14 10"
                                                >
                                                    <path
                                                        stroke="currentColor"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M1 5h12m0 0L9 1m4 4L9 9"
                                                    />
                                                </svg>
                                            </Link>
                                        </>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>Aucun évènement à venir</p>
                )}
            </section>
        </>
    )
}
export default SectionEventHome
