'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const Return = () => {
    const router = useRouter()

    const handleBack = () => {
        router.push('/')
    }
    return (
        <div
            onClick={handleBack}
            className="absolute left-8 top-8 cursor-pointer text-white"
        >
            <Image
                src="/images/icons/arrow-left-white.svg"
                alt="arrow-left"
                width={20}
                height={20}
            />
        </div>
    )
}
export default Return
