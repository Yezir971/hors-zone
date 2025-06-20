'use client'
import Image from 'next/image'
import Link from 'next/link'

const SectionEventHome = ({ sports }) => {

    return (
        <>
            <section>
                <h2 className="mt-[100px] ml-2.5 mb-[1.9rem] font-bold text-[1.25rem]">
                    {' '}
                    Événements à venir
                </h2>
                {sports.length != 0 ? (
                    <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth">
                        {/* Carte 1 */}
                        {sports.map((sport, id) => (
                            <div
                                key={id}
                                className="min-w-[300px] snap-start rounded-xl bg-white shadow-md overflow-hidden"
                            >
                                {/* <Image
                                    src={`${sport.image_url}`}
                                    alt="Quidditch"
                                    className="h-48 w-full object-cover"
                                    width={302}
                                    height={165}
                                /> */}
                                <img
                                    src={sport.image_url}
                                    alt={`image ${sport.name}`}
                                    className="h-48 w-full object-cover rounded-t-xl"
                                />
                                <div className="p-4">
                                    <h3 className="font-semibold text-lg">
                                        {sport.name}
                                    </h3>
                                    <Link
                                        href={`/description/${sport.slug}`}
                                        className="text-blue-600 mt-2 inline-flex items-center"
                                    >
                                        En savoir plus{' '}
                                        <span className="ml-1">→</span>
                                    </Link>
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
