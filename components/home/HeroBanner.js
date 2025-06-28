import TopHeroBanner from './TopHeroBanner'

const HeroBanner = ({ titre, description, subDescription }) => {
    return (
        <>
            <div className="h-4/12 lg:h-[447px] lg:px-[163px] shadow-xl/20 p-10 text-white bg-[linear-gradient(90deg,_#0a5197_35%,_#0080ff_100%)] rounded-b-[50px]">
                <TopHeroBanner />
                <h1 className="font-bold mt-[168px] lg:mt-[119px] text-[clamp(2rem,5vw,3rem)]">
                    {titre}
                </h1>
                <p className="font-normal text-[clamp(1rem,2vw,1.25rem)] mb-7 mt-12">
                    {description}
                </p>

                <p className="font-semibold text-[clamp(1rem,2vw,1.25rem)] mb-[75px]">
                    {subDescription}
                </p>
            </div>
        </>
    )
}
export default HeroBanner
