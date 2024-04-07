import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

function PrivateRoute({
  children,
  ...rest
}: {
  children: JSX.Element
  [key: string]: any
}) {
  let navigate = useNavigate()

  let isAuthenticated = true

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth")
    }
  }, [navigate, isAuthenticated])

  return isAuthenticated ? children : null
}

export default PrivateRoute