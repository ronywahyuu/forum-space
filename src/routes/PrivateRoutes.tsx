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
  const { data: currentUser, isFetching } = useGetCurrentUserQuery()


  let navigate = useNavigate()

  // NOT USED
  let isAuthenticated = true

  useEffect(() => {
    if (!currentUser && !isFetching) {
      navigate("/login")
    }

    return

  }, [navigate, isAuthenticated, currentUser, isFetching])

  return isAuthenticated ? children : null
}

export default PrivateRoute