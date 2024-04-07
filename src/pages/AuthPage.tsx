import { Outlet } from "react-router-dom"

type Props = {}

const AuthPages = (props: Props) => {
  return (
    <div className="flex items-center justify-center border h-screen ">
      <Outlet/>
    </div>
  )
}

export default AuthPages