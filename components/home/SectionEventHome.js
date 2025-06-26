'use client'
import truncate from '@/utils/truncate'
import truncateDate from '@/utils/truncateDate'
import Image from 'next/image'
import Link from 'next/link'
import TitleCard from '../card/TitleCard'
import Filtre from '../card/filtre/Filtre'

const SectionEventHome = ({
    sports,
    titre,
    type,
    icons,
    filtre,
    infiniteScroll,
    showMore,
    labelShowMore,
}) => {
    return (
        <>
            <section className="container px-10">
                <TitleCard
                    title={titre}
                    showMore={showMore}
                    icons={icons}
                    labelShowMore={labelShowMore}
                />

                {true && <Filtre />}
                {sports && sports?.length != 0 ? (
                    <div
                        className={
                            infiniteScroll
                                ? 'flex gap-4 flex-wrap '
                                : 'flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth '
                        }
                    >
                        {sports.map((sport, id) => (
                            <div
                                key={id}
                                className="max-w-[300px] border-[20px] border-solid border-[var(--card-color-nuance-1)] shrink-0 snap-start bg-[var(--card-color-nuance-1)] rounded-xl shadow-md overflow-hidden"
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
                                        <video
                                            controls
                                            className="h-48 w-full object-cover rounded-[10px] "
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

                                <div className="">
                                    <a href="#">
                                        <h5 className="mb-2 mt-2.5 text-2xl font-bold tracking-tight">
                                            {type == 'picture'
                                                ? sport?.name
                                                : sport?.video_name}
                                        </h5>
                                    </a>
                                    <p className="mt-2.5 font-normal ">
                                        {truncate(sport?.description, 50)}
                                    </p>
                                    {type == 'picture' ? (
                                        <div className="flex justify-between items-center">
                                            <Link
                                                href={`/description/${sport?.slug}`}
                                                className="inline-flex items-center mt-8 px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 "
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
                                            <Image
                                                src="/images/icons/trash.svg"
                                                alt="trash"
                                                width={20}
                                                height={20}
                                                className="cursor-pointer"
                                            />
                                        </div>
                                    ) : (
                                        <div className="flex justify-between items-center">
                                            <p className="text-[10px] font-normal mt-2.5 ">
                                                Publié le{' '}
                                                {truncateDate(
                                                    sport?.created_at
                                                )}
                                            </p>
                                            <Image
                                                src="/images/icons/trash.svg"
                                                alt="trash"
                                                width={20}
                                                height={20}
                                                className="cursor-pointer"
                                            />
                                        </div>
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
