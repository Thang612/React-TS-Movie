import React, { useState } from "react";
import { login } from "../Services/UserService";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { LOGIN } from "../Redux/userSlice";
import { useNavigate } from "react-router";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch()
    const nav = useNavigate()

    const handleLogin = async () => {
        const result = await login(email, password);

        if (result && result.user && result.user.email) {
            toast.success("Login success");
        
            dispatch(LOGIN({
                token: result?.token,
                mail: result?.user.email 
            }));

            nav('/admin/movie/add');
            console.log("Login success:", result?.token, result?.user.email);
            // TODO: redirect / lưu state / navigate
        } else {
            toast.error("Check your password and email. Try again.")
            console.log("Login failed:", result);
        }
    };

    return (

        <div className="relative flex min-h-screen text-gray-800 antialiased flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12">
            <div className="relative py-3 sm:w-96 mx-auto text-center">
                <span className="text-2xl font-light ">Login to your account</span>
                <div className="mt-4 bg-white shadow-md rounded-lg text-left">
                    <div className="h-2 bg-orange-400 rounded-t-md"></div>
                    <div className="px-8 py-6 ">
                        <label className="block font-semibold"> Username or Email </label>
                        <input value={email} onChange={(e) => { setEmail(e.target.value) }} type="text" placeholder="Email" className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md" />
                        <label className="block mt-3 font-semibold"> Username or Email </label>
                        <input value={password} onChange={(e) => { setPassword(e.target.value) }} type="password" placeholder="Password" className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md" />
                        <div className="flex justify-between items-baseline">
                            <button onClick={() => handleLogin()} type="submit" className="mt-4 bg-orange-500 text-white py-2 px-6 rounded-md hover:bg-orange-600 " disabled={!email || !password}>Login</button>
                            <a href="!#" className="text-sm hover:underline">Forgot password?</a>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Login;