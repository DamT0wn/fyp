import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '../config/firebase'
import { onAuthStateChanged } from 'firebase/auth'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isNewUser, setIsNewUser] = useState(false)

  useEffect(() => {
    if (!auth) {
      console.error('Firebase auth not initialized')
      setError('Firebase authentication not available')
      setLoading(false)
      return
    }

    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(
      auth,
      async (firebaseUser) => {
        try {
          if (firebaseUser) {
            // User is logged in
            console.log('User logged in:', firebaseUser.email)
            
            // Check if user is new (created in last 5 seconds)
            const createdAt = firebaseUser.metadata?.creationTime
            const now = new Date()
            const isNew = createdAt && (now - new Date(createdAt)) < 5000
            
            console.log('User metadata:', {
              createdAt,
              isNew,
              timeDiff: createdAt ? now - new Date(createdAt) : 'N/A'
            })
            
            setIsNewUser(isNew)
            
            const idToken = await firebaseUser.getIdToken()
            
            // Store user info
            const userData = {
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              displayName: firebaseUser.displayName,
              photoURL: firebaseUser.photoURL,
              idToken: idToken,
              isNew: isNew,
            }
            
            setUser(userData)

            // Store token in localStorage for API calls
            localStorage.setItem('token', idToken)
            localStorage.setItem('user', JSON.stringify({
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              displayName: firebaseUser.displayName,
              photoURL: firebaseUser.photoURL,
              isNew: isNew,
            }))
            
            // Store new user flag for redirect
            if (isNew) {
              localStorage.setItem('newUserRedirect', 'true')
            }
          } else {
            // User is logged out
            console.log('User logged out')
            setUser(null)
            setIsNewUser(false)
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            localStorage.removeItem('newUserRedirect')
          }
        } catch (err) {
          console.error('Error in auth state change:', err)
          setError(err.message)
        } finally {
          setLoading(false)
        }
      },
      (error) => {
        console.error('Auth state change error:', error)
        setError(error.message)
        setLoading(false)
      }
    )

    return () => unsubscribe()
  }, [])

  const value = {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    isNewUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
