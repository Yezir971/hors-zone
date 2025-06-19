import Image from 'next/image'
const TopLoginSignUp = () => {
    return (
        <span className="flex flex-col">
            <div className="flex gap-2">
                <Image
                    src="/images/icons/arrow-left.svg"
                    alt="arrow-left"
                    width={14}
                    height={10}
                />

                <p>Retour</p>
            </div>
            <div className="w-full flex justify-center mt-8 mb-20">
                <Image
                    src="/images/logo/logo.svg"
                    alt="arrow-left"
                    width={81}
                    height={79}
                />
            </div>
        </span>
    )
}

export default TopLoginSignUp
