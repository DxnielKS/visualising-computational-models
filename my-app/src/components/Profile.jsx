import { useAuth, AuthProvider, AuthContext } from "../AuthContext";
import { createContext, useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const Profile = () => {

    const { currentUser, auth } = useContext(AuthContext);

    const history = useHistory();

    useEffect(() => {

        if (currentUser == null) {
            history.push('/')
        }

    }, []);

    return (
        <div>


            <h1>Hello {currentUser == null ? 'user' : currentUser.displayName}!</h1>

        </div>
    )
}

export default Profile