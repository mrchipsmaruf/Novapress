import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import UseAuth from "./UseAuth";

const useAdmin = () => {
    const { user, loading } = UseAuth();
    const axiosSecure = useAxiosSecure();

    const { data: admin, isPending: adminLoading } = useQuery({
        enabled: !loading && !!user?.email,
        queryKey: ["isAdmin", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}`);
            return res.data.role === "admin";
        }
    });

    return [admin, adminLoading];
};

export default useAdmin;
