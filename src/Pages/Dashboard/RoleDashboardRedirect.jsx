import useRole from "../../Hooks/useRole";
import Loading from "../../Components/Loading/Loading";
import CitizenDashboard from "./CitizenDashboard/CitizenDashboard";
import StaffDashboard from "./StaffDashboard/StaffDashboard";
import AdminDashboard from "./AdminDashboard/AdminDashboard";

const RoleDashboardRedirect = () => {
    const { role, roleLoading } = useRole();

    if (roleLoading) return <Loading />;

    if (role === "admin") return <AdminDashboard />;
    if (role === "staff") return <StaffDashboard />;

    return <CitizenDashboard />;
};

export default RoleDashboardRedirect;
