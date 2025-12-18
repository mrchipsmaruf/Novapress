import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();

    // Fetch all users
    const { data: users = [], refetch, isLoading } = useQuery({
        queryKey: ["allUsers"],
        queryFn: async () => {
            const res = await axiosSecure.get("/users");
            return res.data;
        }
    });

    // Promote to STAFF
    const makeStaff = async (email) => {
        const res = await axiosSecure.patch(`/users/role/${email}`, {
            role: "staff",
        });

        if (res.data.modifiedCount > 0) {
            Swal.fire("Success", "User promoted to staff!", "success");
            refetch();
        }
    };

    // Block/Unblock user
    const toggleBlock = async (email, isBlocked) => {
        const res = await axiosSecure.patch(`/users/block/${email}`, {
            isBlocked: !isBlocked
        });

        if (res.modifiedCount !== 0) {
            Swal.fire("Updated", "User block status changed.", "success");
            refetch();
        }
    };

    if (isLoading) return <p>Loading users...</p>;

    return (
        <div className="">
            <h1 className="inline-block px-6 py-2 border border-black/10 rounded-full text-xs uppercase tracking-[0.3em] font-semibold text-gray-700 mb-6">Manage Users</h1>

            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr className="bg-gray-100">
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Premium</th>
                            <th>Blocked</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map((u, index) => (
                            <tr key={u._id} className="hover">
                                <td>{index + 1}</td>
                                <td>{u.name}</td>
                                <td>{u.email}</td>
                                <td className="font-semibold">{u.role}</td>
                                <td>{u.premium ? "Yes" : "No"}</td>
                                <td>{u.isBlocked ? "Blocked" : "Active"}</td>

                                <td className="space-x-2">
                                    {/* Make Staff */}
                                    {u.role !== "staff" && (
                                        <button
                                            onClick={() => makeStaff(u.email)}
                                            className="btn bg-black text-white hover:text-black hover:bg-white btn-sm py-4"
                                        >
                                            Make Staff
                                        </button>
                                    )}

                                    {/* Block/Unblock */}
                                    <button
                                        onClick={() => toggleBlock(u.email, u.isBlocked)}
                                        className={`btn btn-sm ${u.isBlocked ? "bg-green-500" : "bg-red-500"
                                            } text-white`}
                                    >
                                        {u.isBlocked ? "Unblock" : "Block"}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;
