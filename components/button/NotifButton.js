import DATA_TOAST from '@/app/utils/constant/toast'
import { authContextApi } from '@/context/authContext'
import { supabase } from '@/lib/initSupabase'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'

const NotifButton = ({ profil, sport }) => {
    const [toggle, setToggle] = useState(false)
    const [update, setUpdate] = useState(false)
    const { isAuth } = authContextApi()
    const router = useRouter()
    useEffect(() => {
        if (profil) {
            fetchNotif()
        }
    }, [profil, update])
    const fetchNotif = async () => {
        const { data, error } = await supabase
            .from('notif')
            .select('*')
            .eq('user_who_want_notif', profil?.id)
            .eq('sport_notif', sport?.id)
        if (error) {
            toast.error(error.message, DATA_TOAST)
        }
        if (data.length > 0) {
            setToggle(true)
        } else {
            setToggle(false)
        }
    }

    const sendNotif = async () => {
        if (!isAuth) {
            toast.warning(
                'Connecte-toi pour ajouter une notification',
                DATA_TOAST
            )
            router.push('/login')
            return
        }
        try {
            if (toggle) {
                const { error } = await supabase
                    .from('notif')
                    .delete()
                    .eq('user_who_want_notif', profil?.id)
                    .eq('sport_notif', sport?.id)
                if (error) {
                    toast.error(error.message, DATA_TOAST)
                }
                toast.success('Notification supprimée avec succès', DATA_TOAST)
            } else {
                const { error } = await supabase.from('notif').insert([
                    {
                        user_who_want_notif: profil?.id,
                        sport_notif: sport?.id,
                    },
                ])
                if (error) {
                    toast.error(error.message, DATA_TOAST)
                }
                toast.success('Notification ajoutée avec succès', DATA_TOAST)
            }

            setToggle(!toggle)
            setUpdate(!update)
        } catch (error) {
            toast.error(error.message, DATA_TOAST)
        }
    }
    return (
        <>
            {toggle ? (
                <Image
                    onClick={() => sendNotif()}
                    className="cursor-pointer"
                    src="/images/icons/notification-active.svg"
                    alt="notification button"
                    width={20}
                    height={20}
                />
            ) : (
                <Image
                    onClick={() => sendNotif()}
                    className="cursor-pointer"
                    src="/images/icons/notification.svg"
                    alt="notification button"
                    width={20}
                    height={20}
                />
            )}
        </>
    )
}

export default NotifButton
