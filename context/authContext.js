'use client'

import DATA_TOAST from '@/app/utils/constant/toast'
import { supabase } from '@/lib/initSupabase'
import { useRouter } from 'next/navigation'
import { Bounce, toast, ToastContainer } from 'react-toastify'

const { createContext, useContext, useState, useEffect } = require('react')

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const router = useRouter()
  const [isAuth, setIsAuth] = useState(false)
  const [isLoadingUser, setIsLoadingUser] = useState(true)
  const [user, setUser] = useState(null)
  const [profil, setProfil] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getCurrentUser = async () => {
      const { data, error } = await supabase.auth.getUser()
      if (data?.user) {
        setUser(data.user)
      } else {
        setUser(null)
      }
      setIsLoading(false)
      setIsLoadingUser(false)
    }

    getCurrentUser()
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setUser(session.user)
        } else {
          setUser(null)
        }
      }
    )
    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])
  useEffect(() => {
    const getCurrentProfil = async () => {
      if (!user) return

      const { data, error } = await supabase
        .from('profil')
        .select()
        .eq('uuid', user.id)
        .single()

      if (error) {
        console.error('Erreur de chargement du profil:', error)
      } else {
        setProfil(data)
      }
    }
    getCurrentProfil()
  }, [user])

  const login = async (dataForm) => {
    setIsLoading(true)
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: dataForm.email,
        password: dataForm.password,
      })

      if (error) {
        setIsLoading(false)
        const message = error.message

        if (message === 'missing email or phone') {
          toast.warning('Mot de passe ou mail manquant', DATA_TOAST)
        } else if (message === 'Invalid login credentials') {
          toast.warning('Mot de passe ou mail incorrect', DATA_TOAST)
        } else {
          toast.error('Erreur inconnue : ' + message, DATA_TOAST)
        }

        return
      }
      setIsAuth(true)
      router.push('/home')
    } catch (e) {
      toast.error(
        'Errreur de connexion, Vérifiez votre connexion internet ',
        DATA_TOAST
      )
      throw new Error(`erreur de connexion avec supabase ${e}`)
    } finally {
      setIsLoading(false)
    }
  }

  const signUp = async (dataForm) => {
    setIsLoading(true)
    try {
      const { error } = await supabase.auth.signUp({
        email: dataForm.email,
        password: dataForm.password,
        options: {
          data: {
            name: dataForm.name,
          },
        },
      })
      if (error) {
        const message = error.message

        if (message === 'User already registered') {
          toast.warning('Votre compte est déjà créé !', DATA_TOAST)
        } else if (
          message.includes('Password should be at least 8 characters')
        ) {
          toast.warning('Le mot de passe est trop faible.', DATA_TOAST)
        } else {
          toast.error("Erreur d'inscription : " + message, DATA_TOAST)
        }
        return
      }
      toast.success(
        'Compte créé ! Vérifiez votre boîte mail pour confirmer.',
        DATA_TOAST
      )
    } catch (e) {
      toast.error(
        'Errreur de connexion, Vérifier votre connexion internet ',
        DATA_TOAST
      )
      throw new Error(`erreur de connexion avec supabase ${e}`)
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    try {
      await supabase.auth.signOut()
      setUser(null)
      router.push('/')
    } catch (error) {
      toast.error(
        'Errreur de connexion, Vérifier votre connexion internet ',
        DATA_TOAST
      )
      throw new Error(`erreur de connexion avec supabase ${error}`)
    }
  }
  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        isLoading,
        signUp,
        isAuth: !!user,
        user,
        isLoadingUser,
        profil,
      }}
    >
      {children}
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
    </AuthContext.Provider>
  )
}

export const authContextApi = () => useContext(AuthContext)
