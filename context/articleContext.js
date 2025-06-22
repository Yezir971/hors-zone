'use client'
const { createContext, useState, useContext } = require('react')

const ArticleContext = createContext()

const ArticleProvider = ({ children }) => {
    const [updateListSports, setUpdatelistSports] = useState(false)
    const [updateListeVideoSports, setUpdateListeVideoSports] = useState(false)

    const update = () => {
        setUpdatelistSports(!updateListSports)
    }
    const updateVideo = () => {
        setUpdateListeVideoSports(!updateListeVideoSports)
    }
    return (
        <>
            <ArticleContext.Provider
                value={{
                    update,
                    updateListSports,
                    updateVideo,
                    updateListeVideoSports,
                }}
            >
                {children}
            </ArticleContext.Provider>
        </>
    )
}
export default ArticleProvider
export const ArticleContextApi = () => useContext(ArticleContext)
