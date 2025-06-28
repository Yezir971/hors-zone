import { authContextApi } from '@/context/authContext'
import { supabase } from '@/lib/initSupabase'
import { useEffect, useRef, useState } from 'react'
import Loading from '../Loading'
import { toast } from 'react-toastify'
import DATA_TOAST from '@/app/utils/constant/toast'
import Image from 'next/image'
import dateMessage from '@/utils/dateMesage'
import AnswerComment from './AnswerComment'
import Link from 'next/link'

const CommentBlock = ({ idSport }) => {
    const [message, setMessage] = useState()
    const { profil, isAuth } = authContextApi()
    const [comments, setComments] = useState([])
    const [loading, setLoading] = useState(false)
    const [isReply, setIsReply] = useState(false)
    const [replyId, setReplyId] = useState()
    const [update, setupdate] = useState(false)
    const formRef = useRef(null)
    const [replyName, setReplyName] = useState()
    const socketRef = useRef(null)
    const bottomRef = useRef(null)
    const scrollContainerRef = useRef(null)
    useEffect(() => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTop =
                scrollContainerRef.current.scrollHeight
        }
    }, [comments])

    useEffect(() => {
        fetchMessage()
        socketRef.current = new WebSocket(
            process.env.NEXT_PUBLIC_WEBSOCKET_LINK
        )
        socketRef.current.onopen = () => {
            console.log('WebSocket connecté !')
            // on envoie l'id du sport où l'utilisateur est pour lui envoyer le message
            socketRef.current.send(
                JSON.stringify({
                    type: 'init',
                    data: {
                        targetSportId: idSport,
                    },
                })
            )
        }
        socketRef.current.onmessage = (event) => {
            const message = JSON.parse(event.data)

            try {
                if (message.type === 'message') {
                    setComments((prev) => [...prev, message.data[0]])
                }
            } catch (e) {
                console.error(
                    'Erreur lors du parsing du message WebSocket :',
                    e
                )
            }
        }
        return () => {
            if (socketRef.current) {
                socketRef.current.close()
            }
        }
    }, [])

    const sendMessageWebsocket = (msg) => {
        if (
            socketRef.current &&
            socketRef.current.readyState === WebSocket.OPEN
        ) {
            socketRef.current.send(
                JSON.stringify({
                    type: 'message',
                    data: {
                        comment: msg[0],
                        targetSportId: idSport,
                    },
                })
            )
        } else {
            console.warn('Socket non prête')
        }
    }

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
                    'id, sport_who_comment, user_who_comment(id, pseudo), comment, date, id_parent_comment(comment)'
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
            setLoading(false)
        }
    }

    const sendMessage = async (e) => {
        e.preventDefault()
        const dataMessage = {
            sport_who_comment: idSport,
            user_who_comment: profil.id,
            comment: message.comment,
            date: new Date().toISOString(),
            ...(isReply && { id_parent_comment: replyId }),
        }
        try {
            if (isReply) {
                const { error, data } = await supabase
                    .from('comments')
                    .insert(dataMessage)
                    .select(
                        'id, sport_who_comment, user_who_comment(id, pseudo), comment, date, id_parent_comment(comment)'
                    )
                if (error) {
                    toast.error('Réponse pas envoyée.' + error, DATA_TOAST)
                    return
                } else {
                    toast.success('Réponse envoyée.', DATA_TOAST)
                    unTriggerReplay()
                }
                sendMessageWebsocket([data, idSport])
            } else {
                const { error, data } = await supabase
                    .from('comments')
                    .insert(dataMessage)
                    .select(
                        'id, sport_who_comment, user_who_comment(id, pseudo), comment, date'
                    )
                if (error) {
                    toast.error(
                        'Message pas envoyée.' + error.message,
                        DATA_TOAST
                    )
                    return
                } else {
                    toast.success('Message envoyé.', DATA_TOAST)
                }
                sendMessageWebsocket([data, idSport])
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

    const deleteComment = async (id) => {
        try {
            const { error } = await supabase
                .from('comments')
                .delete()
                .eq('id', id)
            if (error) {
                toast.error('Commentaire pas supprimé.' + error, DATA_TOAST)
            }
            toast.success('Commentaire supprimé.', DATA_TOAST)
            fetchMessage()
        } catch (error) {
            toast.error('Commentaire pas supprimé.' + error, DATA_TOAST)
        }
    }
    const triggerReplay = (id, name) => {
        setReplyId(id)
        setReplyName(name)
        setIsReply(true)
    }
    const unTriggerReplay = () => {
        setReplyId()
        setIsReply(false)
        setReplyName()
    }

    if (loading && !isAuth) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loading />
            </div>
        )
    }
    return (
        // <div className="max-w-md mx-auto rounded-lg border p-4 shadow-sm bg-white">
        <div className="w-full rounded-lg border p-4 shadow-sm bg-[var(--color-background-comment)] box-border">
            {comments.length != 0 ? (
                <>
                    <p className="text-center font-medium  mb-4">
                        {comments.length} commentaire
                        {comments.length > 1 && 's'}
                    </p>
                </>
            ) : (
                <>
                    <p className="text-center font-medium  mb-4">
                        Aucun commentaire disponible
                    </p>
                </>
            )}
            <div
                ref={scrollContainerRef}
                className="space-y-4 h-64 overflow-y-auto custom-scrollbar"
            >
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
                                    <Link
                                        className="hover:underline cursor-pointer"
                                        href={`/profil/${comment.user_who_comment.id}`}
                                    >
                                        <p className="font-semibold ">
                                            {comment.user_who_comment.pseudo}
                                        </p>
                                    </Link>

                                    {comment.id_parent_comment ? (
                                        <AnswerComment comment={comment} />
                                    ) : (
                                        <p className="text-sm  w-11/12">
                                            {comment.comment}
                                        </p>
                                    )}
                                    <div className="text-xs  mt-1 flex items-center space-x-2">
                                        <span>
                                            {dateMessage(
                                                new Date(comment.date)
                                            )}
                                        </span>
                                        <button
                                            onClick={() =>
                                                triggerReplay(
                                                    comment.id,
                                                    comment.user_who_comment
                                                        .pseudo
                                                )
                                            }
                                            className="cursor-pointer text-blue-500 hover:underline"
                                        >
                                            Répondre
                                        </button>
                                        {profil?.is_admin && (
                                            <button
                                                onClick={() =>
                                                    deleteComment(comment.id)
                                                }
                                                className="cursor-pointer text-red-500 hover:underline"
                                            >
                                                Supprimer
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </>
                )}
            </div>
            {isReply && (
                <div className="w-full bg-blue-600 flex justify-between rounded-2xl p-3">
                    <p>
                        Répondre à{' '}
                        <span className="text-white font-medium">
                            {replyName}
                        </span>
                    </p>
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
                <form
                    ref={formRef}
                    className="lg:w-full w-full box-border"
                    onSubmit={sendMessage}
                >
                    <input
                        name="comment"
                        onChange={handleChange}
                        type="text"
                        disabled={!isAuth}
                        placeholder={
                            profil?.id
                                ? 'Ajoutez un commentaire'
                                : 'Connecte-toi pour ajouter un commentaire'
                        }
                        className="w-4/5 bg-[var(--color-background-input-comment)] placeholder:text-[var(--noir)] border border-[var(--color-border-input-comment)] rounded-full px-4 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400 box-border"
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
