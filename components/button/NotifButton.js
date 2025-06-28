import DATA_TOAST from '@/app/utils/constant/toast'
import { supabase } from '@/lib/initSupabase'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'

const NotifButton = ({ profil, sport }) => {
    const [toggle, setToggle] = useState(false)
    const [update, setUpdate] = useState(false)
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
