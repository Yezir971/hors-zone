import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { PiBellSimple } from 'react-icons/pi'
import { LiaHeartSolid } from 'react-icons/lia'
// const ICON_MAP = {
//     like: '/images/icons/like-white.svg',
//     notification: '/images/icons/notification.svg',
// }
const TitleCard = ({ title, icons, showMore, labelShowMore }) => {
    // const typeIcon = ICON_MAP[icons]

    return (
        <>
            <div className="pt-[100px] max-w-[450px] pb-[1.9rem] flex justify-between items-center">
                <div className=" flex gap-[18px]">
                    {icons == 'like' && (
                        <LiaHeartSolid className="w-[30px] h-[30px]" />
                    )}
                    {icons == 'notification' && (
                        <PiBellSimple className="w-[30px] h-[30px]" />
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
