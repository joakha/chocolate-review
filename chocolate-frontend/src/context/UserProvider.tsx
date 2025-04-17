import { UserContext } from "./UserContext";
import { AuthNotification, UserProviderType,  } from "../types/types";
import { useState } from "react";

export const UserProvider = ({children}: UserProviderType) => {

    const updateNotification = (msg: AuthNotification) => {
        setNotificationMsg(msg);
    }

    const closeNotification = () => {
        setNotificationMsg(null);
    }

    const [notificationMsg, setNotificationMsg] = useState<AuthNotification | null>(null);

    const UserProviderValue = {
        updateNotification,
        closeNotification,
        notificationMsg
    }

    return (
        <UserContext.Provider value={UserProviderValue}>
            {children}
        </UserContext.Provider>
    )
}