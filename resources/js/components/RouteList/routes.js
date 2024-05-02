import React from "react";
// Unauthenticated Routes Components.
import Login from "../Login";
import ChangePassword from "../ChangePassword";

// Authenticated Routes Components.
import Dashboard from "../Dashboard";
import AdminDashboard from "../Admin/Dashboard";
import Profile from "../Admin/Profile";
//import OwnerProfile from "../Profile";
import Bussiness from "../Admin/Bussiness";
import ViewCoupons from "../Admin/Bussiness/ViewCoupons";
import ViewBusiness from "../Admin/Bussiness/ViewBusiness";
import CustomerAdmin from "../Admin/Customer";
import CreateBusiness from "../Admin/Bussiness/CreateBusiness";
import ViewLocation from "../Admin/Bussiness/ViewLocation";
import EditLocation from "../Admin/Bussiness/EditLocation";
import CouponView from "../Admin/Coupon/CouponView";
import Coupon from "../Admin/Coupon";
import Feedback from "../Admin/Feedback";
import PromoCode from "../Admin/PromoCode";
import CreatePromoCode from "../Admin/PromoCode/CreatePromoCode";

import Users from "../Admin/User";
// import Chat from "../Admin/Chat"
// import Express from "../Admin/Express"

import Setting from "../Admin/Setting";

import BroadcastNotification from "../Admin/BroadcastNotification";

// Public Routes
import Home from "../Home";
import Customer from "../views/Customer";
import EnterOtp from "../views/Customer/EnterOtp";
import LoginDetail from "../views/Customer/LoginDetail";
import Ambassador from "../views/Customer/Ambassador";
import CustomerContactUs from "../views/Customer/ContactUs";
import BusinessContactUs from "../views/Business/ContactUs";
import Payment from "../views/Payment";
import ForgotPassword from "../views/ForgotPassword";
import MyAccount from "../views/MyAccount";
import UpgradePlan from "../views/UpgradePlan";
import Business from "../views/Business";
import Faq from "../views/Faq";
import FaqBusiness from "../views/FaqBusiness";
import BecomeMember from "../views/BecomeMember";
import CreateFrontBusiness from "../views/Business/CreateBusiness";
import ListCoupons from "../views/Business/ListCoupons";
import CreateCoupon from "../views/Business/CreateCoupon";
import ViewCoupon from "../views/Business/ViewCoupon";
// import AboutUs from "../views/AboutUs";
import CookiePolicy from "../views/CookiePolicy";

// mobile
import MobileContactUs from "../views/ContactUs";
import MobileTerms from "../views/Terms";
import MobilePrivacy from "../views/Privacy";

export const baseRoutes = [
    {
        name: "Home",
        path: "/",
        component: <Home />,
    },
    {
        name: "Home",
        path: "/home",
        component: <Home />,
    },
    {
        name: "Customer Create",
        path: "/customer/create/:plan",
        component: <Customer pageheading="Customer" />,
    },
    {
        name: "Customer Enter Otp",
        path: "/customer/enterotp/:plan",
        component: <EnterOtp pageheading="Enter Otp" />,
    },
    {
        name: "Plan Payment",
        path: "/payment/:plan",
        component: <Payment pageheading="plan payment" />,
    },
    {
        name: "Users",
        prefix: "/customer",
        path: "/customer/detail",
        component: <LoginDetail pageheading="LoginDetail" />,
    },
    {
        name: "Users",
        path: "/customer/contactus",
        component: <CustomerContactUs pageheading="Contact Us" />,
    },
    {
        name: "Ambassador",
        path: "/ambassador",
        component: <Ambassador pageheading="Ambassador" />,
    },
    {
        name: "Users",
        prefix: "/user",
        path: "/user/forgotpassword",
        component: <ForgotPassword pageheading="ForgotPassword" />,
    },
    {
        name: "ChangePassword",
        path: "/changepassword/:token",
        component: <ChangePassword pageheading="ChangePassword" />,
    },
    {
        name: "MyAccount",
        path: "/user/myaccount",
        component: <MyAccount pageheading="MyAccount" />,
    },
    {
        name: "MyAccount",
        path: "/user/upgrade-plan",
        component: <UpgradePlan pageheading="UpgradePlan" />,
    },
    {
        name: "Business Plans",
        path: "/business",
        component: <Business pageheading="Business Plans" />,
    },
    {
        name: "Business Contact Us",
        path: "/contactus/business",
        component: <BusinessContactUs pageheading="Business Contact Us" />,
    },
    {
        name: "Business Create",
        path: "/business/create/:plan",
        component: <CreateFrontBusiness pageheading="Business Plans" />,
    },
    {
        name: "Business WOO-PONS",
        path: "/business/coupons",
        component: <ListCoupons pageheading="List WOO-PONS" />,
    },
    {
        name: "Business Coupon Create",
        path: "/business/coupon/create",
        component: <CreateCoupon pageheading="Create WOO-PONS" />,
    },
    {
        name: "Business Coupon view",
        path: "/business/coupon/view/:id",
        component: <ViewCoupon pageheading="View Coupon" />,
    },
    {
        name: "Become Member",
        path: "/becomemember",
        component: <BecomeMember pageheading="Become Member" />,
    },
    {
        name: "Faq",
        path: "/faqs",
        component: <Faq pageheading="Faq" />,
    },
    // {
    // 	name: 'About',
    // 	path: '/about',
    // 	component: <AboutUs pageheading="AboutUs"/>
    // },
    {
        name: "FaqBusiness",
        path: "/faqs-business",
        component: <FaqBusiness pageheading="Faq-business" />,
    },
    {
        name: "MobileContactUs",
        path: "/contact",
        mobile: true,
        component: <MobileContactUs pageheading="Mobile Contact Us" />,
    },
    {
        name: "privacy policy",
        path: "/privacy-policy",
        mobile: true,
        component: <MobilePrivacy pageheading="Mobile Privacy" />,
    },
    {
        name: "terms and conditions",
        path: "/terms-and-conditions",
        mobile: true,
        component: <MobileTerms pageheading="Mobile Terms" />,
    },
    {
        name: "privacy policy",
        path: "/customer/privacy-policy",
        mobile: false,
        component: <MobilePrivacy pageheading="Mobile Privacy" />,
    },
    {
        name: "terms and conditions",
        path: "/customer/terms-and-conditions",
        mobile: false,
        component: <MobileTerms pageheading="Mobile Terms" />,
    },
    {
        name: "cookie policy",
        path: "/cookie-policy",
        mobile: false,
        component: <CookiePolicy pageheading="cookie policy" />,
    },
];

export const unAuthRoutes = [
    {
        name: "Login",
        path: "/admin/login",
        component: <Login pageheading="Login" />,
    },
];

export const authRoutes = [
    {
        name: "Dashboard",
        path: "/dashboard",
        component: <Dashboard pageheading="Dashboard" />,
    },
];

export const authAdminRoutes = [
    {
        name: "Dashboard",
        prefix: "/admin",
        path: "/dashboard",
        component: <AdminDashboard pageheading="Dashboard" />,
    },
    {
        name: "Setting",
        prefix: "/admin",
        path: "/setting",
        component: <Setting pageheading="Settings" />,
    },
    {
        name: "Profile",
        prefix: "/admin",
        path: "/profile",
        component: <Profile pageheading="Profile" />,
    },
    {
        name: "Business",
        prefix: "/admin",
        path: "/bussinesses",
        component: <Bussiness pageheading="Bussinesses" />,
    },
    {
        name: "Coupons",
        prefix: "/admin",
        path: "/business/:id",
        component: <ViewCoupons pageheading="Bussinesses" />,
    },
    {
        name: "Customer",
        prefix: "/admin",
        path: "/customers",
        component: <CustomerAdmin pageheading="Customers" />,
    },
    {
        name: "Bussiness Create",
        prefix: "/admin",
        path: "/business/create",
        component: <CreateBusiness pageheading="Create Business" />,
    },
    {
        name: "Filialen",
        prefix: "/admin",
        path: "/location/view/:id",
        component: <ViewLocation pageheading="View Location" />,
    },
    {
        name: "Edit Location",
        prefix: "/admin",
        path: "/location/:id",
        component: <EditLocation pageheading="Location Edit" />,
    },
    {
        name: "Users",
        prefix: "/admin",
        path: "/users",
        component: <Users pageheading="Users" />,
    },
    {
        name: "Users",
        prefix: "/admin",
        path: "/view/coupon/:id",
        component: <CouponView pageheading="View WOO-PON" />,
    },
    {
        name: "Users",
        prefix: "/admin",
        path: "/coupons",
        component: <Coupon pageheading="WOO-PONS" />,
    },
    {
        name: "Users",
        prefix: "/admin",
        path: "/business/view/:id",
        component: <ViewBusiness pageheading="Business" />,
    },
    {
        name: "Feedback",
        prefix: "/admin",
        path: "/feedbacks",
        component: <Feedback pageheading="Feedback" />,
    },
    {
        name: "PromoCode",
        prefix: "/admin",
        path: "/promocodes",
        component: <PromoCode pageheading="Promo Code" />,
    },
    {
        name: "CreatePromoCode",
        prefix: "/admin",
        path: "/promocode/create",
        component: <CreatePromoCode pageheading="Create Promo Code" />,
    },
    {
        name: "BroadcastNotification",
        prefix: "/admin",
        path: "/broadcast-notification",
        component: (
            <BroadcastNotification pageheading="Broadcast Notification" />
        ),
    },
];

export const authCustomerRoutes = [];

export const authBusinessRoutes = [];
