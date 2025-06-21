import { authContextApi } from '@/context/authContext'
import { supabase } from '@/lib/initSupabase'
import { useEffect, useRef, useState } from 'react'
import Loading from '../Loading'
import { toast } from 'react-toastify'
import DATA_TOAST from '@/app/utils/constant/toast'
import Image from 'next/image'

const CommentBlock = ({ idSport }) => {
    const [message, setMessage] = useState()
    const { profil } = authContextApi()
    const [comments, setComments] = useState([])
    const [loading, setLoading] = useState(true)
    const [isReply, setIsReply] = useState(false)
    const [replyId, setReplyId] = useState()
    const [update, setupdate] = useState(false)
    const formRef = useRef(null)

    useEffect(() => {
        fetchMessage()
    }, [update])

    const handleChange = (e) => {
        const { name, value } = e.target
        setMessage((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const fetchMessage = async () => {
        try {
            const { data, error } = await supabase
                .from('comments')
                .select(
                    'id, sport_who_comment, user_who_comment(id, pseudo), comment'
                )
                .eq('sport_who_comment', idSport)
            if (error) {
                toast.error(
                    'Problème de connexion avec la base de données pour la réception des messages, veuillez vérifier votre connexion internet.' +
                        error,
                    DATA_TOAST
                )
                return
            }
            setComments(data)
        } catch (error) {
            toast.error(
                'Problème de connexion avec la base de données pour la réception des messages, veuillez vérifier votre connexion internet.' +
                    error,
                DATA_TOAST
            )
        } finally {
            setLoading(true)
        }
    }

    const sendMessage = async (e) => {
        e.preventDefault()
        try {
            if (isReply) {
                const { error } = await supabase.from('comments').insert([
                    {
                        sport_who_comment: idSport,
                        user_who_comment: profil.id,
                        comment: message.comment,
                        id_parent_comment: replyId,
                    },
                ])
                if (error) {
                    toast.error('Réponse pas envoyée.' + error, DATA_TOAST)
                    return
                } else {
                    toast.success('Réponse envoyée.', DATA_TOAST)
                    unTriggerReplay()
                }
            } else {
                const { error } = await supabase.from('comments').insert([
                    {
                        sport_who_comment: idSport,
                        user_who_comment: profil.id,
                        comment: message.comment,
                    },
                ])
                if (error) {
                    toast.error('Message pas envoyée.' + error, DATA_TOAST)
                    return
                } else {
                    toast.success('Message envoyé.', DATA_TOAST)
                }
            }
            setupdate(!update)
            formRef.current?.reset()
        } catch (error) {
            toast.error(
                "Problème de connexion avec la base de données pour l'envoie des messages, veuillez vérifier votre connexion internet." +
                    error,
                DATA_TOAST
            )
        }
    }

    const triggerReplay = (id) => {
        setReplyId(id)
        setIsReply(true)
    }
    const unTriggerReplay = () => {
        setReplyId()
        setIsReply(false)
    }

    if (!loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loading />
            </div>
        )
    }
    return (
        <div className="max-w-md mx-auto rounded-lg border p-4 shadow-sm bg-white">
            {comments.length != 0 ? (
                <>
                    <p className="text-center font-medium text-gray-700 mb-4">
                        {comments.length} commentaire
                        {comments.length > 1 && 's'}
                    </p>
                </>
            ) : (
                <>
                    <p className="text-center font-medium text-gray-700 mb-4">
                        Aucun commentaire disponible
                    </p>
                </>
            )}
            <div className="space-y-4 h-64 overflow-y-auto custom-scrollbar">
                {comments && (
                    <>
                        {comments.map((comment, id) => (
                            <div
                                key={id}
                                className="flex items-start space-x-3"
                            >
                                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                                    <svg
                                        className="w-5 h-5 text-gray-600"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-800">
                                        {comment.user_who_comment.pseudo}
                                    </p>
                                    <p className="text-sm text-gray-700 w-11/12">
                                        {comment.comment}
                                    </p>
                                    <div className="text-xs text-gray-400 mt-1 flex items-center space-x-2">
                                        <span>{comment.temps}</span>
                                        <button
                                            onClick={() =>
                                                triggerReplay(comment.id)
                                            }
                                            className="cursor-pointer text-blue-500 hover:underline"
                                        >
                                            Répondre
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </>
                )}
            </div>
            {isReply && (
                <div className="w-full bg-blue-600 flex justify-between rounded-2xl p-3">
                    <p>Répondre à Sexy james</p>
                    <Image
                        className="cursor-pointer"
                        onClick={unTriggerReplay}
                        alt="avatar"
                        src="/images/icons/close.svg"
                        width={20}
                        height={20}
                    />
                </div>
            )}
            <div className="mt-4 flex items-center space-x-2 border-t pt-4">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <svg
                        className="w-5 h-5 text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                    </svg>
                </div>

                <form ref={formRef} className="w-full" onSubmit={sendMessage}>
                    <input
                        name="comment"
                        onChange={handleChange}
                        type="text"
                        placeholder="Ajoutez un commentaire..."
                        className="w-full border border-gray-300 rounded-full px-4 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
                    />
                    <input
                        type="submit"
                        value="Envoyer"
                        className="invisible absolute"
                    />
                </form>
            </div>
        </div>
    )
}
export default CommentBlock
