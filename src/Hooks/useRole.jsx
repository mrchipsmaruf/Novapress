import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import UseAuth from "./UseAuth";

const useRole = () => {
    const { user } = UseAuth();
    const axiosSecure = useAxiosSecure();

    const { data: role = "", isLoading } = useQuery({
        queryKey: ["role", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/role/${user.email}`);
            return res.data.role;
        },
    });

    return [role, isLoading];
};

export default useRole;
