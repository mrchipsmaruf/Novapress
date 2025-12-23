import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import UseAuth from "./UseAuth";

const useRole = () => {
    const { user, loading } = UseAuth();
    const axiosSecure = useAxiosSecure();

    const { data, isLoading } = useQuery({
        queryKey: ["role", user?.email],
        enabled: !loading && !!user?.email,
        retry: false,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/role/${user.email}`);
            return res.data.role;
        },
    });

    return {
        role: data || null,
        roleLoading: isLoading,
    };
};

export default useRole;
