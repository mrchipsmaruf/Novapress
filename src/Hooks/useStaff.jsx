import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import UseAuth from "./UseAuth";

const useStaff = () => {
    const { user, loading: authLoading } = UseAuth();
    const axiosSecure = useAxiosSecure();

    const query = useQuery({
        enabled: !authLoading && !!user?.email,
        queryKey: ["isStaff", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}`);
            return res?.data?.role === "staff";
        },
        retry: false,
        staleTime: 1000 * 60 * 5,
    });

    return [query.data || false, query.isLoading];
};

export default useStaff;
