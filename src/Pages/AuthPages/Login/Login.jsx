import React from "react";
import formBgVideo from "../../../assets/formVideo.mp4"
import { Link } from "react-router";
import { FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import UseAuth from "../../../Hooks/UseAuth";

const Login = () => {

    let { register, handleSubmit, formState: { errors } } = useForm();

    let { googleSignIn } = UseAuth();

    let handleGoogleSignIn = (data) => {
        googleSignIn(data.email, data.password)
            .then(result => {
                console.log(result.user)
            })
            .catch(error => [
                console.log(error)
            ])
    }

    let handleLogin = (data) => {
        console.log(data)
    }

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
                {/* Wrapper */}
                <div className="w-full max-w-[1400px] mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">

                        {/* Left Section */}
                        <div className="text-white space-y-6">
                            <span className="inline-block py-1 px-5 rounded-full border border-gray-300 dark:border-gray-600 text-[15px] font-semibold uppercase bg-white text-black dark:text-text-secondary-dark">
                                Login
                            </span>
                            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
                                Welcome Back to
                            </h1>
                            <h1 className="logoText text-5xl md:text-8xl font-bold tracking-tight">
                                NOVAPRESS
                            </h1>

                            <p className="text-lg text-white dark:text-neutral-300">
                                Please sign in to continue improving public infrastructure.
                            </p>

                            <p className="flex items-center gap-5">
                                New to Novapress? <Link to={"/register"} className="btn btn-outline">Create an account</Link>
                            </p>
                        </div>

                        {/* Login Form */}
                        <div className="dark:bg-black/20 backdrop-blur-lg p-8 md:p-12 rounded-lg shadow-2xl">
                            <div className="space-y-8">
                                <div>
                                    <h2 className="text-3xl font-bold text-white/70">Login</h2>
                                    <p className="mt-2 text-white/70">
                                        Please sign in to continue.
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
                                    {/* Username */}
                                    <div>
                                        <label
                                            htmlFor="Email"
                                            className="block text-sm font-medium text-white/70">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            {...register('email', { required: true })}
                                            id="email"
                                            name="username"
                                            placeholder="Enter your email"
                                            className="block w-full mt-1 px-4 py-3 bg-white/70 border border-neutral-300 rounded-md shadow-sm placeholder-black/60 focus:outline-none sm:text-sm text-black" />
                                        {errors.email?.type === 'required' && <p className="text-white">
                                            Email is required
                                        </p>}
                                    </div>

                                    {/* Password */}
                                    <div>
                                        <label
                                            htmlFor="password"
                                            className="block text-sm font-medium text-white/70">
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            {...register('password',
                                                {
                                                    required: true,
                                                    minLength: 6,
                                                    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?]).{8,}$/

                                                })}
                                            id="password"
                                            name="password"
                                            placeholder="Enter your password"
                                            className="block w-full mt-1 px-4 py-3 bg-white/70 border border-neutral-300 rounded-md shadow-sm placeholder-black/60 focus:outline-none sm:text-sm text-black" />
                                        {errors.password?.type === 'required' && <p className="text-white">
                                            Password is required
                                        </p>}
                                        {errors.password?.type === 'minLength' && <p className="text-white">
                                            Password must be 6 characters or longer
                                        </p>}
                                        {errors.password?.type === 'pattern' && <p className="text-white">
                                            Password must be at least 8 characters, include uppercase, lowercase, number and special character.
                                        </p>}
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        className="w-full mb-0 btn text-white/70 btn-outline border-white/30 hover:text-black">
                                        Login
                                    </button>
                                    <div className="flex items-center gap-4 my-4">
                                        <div className="flex-1 border-t border-white/40"></div>
                                        <span className="text-white/70">or</span>
                                        <div className="flex-1 border-t border-white/40"></div>
                                    </div>
                                    <button onClick={handleGoogleSignIn} className="w-full mb-0 btn text-white/70 btn-outline border-white/30 hover:text-black">
                                        Continue with Google <FaGoogle></FaGoogle>
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
