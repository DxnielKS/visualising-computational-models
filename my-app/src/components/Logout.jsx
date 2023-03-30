import React from 'react'
import { useAuth, AuthProvider, AuthContext } from "../AuthContext";
import { useHistory } from "react-router-dom";
import { useContext, useState } from "react";

const Logout = () => {

    const { logout } = useContext(AuthContext);

    const history = useHistory();

    logout();

    history.push('/');

    return (
        <></>
    );

}

export default Logout