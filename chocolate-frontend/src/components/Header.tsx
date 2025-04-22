import { Link, useNavigate } from "react-router-dom"
import { useUser } from "../hooks/useUser"
import { logoutUser } from "../api/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthNotification } from "../types/types";

const Header = () => {

  const { loggedIn, updateNotification } = useUser();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const headerMutation = useMutation({
    mutationFn: logoutUser,
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ["verifyJWT"]});
      const notificationMsg: AuthNotification = {
        msg: "Logout successful",
        type: "SUCCESSFUL"
      }

      updateNotification(notificationMsg);
      navigate("/");
    },
    onError: (error: Error) => {
      const notificationMsg: AuthNotification = {
        msg: error.message,
        type: "UNSUCCESSFUL"
      }

      updateNotification(notificationMsg);
    }
  })

  const logout = () => {
    headerMutation.mutate();
  }

  return (
    <header className="bg-chocolate-dark py-8 text-white">
      <div className="container mx-auto flex justify-between">
        <span className="text-3xl font-bold tracking-tighter">
          <Link to="/">Chocolate Review App</Link>
        </span>
        <span className="flex space-x-2">
          {loggedIn ? (
            <>
              <Link
                to={"/user-reviews"}
                className="hover:cursor-pointer rounded-md flex items-center bg-chocolate-light px-3 font-bold"
              >
                Your Reviews
              </Link>
              <Link
                to={"/user-comments"}
                className="hover:cursor-pointer rounded-md flex items-center bg-chocolate-light px-3 font-bold"

              >
                Your Comments
              </Link>
              <button
                className="bg-chocolate-light px-3 font-bold hover:cursor-pointer rounded-md"
                onClick={logout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/register"
                className="hover:cursor-pointer rounded-md flex items-center bg-chocolate-light px-3 font-bold"
              >
                Register
              </Link>
              <Link
                to={"/login"}
                className="hover:cursor-pointer rounded-md flex items-center bg-chocolate-light px-3 font-bold"
              >
                Login
              </Link>
            </>
          )}
        </span>
      </div>
    </header>
  )
}

export default Header