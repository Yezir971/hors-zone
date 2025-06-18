'use client'
const { createContext, useState, useContext } = require('react')

const ArticleContext = createContext()

const ArticleProvider = ({ children }) => {
  const [updateListSports, setUpdatelistSports] = useState(false)

  const update = () => {
    setUpdatelistSports(!updateListSports)
  }
  return (
    <>
      <ArticleContext.Provider value={{ update, updateListSports }}>
        {children}
      </ArticleContext.Provider>
    </>
  )
}
export default ArticleProvider
export const ArticleContextApi = () => useContext(ArticleContext)
