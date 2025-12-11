import React from "react";
import formBgVideo from "../../../assets/formVideo.mp4"
import { Link, useLocation, useNavigate } from "react-router";
import { FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import UseAuth from "../../../Hooks/UseAuth";
import axios from "axios";

const Login = () => {

    let { register, handleSubmit, formState: { errors } } = useForm();
    let { googleSignIn, signInUser } = UseAuth();

    let location = useLocation();
    let navigate = useNavigate();

    // GOOGLE LOGIN HANDLER
    let handleGoogleSignIn = () => {
        googleSignIn()
            .then(async (result) => {

                let user = result.user;
                let res = await axios.get(`http://localhost:3000/users/${user.email}`);

                if (!res.data) {
                    //create user in DB
                    let newUser = {
                        name: user.displayName,
                        email: user.email,
                        photo: user.photoURL,
                        role: "citizen",
                        isBlocked: false,
                        premium: false
                    };

                    await axios.post("http://localhost:3000/users", newUser);
                }

                navigate(location?.state || "/");
            })
            .catch(error => console.log(error));
    };

    // EMAIL + PASSWORD LOGIN HANDLER
    let handleLogin = async (data) => {
        try {
            let result = await signInUser(data.email, data.password);
            let email = result.user.email;

            let res = await axios.get(`http://localhost:3000/users/${email}`);

            if (!res.data) {
                alert("User does not exist");
                return;
            }

            // BLOCKED USER CHECK
            if (res.data.isBlocked) {
                alert("Your account is blocked. Contact support.");
                return;
            }

            // ROLE BASED NAVIGATION
            if (res.data.role === "admin") {
                navigate("/dashboard/admin");
            }
            else {
                navigate(location?.state || "/");
            }

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="relative w-full overflow-hidden">

            {/* Background Video */}
            <video
                src={formBgVideo}
                autoPlay
                loop
                muted
                playsInline
                className="fixed top-0 left-0 w-full h-full object-cover z-0" />
            <div className="fixed inset-0 bg-black/40 z-0" />

            <div className="relative z-10 py-25">
                <div className="w-full max-w-[1400px] mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">

                        {/* Left Section */}
                        <div className="text-white space-y-6">
                            <span className="inline-block py-1 px-5 rounded-full border border-gray-300 text-[15px] font-semibold uppercase bg-white text-black">
                                Login
                            </span>
                            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
                                Welcome Back to
                            </h1>
                            <h1 className="logoText text-5xl md:text-8xl font-bold tracking-tight">
                                NOVAPRESS
                            </h1>

                            <p className="text-lg text-white">
                                Please sign in to continue improving public infrastructure.
                            </p>

                            <p className="flex items-center gap-5">
                                New to Novapress?
                                <Link state={location.state} to={"/register"} className="btn btn-outline">
                                    Create an account
                                </Link>
                            </p>
                        </div>

                        {/* Login Form */}
                        <div className="dark:bg-black/20 backdrop-blur-lg p-8 md:p-12 rounded-lg shadow-2xl">
                            <div className="space-y-8">
                                <div>
                                    <h2 className="text-3xl font-bold text-white/70">Login</h2>
                                    <p className="mt-2 text-white/70">Please sign in to continue.</p>
                                </div>

                                <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">

                                    {/* Email */}
                                    <div>
                                        <label className="block text-sm font-medium text-white/70">Email</label>
                                        <input
                                            type="email"
                                            {...register('email', { required: true })}
                                            placeholder="Enter your email"
                                            className="block w-full mt-1 px-4 py-3 bg-white/70 border rounded-md text-black" />
                                        {errors.email && <p className="text-white">Email is required</p>}
                                    </div>

                                    {/* Password */}
                                    <div>
                                        <label className="block text-sm font-medium text-white/70">Password</label>
                                        <input
                                            type="password"
                                            {...register('password', { required: true })}
                                            placeholder="Enter your password"
                                            className="block w-full mt-1 px-4 py-3 bg-white/70 border rounded-md text-black" />
                                        {errors.password && <p className="text-white">Password is required</p>}
                                    </div>

                                    {/* Submit Button */}
                                    <button type="submit" className="w-full hover:text-black btn text-white/70 btn-outline">
                                        Login
                                    </button>

                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="flex-1 border-t border-white/40"></div>
                                        <span className="text-white/70">or</span>
                                        <div className="flex-1 border-t border-white/40"></div>
                                    </div>

                                    {/* Google Login */}
                                    <button
                                        type="button"
                                        onClick={handleGoogleSignIn}
                                        className="w-full btn hover:text-black text-white/70 btn-outline">
                                        Continue with Google <FaGoogle />
                                    </button>

                                </form>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
