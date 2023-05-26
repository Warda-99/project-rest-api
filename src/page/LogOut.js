import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom'

export const LogOut = (props) => {

    const navigate = useNavigate()

    useEffect(() => {
        wyloguj()
     })

    const wyloguj = () => {
        localStorage.removeItem("user")
        navigate('/')
        window.location.reload();
    }

    return (
        <></>
    );
};