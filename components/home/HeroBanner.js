import Image from 'next/image'
import TopHeroBanner from './TopHeroBanner'

const HeroBanner = () => {
    return (
        <>
            <div className="h-screen p-10 text-white bg-[linear-gradient(90deg,_var(--orange-1)_35%,_var(--orange-3)_100%)] rounded-b-[50px]">
                <TopHeroBanner />

                <h1 className="font-bold text-[clamp(2rem,5vw,3rem)]">
                    Explorez le sport autrement !
                </h1>
                <p className="font-normal text-[clamp(1rem,2vw,1.25rem)] mb-7 mt-12">
                    Quidditch, sabre laser, tir à l’arc à cheval, yoga aérien…
                    Hors Zone te fait découvrir des sports insolites et leurs
                    événements près de chez toi.
                </p>

                <p className="font-semibold text-[clamp(1rem,2vw,1.25rem)] mb-16">
                    Change de zone. Vis l’aventure.
                </p>
                <Image
                    className="mx-auto mt-20"
                    src="/images/icons/arrow-down.svg"
                    alt="arrow-down"
                    width={21}
                    height={11}
                />
            </div>
        </>
    )
}
export default HeroBanner
