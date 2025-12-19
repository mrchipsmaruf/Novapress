import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../Layouts/RootLayout";
import AuthLayout from "../Layouts/AuthLayout";
import DashboardLayout from "../Layouts/DashboardLayout";

import Home from "../Pages/HomePage/Home/Home";
import AllIssues from "../Pages/AllIssuesPage/AllIssues";
import About from "../Pages/About/About";
import Contact from "../Pages/Contact/Contact";
import NotFound from "../Pages/NotFoundPage/NotFound";

import Login from "../Pages/AuthPages/Login/Login";
import Register from "../Pages/AuthPages/Register/Register";

import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import StaffRoute from "./StaffRoute";

import SubmitIssue from "../Pages/Dashboard/CitizenDashboard/SubmitIssue";
import MyIssues from "../Pages/Dashboard/CitizenDashboard/MyIssues";
import IssueDetails from "../Pages/Dashboard/IssueDetails/IssueDetails";

import StaffDashboard from "../Pages/Dashboard/StaffDashboard/StaffDashboard";
import StaffAssignedIssues from "../Pages/Dashboard/StaffDashboard/StaffAssignedIssues";

import AdminDashboard from "../Pages/Dashboard/AdminDashboard/AdminDashboard";
import ManageUsers from "../Pages/Dashboard/AdminDashboard/ManageUsers";
import ManageIssues from "../Pages/Dashboard/AdminDashboard/ManageIssues";

import RoleDashboardRedirect from "../Pages/Dashboard/RoleDashboardRedirect";
import Profile from "../Pages/Dashboard/Profile/Profile";
import StripeWrapper from "../Pages/Dashboard/Payment/StripeWrapper";
import SetPassword from "../Pages/AuthPages/SetPassword/SetPassword";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "all-issues", element: <AllIssues /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "issues/:id", element: <IssueDetails mode="public" /> },
      { path: "*", element: <NotFound /> },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/register",
        element: <Register />
      },
      {
        path: "/set-password",
        element: <SetPassword />
      }
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
      { index: true, element: <RoleDashboardRedirect /> },

      {
        path: "profile",
        element:
          <PrivateRoute>
            <Profile></Profile>
          </PrivateRoute>
      },

      {
        path: "payment",
        element: <StripeWrapper></StripeWrapper>
      },

      { path: "add-issue", element: <SubmitIssue /> },
      { path: "my-issues", element: <MyIssues /> },
      { path: "issue/:id", element: <IssueDetails mode="dashboard" /> },

      {
        path: "staff-dashboard",
        element: <StaffRoute><StaffDashboard /></StaffRoute>,
      },
      {
        path: "assigned-issues",
        element: <StaffRoute><StaffAssignedIssues /></StaffRoute>,
      },

      {
        path: "admin-dashboard",
        element: <AdminRoute><AdminDashboard /></AdminRoute>,
      },
      {
        path: "manage-users",
        element: <AdminRoute><ManageUsers /></AdminRoute>,
      },
      {
        path: "manage-issues",
        element: <AdminRoute><ManageIssues /></AdminRoute>,
      },
    ],
  },
]);
