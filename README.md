NovaPress – Public Infrastructure Issue Reporting System

🔗 Live Website: https://novapress-infra.vercel.app/

NovaPress is a full-stack web application that allows citizens to report public infrastructure issues (such as potholes, broken streetlights, garbage overflow, water leakage, etc.) and enables authorities to manage, verify, and resolve those issues efficiently.

This project is built as part of B12-A11_category-06 and follows modern best practices for authentication, role-based access control, and responsive UI design.

📌 Features
👤 Authentication & Authorization

Email & Password authentication

Google OAuth login

Existing Google users can set password later

JWT-based secure authentication

Logged-in users cannot access login/register pages again

Blocked users are prevented from accessing the system

🧑‍🤝‍🧑 User Roles

Citizen

Submit infrastructure issues

View and manage own issues

Make payments (Stripe)

Manage profile

Staff

View assigned issues

Update issue status

Admin

Manage users

Manage all issues

Full dashboard access

🛠️ Issue Management

Create, view, update, and track issues

Issue status lifecycle

Role-based dashboard routing

Secure issue details (public & dashboard views)

📊 Dashboard System

Dynamic dashboard based on user role

Protected routes (PrivateRoute, AdminRoute, StaffRoute)

Smooth loading state handling

Role-based redirection

💳 Payment Integration

Stripe payment gateway

Secure payment handling

Premium feature support

🎨 UI / UX

Fully responsive design (mobile, tablet, desktop)

Modern UI with Tailwind CSS & DaisyUI

Animated banners and video backgrounds

Clean and user-friendly layout

🧪 Tech Stack
Frontend

React

React Router DOM

Tailwind CSS

DaisyUI

React Hook Form

TanStack React Query

Axios

Swiper.js

Firebase Authentication

Backend

Node.js

Express.js

MongoDB

Firebase Admin SDK

JWT Authentication

Payment

Stripe

🔐 Security Features

JWT token validation

Role-based route protection

Secure API endpoints

Environment variable protection

Firebase Admin token verification


✅ Key Highlights

Google users can later log in with email/password

Public & private route separation

Clean role-based dashboard system

Production-ready authentication flow

Fully responsive & modern UI

Real-world use case focused


👨‍💻 Developer

Name: Al Maruf
Project: NovaPress
