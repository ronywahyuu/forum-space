import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { MdOutlineDarkMode, MdOutlineWbSunny } from "react-icons/md"
import { Outlet } from "react-router-dom"

type Props = {}

const AuthPages = (props: Props) => {
  const { theme, setTheme } = useTheme()

  return (
    <div className="flex items-center justify-center border h-screen relative">
      <div className="absolute top-0 right-0 p-3">
        {/* Dark Mode */}
        <Button variant="outline" className="text-gray-600 border-gray-400 text-base md:text-2xl"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? (
            <MdOutlineWbSunny />
          ) : (
            <MdOutlineDarkMode />
          )}

        </Button>

      </div>
      <Outlet />
    </div>
  )
}

export default AuthPages