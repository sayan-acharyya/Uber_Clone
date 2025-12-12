import { set } from "mongoose";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const UserLogin = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [userData, setUserData] = useState({})

    const handleLogin = (e) => {
        e.preventDefault();
        setUserData({
            email: email,
            password: password
        });
        //console.log(userData);


        setEmail("");
        setPassword("");
    }
const navigate = useNavigate();
    return (
        <div className="p-7 h-screen flex flex-col justify-between">
            <div>
                <img
                    onClick={() => navigate("/")}
                    className="w-16 mb-10"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQy-OIkA6In0fTvVwZADPmFFibjmszu2A0g&s"
                    alt=""
                />

                <form>
                    <h3 className="text-lg font-medium mb-2">What's your email</h3>
                    <input
                        required
                        className="bg-[#eeeeee] mb-7 rounded-lg px-4 py-2   w-full text-lg placeholder:text-base"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="email@example.com"
                    />

                    <h3 className="text-lg font-medium mb-2">Enter Password</h3>
                    <input
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-[#eeeeee] mb-7 rounded-lg px-4 py-2   w-full text-lg placeholder:text-base"
                        type="password"
                        placeholder="password"
                    />

                    <button
                        onClick={handleLogin}
                        type="submit"
                        className="bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg"
                    >
                        Login
                    </button>
                </form>

                <p className="text-center">
                    New here?{" "}
                    <Link to="/signup" className="text-blue-600">
                        Create new Account
                    </Link>
                </p>
            </div>

            <div>
                <Link
                    to="/captain-login"
                    className="bg-[#10b461] flex items-center justify-center text-white font-semibold mb-5 rounded-lg px-4 py-2 w-full text-lg"
                >
                    Sign in as Captain
                </Link>
            </div>
        </div>
    );
};

export default UserLogin;
