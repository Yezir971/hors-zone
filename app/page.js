import HeroBanner from '@/components/home/HeroBanner'
import Image from 'next/image'

export default function Home() {
    return (
        <>
            <HeroBanner />
            <main className="px-5">
                <section>
                    <h2 className="mt-[100px] ml-2.5 mb-[1.9rem] font-bold text-[1.25rem]">
                        {' '}
                        Événements à venir
                    </h2>
                    <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth">
                        {/* Carte 1 */}
                        <div className="min-w-[300px] snap-start rounded-xl bg-white shadow-md overflow-hidden">
                            <Image
                                src="/images/logo/logo.svg"
                                alt="Quidditch"
                                className="h-48 w-full object-cover"
                                width={302}
                                height={165}
                            />
                            <div className="p-4">
                                <h3 className="font-semibold text-lg">
                                    League de Sabre laser
                                </h3>
                                <a
                                    href="#"
                                    className="text-blue-600 mt-2 inline-flex items-center"
                                >
                                    En savoir plus{' '}
                                    <span className="ml-1">→</span>
                                </a>
                            </div>
                        </div>

                        {/* Carte 2 */}
                        <div className="min-w-[300px] snap-start rounded-xl bg-white shadow-md overflow-hidden">
                            <Image
                                src="/images/logo/logo.svg"
                                alt="Quidditch"
                                className="h-48 w-full object-cover"
                                width={302}
                                height={165}
                            />

                            <div className="p-4">
                                <h3 className="font-semibold text-lg">
                                    Quidditch
                                </h3>
                                <a
                                    href="#"
                                    className="text-blue-600 mt-2 inline-flex items-center"
                                >
                                    En savoir plus{' '}
                                    <span className="ml-1">→</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}
