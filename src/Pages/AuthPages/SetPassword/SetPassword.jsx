import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import UseAuth from "../../../Hooks/UseAuth";
import axiosSecure from "../../../Services/axiosSecure";

const SetPassword = () => {
    const { register, handleSubmit } = useForm();
    const { setPasswordForGoogleUser } = UseAuth();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            await setPasswordForGoogleUser(data.password);

            await axiosSecure.patch(
                `https://novapress-server.vercel.app/users/password-set`,
                {},
                {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem("access-token")}`
                    }
                }
            );

            Swal.fire({
                icon: "success",
                title: "Password Set Successfully",
                text: "You can now log in using email & password."
            });

            navigate("/");

        } catch (error) {
            if (error.code === "auth/requires-recent-login") {
                Swal.fire(
                    "Session Expired",
                    "Please login again with Google",
                    "warning"
                );
                navigate("/login");
                return;
            }

            Swal.fire("Error", error.message, "error");
        }
    };


    return (
        <div className="min-h-screen flex items-center justify-center">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white p-8 rounded shadow-md w-[400px]"
            >
                <h2 className="text-2xl font-bold mb-4">Set Your Password</h2>

                <input
                    type="password"
                    {...register("password", { required: true, minLength: 8 })}
                    placeholder="Enter new password"
                    className="input input-bordered w-full mb-4"
                />

                <button className="btn btn-primary w-full">
                    Set Password
                </button>
            </form>
        </div>
    );
};

export default SetPassword;
