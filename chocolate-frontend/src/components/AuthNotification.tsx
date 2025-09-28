import { useEffect } from "react"
import { useUser } from "../hooks/useUser"

export const AuthNotification = () => {

    const { notificationMsg, closeNotification } = useUser();

    useEffect(() => {
        const appearanceTimeout = setTimeout(() => {
            closeNotification();
        }, 5000)

        return () => clearTimeout(appearanceTimeout);
    }, [closeNotification])

    return (
        <div className="fixed bottom-32 left-4 z-50 p-6 rounded-lg bg-chocolate-light max-w-md">
            <div className="flex justify-center items-center">
                <p className={`text-2xl font-bold ${notificationMsg?.type === "SUCCESSFUL" ? "text-green-500" : "text-red-500"}`}>{notificationMsg?.msg}</p>
            </div>
        </div>
    )
}
