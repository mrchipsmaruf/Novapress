import React from "react";
import formBgVideo from "../../../assets/formVideo.mp4";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import UseAuth from "../../../Hooks/UseAuth";
import axios from "axios";
import saveUserToDB from "../../../Services/saveUserToDB";

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { registerUser, googleSignIn, updateUserProfile } = UseAuth();

    const location = useLocation();
    const navigate = useNavigate();

    // -------------------------------------------
    // GOOGLE REGISTRATION HANDLER
    // -------------------------------------------
    const handleGoogleRegistration = async () => {
        try {
            const result = await googleSignIn();
            const user = result.user;

            const newUser = {
                name: user.displayName,
                email: user.email,
                photo: user.photoURL,
                role: "citizen",
                isBlocked: false,
                premium: false,
            };

            // ✅ Always attempt to save
            // Backend will ignore if user already exists
            await saveUserToDB(newUser);

            navigate(location.state || "/");
        } catch (error) {
            console.error("Google registration error:", error);
        }
    };


    // -------------------------------------------
    // EMAIL REGISTRATION HANDLER
    // -------------------------------------------
    const handleRegistration = async (data) => {
        try {
            const photoImage = data.photo[0];

            // 1. Create Firebase user
            await registerUser(data.email, data.password);

            // 2. Upload photo to imgbb
            const formData = new FormData();
            formData.append("image", photoImage);

            const image_API_URL =
                `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_Image_Host_Key}`;

            const imgRes = await axios.post(image_API_URL, formData);
            const photoURL = imgRes.data.data.url;

            // 3. Update Firebase profile
            await updateUserProfile({
                displayName: data.name,
                photoURL: photoURL
            });

            // 4. Create user for backend
            const newUser = {
                name: data.name,
                email: data.email,
                photo: photoURL,
                role: "citizen",
                isBlocked: false,
                premium: false
            };

            await saveUserToDB(newUser);


            navigate(location.state || "/");

        } catch (error) {
            console.error(error);
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
                className="fixed top-0 left-0 w-full h-full object-cover z-0"
            />

            <div className="fixed inset-0 bg-black/40 z-0" />

            <div className="relative z-10 py-25">
                <div className="w-full max-w-[1400px] mx-auto">
                    <div className="flex md:flex-row flex-col gap-8 justify-between md:gap-16">

                        {/* LEFT SECTION */}
                        <div className="text-white space-y-6">
                            <span className="inline-block px-3 py-1 mb-6 border border-white/50 dark:border-white/20 rounded-full text-xl uppercase tracking-[0.2em] font-bold">
                                Create an account
                            </span>

                            <h1 className="text-5xl md:text-6xl font-bold">Welcome to</h1>
                            <h1 className="logoText text-5xl md:text-8xl font-bold">NOVAPRESS</h1>

                            <p className="text-lg text-white/70">
                                Register now to be a part of smarter civic management.
                            </p>

                            <p className="flex items-center gap-5">
                                Already have an account?
                                <Link state={location.state} to={"/login"} className="btn btn-outline">
                                    Login
                                </Link>
                            </p>
                        </div>

                        {/* RIGHT FORM SECTION */}
                        <div className="dark:bg-black/20 backdrop-blur-lg p-8 md:p-12 rounded-lg shadow-2xl md:w-[650px] w-full">
                            <p className="pb-5 text-2xl text-white/70">
                                Please sign up to continue.
                            </p>

                            <form onSubmit={handleSubmit(handleRegistration)} className="space-y-2">

                                {/* NAME */}
                                <div>
                                    <label className="block text-sm font-medium text-white/70">Name</label>
                                    <input
                                        type="text"
                                        {...register('name', { required: true })}
                                        placeholder="Enter your name"
                                        className="block w-full px-4 py-3 bg-white/70 border rounded-md text-black"
                                    />
                                    {errors.name && <p className="text-white">Name is required</p>}
                                </div>

                                {/* EMAIL */}
                                <div>
                                    <label className="block text-sm font-medium text-white/70">Email</label>
                                    <input
                                        type="email"
                                        {...register('email', { required: true })}
                                        placeholder="Enter your email"
                                        className="block w-full px-4 py-3 bg-white/70 border rounded-md text-black"
                                    />
                                    {errors.email && <p className="text-white">Email is required</p>}
                                </div>

                                {/* PHOTO UPLOAD */}
                                <div>
                                    <label className="block text-sm font-medium text-white/70">Photo upload</label>
                                    <input
                                        type="file"
                                        {...register('photo', { required: true })}
                                        className="block file-input w-full bg-white/70 border rounded-md text-black"
                                    />
                                    {errors.photo && <p className="text-white">Photo is required</p>}
                                </div>

                                {/* PASSWORD */}
                                <div>
                                    <label className="block text-sm font-medium text-white/70">Password</label>
                                    <input
                                        type="password"
                                        {...register('password', {
                                            required: true,
                                            minLength: 8,
                                            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-={};':"\\|,.<>/?]).{8,}$/
                                        })}
                                        placeholder="Enter your password"
                                        className="block w-full px-4 py-3 bg-white/70 border rounded-md text-black"
                                    />

                                    {errors.password?.type === 'required' &&
                                        <p className="text-white">Password is required</p>
                                    }
                                    {errors.password?.type === 'minLength' &&
                                        <p className="text-white">Password must be at least 8 characters</p>
                                    }
                                    {errors.password?.type === 'pattern' &&
                                        <p className="text-white">
                                            Password must include uppercase, lowercase, number & special character.
                                        </p>
                                    }
                                </div>

                                {/* SUBMIT BUTTON */}
                                <button
                                    type="submit"
                                    className="w-full btn mt-2 hover:text-black text-white/70 btn-outline border-white/30"
                                >
                                    Create an account
                                </button>

                                {/* DIVIDER */}
                                <div className="flex items-center gap-4">
                                    <div className="flex-1 border-t border-white/40"></div>
                                    <span className="text-white/70">or</span>
                                    <div className="flex-1 border-t border-white/40"></div>
                                </div>

                                {/* GOOGLE BUTTON */}
                                <button
                                    type="button"
                                    onClick={handleGoogleRegistration}
                                    className="w-full btn hover:text-black text-white/70 btn-outline border-white/30"
                                >
                                    Continue with Google <FaGoogle />
                                </button>
                            </form>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
