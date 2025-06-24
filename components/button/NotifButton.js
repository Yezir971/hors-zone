import Image from 'next/image'

const NotifButton = () => {
    return (
        <Image
            className="cursor-pointer"
            src="/images/icons/notification.svg"
            alt="notification button"
            width={20}
            height={20}
        />
    )
}

export default NotifButton
