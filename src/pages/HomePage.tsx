import BottomNav from "@/components/BottomNav"
import Navbar from "@/components/Navbar"
import { Outlet } from "react-router-dom"

type Props = {}

const HomePage = (props: Props) => {
  return (
    <main className="">
      <Navbar />
      <section className="max-w-screen-md  mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Outlet/>
      </section>
      <BottomNav/>
    </main>
  )
}

export default HomePage