import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import Loading from "../../../Components/Loading/Loading";

const AdminStaffList = () => {
    const axiosSecure = useAxiosSecure();
    const qc = useQueryClient();

    // GET ALL STAFF
    const { data: staff = [], isLoading } = useQuery({
        queryKey: ["adminStaffList"],
        queryFn: async () => {
            const res = await axiosSecure.get("/staff");
            return res.data || [];
        }
    });

    // MUTATIONS --------------------------

    // Promote / Demote
    const roleMutation = useMutation({
        mutationFn: async ({ email, newRole }) => {
            return axiosSecure.patch(`/staff/role/${email}`, { role: newRole });
        },
        onSuccess: () => {
            qc.invalidateQueries(["adminStaffList"]);
            Swal.fire("Updated!", "Staff role successfully changed.", "success");
        },
        onError: () => {
            Swal.fire("Error", "Could not update role", "error");
        }
    });

    // Delete staff
    const deleteMutation = useMutation({
        mutationFn: async (email) => {
            return axiosSecure.delete(`/staff/${email}`);
        },
        onSuccess: () => {
            qc.invalidateQueries(["adminStaffList"]);
            Swal.fire("Deleted!", "Staff removed from system.", "success");
        },
        onError: () => {
            Swal.fire("Error", "Could not delete staff", "error");
        }
    });

    // ACTION HANDLERS --------------------------

    const handleRoleChange = async (staffUser) => {
        const { email, name, role } = staffUser;

        const { value: selectedRole } = await Swal.fire({
            title: `Change role for ${name || email}`,
            input: "select",
            inputOptions: {
                staff: "Staff",
                admin: "Admin"
            },
            inputValue: role,
            showCancelButton: true
        });

        if (!selectedRole || selectedRole === role) return;

        roleMutation.mutate({ email, newRole: selectedRole });
    };

    const handleDelete = async (email) => {
        const confirm = await Swal.fire({
            title: "Are you sure?",
            html: `Delete <b>${email}</b>? This cannot be undone.`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33"
        });
        if (!confirm.isConfirmed) return;

        deleteMutation.mutate(email);
    };

    if (isLoading) return <Loading />;

    return (
        <div className="p-6">
            <h1 className="text-3xl font-semibold mb-5">Staff List</h1>

            <div className="overflow-x-auto bg-white p-4 rounded-lg shadow">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Resolved Issues</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {staff.length === 0 && (
                            <tr>
                                <td colSpan={5} className="text-center py-6 text-gray-500">
                                    No staff found.
                                </td>
                            </tr>
                        )}

                        {staff.map((s) => (
                            <tr key={s.email}>
                                <td>{s.name || "N/A"}</td>
                                <td>{s.email}</td>
                                <td>
                                    <span
                                        className={`px-2 py-1 rounded text-white text-xs 
                    ${s.role === "admin" ? "bg-purple-600" : "bg-blue-600"}`}
                                    >
                                        {s.role}
                                    </span>
                                </td>

                                <td className="font-semibold">{s.resolvedCount || 0}</td>

                                <td className="flex gap-2">
                                    <button
                                        className="btn btn-sm btn-warning"
                                        onClick={() => handleRoleChange(s)}
                                    >
                                        Change Role
                                    </button>

                                    <button
                                        className="btn btn-sm btn-error"
                                        onClick={() => handleDelete(s.email)}
                                    >
                                        Remove
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

export default AdminStaffList;
