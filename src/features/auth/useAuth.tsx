import React, { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { useGetCurrentUserQuery } from "./authApiSlice"

// interface AuthContextProps {
//   isAuthenticated: boolean
//   setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
// }
interface User {
  id: string
  name: string
  email: string
  avatar: string
}

interface AuthContextProps {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  currentUser: User | undefined
  setCurrentUser: React.Dispatch<React.SetStateAction<User | undefined>>
  logout: () => void
}

const initAuthContextPropsState = {
  isAuthenticated: false,
  setIsAuthenticated: () => { },
  currentUser: undefined,
  setCurrentUser: () => { },
  logout: () => { 
    localStorage.removeItem("token")
    window.location.reload()
  }
}

const AuthContext = React.createContext<AuthContextProps | undefined>(initAuthContextPropsState)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}

export const AuthProvider = ({ children }: {
  children: React.ReactNode
}) => {
  const { data } = useGetCurrentUserQuery()
  const [isAuthenticated, setIsAuthenticated] = React.useState(true)
  const navigate = useNavigate()
  React.useEffect(() => {

    if (data) {
      setIsAuthenticated(true)
    } else {
      setIsAuthenticated(false)
    }

    if (!isAuthenticated) {
      navigate("/login")
    }
  }, [navigate, isAuthenticated, data])


  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      setIsAuthenticated,
      currentUser: undefined,
      setCurrentUser: () => { },
      logout: () => { 
        localStorage.removeItem("token")
        navigate("/login")
      }
    }}>
      {children}
    </AuthContext.Provider>
  )
}