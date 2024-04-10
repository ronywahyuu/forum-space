import { useGetCurrentUserQuery } from "@/features/auth/authApiSlice"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

function PrivateRoute({
  children,
  ...rest
}: {
  children: JSX.Element
  [key: string]: any
}) {
  const { data: currentUser } = useGetCurrentUserQuery()

  // check token in local storage


  let navigate = useNavigate()

  // NOT USED
  let isAuthenticated = true

  useEffect(() => {
    if (!currentUser) {
      navigate("/login")
    }

    return

  }, [navigate, isAuthenticated, currentUser])

  return isAuthenticated ? children : null
}

export default PrivateRoute