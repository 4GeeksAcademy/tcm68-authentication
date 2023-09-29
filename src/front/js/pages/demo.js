import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from 'react-router-dom';

export default function demo() {
  const { store, actions } = useContext(Context);
  const isAuthenticated = store.token && store.token !== "" && store.token !== undefined;

  useEffect(() => {
    if (isAuthenticated) {
        // Call your private route API logic here
        actions.getMessage();
    }
}, [isAuthenticated]);
  return (
    <div style={{ background: 'black', color: 'white', textAlign: 'center', fontSize: '2em' }}>
    <h1>Hello, World!</h1>
    <p>{store.message}</p>
</div>
  )
}
