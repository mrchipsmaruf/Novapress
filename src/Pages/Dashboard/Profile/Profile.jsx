import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import UseAuth from "../../../Hooks/UseAuth";
import Loading from "../../../Components/Loading/Loading";

const Profile = () => {
    const axiosSecure = useAxiosSecure();
    const { user: authUser, loading: authLoading } = UseAuth();
    const navigate = useNavigate();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["profile", authUser?.email],
        enabled: !authLoading && !!authUser,
        queryFn: async () => {
            const res = await axiosSecure.get("/users/profile");
            return res.data;
        }
    });

if (authLoading || isLoading) return <Loading />;

if (isError) {
    return <p className="text-center text-red-500">Failed to load profile</p>;
}

const {
    name,
    email,
    image,
    role,
    isBlocked,
    isPremium
} = data || {};

return (
    <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow p-6 space-y-6">

            <div className="flex gap-5 items-center">
                <img
                    src={image || authUser?.photoURL}
                    className="w-24 h-24 rounded-full object-cover"
                    alt="profile"
                />

                <div>
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        {name || authUser?.displayName}
                        {isPremium && (
                            <span className="badge badge-warning">Premium</span>
                        )}
                    </h2>
                    <p className="text-gray-600">{email}</p>
                    <p className="capitalize text-sm text-gray-500">{role}</p>
                </div>
            </div>

            {isBlocked && (
                <div className="alert alert-error">
                    Your account has been blocked. Please contact authorities.
                </div>
            )}

            {role === "citizen" && !isPremium && !isBlocked && (
                <button
                    onClick={() => navigate("/dashboard/payment")}
                    className="btn btn-primary"
                >
                    Subscribe Premium (৳1000)
                </button>
            )}

        </div>
    </div>
);
};

export default Profile;
