import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const TitleCard = ({ title, icons, showMore, labelShowMore }) => {
    const [typeIcon, setTypeIcon] = useState()

    useEffect(() => {
        if (icons === 'like') {
            setTypeIcon('images/icons/like-white.svg')
        } else if (icons === 'notification') {
            setTypeIcon('images/icons/notification.svg')
        }
    }, [])

    return (
        <>
            <div className="pt-[100px] max-w-[450px] pb-[1.9rem] flex justify-between items-center">
                <div className=" flex gap-[18px]">
                    {icons && (
                        <Image
                            src={typeIcon}
                            alt="icon"
                            width={20}
                            height={20}
                        />
                    )}
                    <h2 className="max-w-[400px] text-2xl font-bold">
                        {title}
                    </h2>
                </div>
                {showMore && (
                    <Link href={showMore} className="text-sm underline">
                        {labelShowMore}
                    </Link>
                )}
            </div>
        </>
    )
}

export default TitleCard
