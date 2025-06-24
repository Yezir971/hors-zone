import TopHeroBanner from './TopHeroBanner'

const HeroBanner = () => {
    return (
        <>
            <div className="h-4/12 lg:h-96 shadow-xl/20 p-10 text-white bg-[linear-gradient(90deg,_#0a5197_35%,_#0080ff_100%)] rounded-b-[50px]">
                <TopHeroBanner />
                <h1 className="font-bold mt-[200px] lg:mt-16 text-[clamp(2rem,5vw,3rem)]">
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
            </div>
        </>
    )
}
export default HeroBanner
