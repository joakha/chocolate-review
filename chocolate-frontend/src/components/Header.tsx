import { Link } from "react-router-dom"
import { useUser } from "../hooks/useUser"

const Header = () => {

  const { loggedIn } = useUser();

  return (
    <header className="bg-chocolate-dark py-8 text-white">
      <div className="container mx-auto flex justify-between">
        <span className="text-3xl font-bold tracking-tighter">
          <Link to="/">Chocolate Review App</Link>
        </span>
        <span className="flex space-x-2">
          <Link to="/register" className="hover:cursor-pointer rounded-md flex items-center bg-chocolate-light px-3 font-bold">
            Register
          </Link>
        </span>
      </div>
    </header>
  )
}

export default Header