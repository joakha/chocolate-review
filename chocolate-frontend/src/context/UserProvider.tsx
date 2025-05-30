import { UserContext } from "./UserContext";
import { AuthNotification, ProviderProps, } from "../types/types";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { verifyJWT } from "../api/user";

export const UserProvider = ({ children }: ProviderProps) => {

    const updateNotification = (msg: AuthNotification) => {
        setNotificationMsg(msg);
    }

    const closeNotification = () => {
        setNotificationMsg(null);
    }

    const [notificationMsg, setNotificationMsg] = useState<AuthNotification | null>(null);

    const { isError } = useQuery({
        queryKey: ["verifyJWT"],
        queryFn: verifyJWT,
        retry: false
    });

    const loggedIn = !isError;

    const UserProviderValue = {
        updateNotification,
        closeNotification,
        notificationMsg,
        loggedIn
    }

    return (
        <UserContext.Provider value={UserProviderValue}>
            {children}
        </UserContext.Provider>
    )
}