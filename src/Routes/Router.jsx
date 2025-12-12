import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/HomePage/Home/Home";
import NotFound from "../Pages/NotFoundPage/NotFound";
import AllIssues from "../Pages/AllIssuesPage/AllIssues";
import About from "../Pages/About/About";
import Contact from "../Pages/Contact/Contact";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Pages/AuthPages/Login/Login";
import Register from "../Pages/AuthPages/Register/Register";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../Layouts/DashboardLayout";
import MyIssues from "../Pages/Dashboard/MyIssues/MyIssues";
import SubmitIssue from "../Pages/Dashboard/SubmitIssue/SubmitIssue";
import IssueDetails from "../Pages/Dashboard/IssueDetails/IssueDetails";
import Statistics from "../Pages/Dashboard/Statistics/Statistics";
import StaffRoute from "./StaffRoute";
import AdminRoute from "./AdminRoute";
import AdminDashboard from "../Pages/Dashboard/AdminDashboard/AdminDashboard";
import ManageUsers from "../Pages/Dashboard/AdminDashboard/ManageUsers";
import ManageIssues from "../Pages/Dashboard/AdminDashboard/ManageIssues";
import AdminStatistics from "../Pages/Dashboard/AdminDashboard/AdminStatistics";
import AdminAssignStaff from "../Pages/Dashboard/AdminDashboard/AdminAssignStaff";
import AdminStaffList from "../Pages/Dashboard/AdminDashboard/AdminStaffList";
import AdminRevenue from "../Pages/Dashboard/AdminDashboard/AdminRevenue";
import StaffAssignedIssues from "../Pages/Dashboard/StaffDashboard/StaffAssignedIssues";
import StaffDashboard from "../Pages/Dashboard/StaffDashboard/StaffDashboard";
import CitizenDashboard from "../Pages/Dashboard/CitizenDashboard/CitizenDashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "all-issues",
        element: <AllIssues />
      },
      {
        path: "about",
        element: <About />
      },
      {
        path: "contact",
        element: <Contact />
      },

      {
        path: "issue/:id",
        element: <IssueDetails mode="public" />
      },

      {
        path: "*",
        element: <NotFound />
      },
    ],
  },

  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },

  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "add-issue",
        element: <SubmitIssue />
      },

      {
        path: "citizen-dashboard",
        element: <PrivateRoute>
          <CitizenDashboard></CitizenDashboard>
        </PrivateRoute>
      },

      {
        path: "my-issues",
        element: <MyIssues />
      },

      {
        path: "issue/:id",
        element: (
          <PrivateRoute>
            <IssueDetails mode="dashboard" />
          </PrivateRoute>
        ),
      },

      {
        path: "statistics",
        element: (
          <PrivateRoute>
            <Statistics />
          </PrivateRoute>
        ),
      },

      {
        path: "assigned-issues",
        element: (
          <StaffRoute>
            <StaffAssignedIssues></StaffAssignedIssues>
          </StaffRoute>
        ),
      },

      {
        path: "staff-dashboard",
        element: <StaffRoute>
          <StaffDashboard></StaffDashboard>
        </StaffRoute>
      },

      {
        path: "admin-dashboard",
        element: <AdminRoute>
          <AdminDashboard></AdminDashboard>
        </AdminRoute>
      },
      {
        path: "manage-users",
        element: <AdminRoute>
          <ManageUsers></ManageUsers>
        </AdminRoute>
      },
      {
        path: "manage-issues",
        element: <AdminRoute>
          <ManageIssues></ManageIssues>
        </AdminRoute>
      },
      {
        path: "admin-statistics",
        element: <AdminRoute>
          <AdminStatistics></AdminStatistics>
        </AdminRoute>
      },
      {
        path: "assign-staff",
        element: <AdminRoute>
          <AdminAssignStaff></AdminAssignStaff>
        </AdminRoute>
      },
      {
        path: "staff-list",
        element: <AdminRoute>
          <AdminStaffList></AdminStaffList>
        </AdminRoute>
      },
      {
        path: "payments-revenue",
        element: <AdminRoute>
          <AdminRevenue></AdminRevenue>
        </AdminRoute>
      }
    ],
  },

]);
