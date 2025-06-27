const AnswerComment = ({ comment }) => {
    return (
        <div className="flex flex-col w-full max-w-[420px] p-2 rounded-lg">
            <div className="mt-1 flex items-start">
                <div className="border-l-2 border-blue-500 pl-2">
                    <p className="text-xs ">
                        Réponse à{' '}
                        <span className="text-blue-500 font-medium">
                            {comment.user_who_comment.pseudo}
                        </span>
                    </p>
                    <p className="text-xs  truncate">
                        {comment.id_parent_comment.comment}
                    </p>
                </div>
            </div>
            <p className="text-sm ">{comment.comment}</p>
        </div>
    )
}

export default AnswerComment
