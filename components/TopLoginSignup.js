import Image from 'next/image'
import Link from 'next/link'
const TopLoginSignUp = () => {
    return (
        <span className="flex flex-col">
            <Link href="/" className="flex cursor-pointer gap-2">
                <Image
                    src="/images/icons/arrow-left.svg"
                    alt="arrow-left"
                    width={20}
                    height={16}
                    className="w-[14px] h-[10px] md:w-[20px] md:h-[16px]"
                />

                {/* <p className="font-medium text-[8px] lg:text-[12px] text-[var(--gris-bleute)]">
                    Retour
                </p> */}
            </Link>
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
