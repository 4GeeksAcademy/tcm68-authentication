import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignup = async () => {
        const response = await fetch(`${process.env.BACKEND_URL}api/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        if (response.status === 201) {
            // User registered successfully, redirect to login page or handle accordingly
            navigate("/login");
        } else {
            // Handle registration failure (e.g., display an error message)
            console.error("Registration failed");
        }
    };

    return (
        <div className="text-center mt-5">
            <h1>Signup</h1>
            <form>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                ></input>
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                ></input>
                <button onClick={handleSignup}>Signup</button>
            </form>
        </div>
    );
};
