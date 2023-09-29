import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from 'react-router-dom';

export const PrivatePage = () => {
    const { store, actions } = useContext(Context);
    const isAuthenticated = store.token && store.token !== "" && store.token !== undefined;
    const navigate = useNavigate(); // Use navigate instead of Navigate

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login"); // Use navigate to navigate to /login
            // return null; // You can return null or a loading indicator here
        }
    }, [])

    useEffect(() => {
        if (isAuthenticated) {
            // Call your private route API logic here
            actions.private_route();
        }
    }, [isAuthenticated]);

    return (
        <div style={{ background: 'black', color: 'white', textAlign: 'center', fontSize: '2em' }}>
            <p>{store.message}</p>
        </div>
    );
}
