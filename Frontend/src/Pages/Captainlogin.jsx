import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { CaptainDataContext } from '../context/CaptainContext'
import { useContext } from "react";

const CaptainLogin = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const { captain, setCaptain } = useContext(CaptainDataContext);


    const handleLogin = async(e) => {
        e.preventDefault();
        const captainData = {
            email: email,
            password
        }
        const response = await axios.post("http://localhost:4000/captains/login",captainData);

        if(response.status === 200){
            const data = response.data;
            setCaptain(data.captain);
            localStorage.setItem("token",data.token);
            toast.success("Login successful")
            navigate("/captain-home");
        }
        setEmail("");
        setPassword("");
    }

    return (
        <div className="p-7 h-screen flex flex-col justify-between">
            <div>
                <img
                    onClick={() => navigate("/")}
                    className="w-20 mb-3"
                    src="https://www.svgrepo.com/show/505031/uber-driver.svg"
                    alt="Captain Icon"
                />

                <form>
                    <h3 className="text-lg font-medium mb-2">What's your email</h3>
                    <input
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
                        type="email"
                        placeholder="email@example.com"
                    />

                    <h3 className="text-lg font-medium mb-2">Enter Password</h3>
                    <input
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
                        type="password"
                        placeholder="password"
                    />

                    <button
                        onClick={handleLogin}
                        className="bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg">
                        Login
                    </button>
                </form>

                <p className="text-center">
                    Join a fleet?{" "}
                    <Link to="/captain-signup" className="text-blue-600">Register as a Captain</Link>
                </p>
            </div>

            <div>
                <Link
                    to='/login'
                    className='bg-yellow-600 flex items-center justify-center text-white font-semibold mb-5 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
                >Sign in as User</Link>
            </div>
        </div>
    );
};

export default CaptainLogin;
