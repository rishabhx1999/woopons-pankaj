import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
    useNavigate,
    useLocation,
} from "react-router-dom";

import { FrontendLayout, AuthLayout } from "../Layouts";
import {
    unAuthRoutes,
    authAdminRoutes,
    baseRoutes,
    authCustomerRoutes,
    authBusinessRoutes,
} from "./routes";

import Error404 from "../Error404";

import NoAccess from "../NoAccess";

import Login from "../Login";

const mapStateToProps = (state) => ({
    ...state,
    currentUser: state.common.currentUser,
    clubData: state.common.clubData,
});

const mapDispatchToProps = (dispatch) => ({});

const RouteList = (props) => {
    const { currentUser, clubData } = props;

    let navigate_to = useNavigate();

    const location = useLocation();

    const { pathname } = location;

    let login_view = false;

    if (pathname.includes("/admin") || pathname.includes("/login")) {
        login_view = true;
    }

    return (
        <Fragment>
            <Routes>
                {currentUser &&
                currentUser.roleId &&
                currentUser.roleId == 1 ? (
                    <React.Fragment>
                        {authAdminRoutes.map((route, i) => {
                            let path = route.path;

                            if (!path.includes(route.prefix)) {
                                route.path = route.prefix
                                    ? route.prefix + path
                                    : path;
                            }

                            let component = route.component;
                            return (
                                <Route
                                    basename="/admin"
                                    key={i}
                                    {...route}
                                    element={
                                        <AuthLayout>{component}</AuthLayout>
                                    }
                                />
                            );
                        })}
                    </React.Fragment>
                ) : currentUser &&
                  currentUser.roleId &&
                  currentUser.roleId == 2 ? (
                    <React.Fragment>
                        {authBusinessRoutes.map((route, i) => {
                            let path = route.path;

                            if (!path.includes(route.prefix)) {
                                route.path = route.prefix
                                    ? route.prefix + path
                                    : path;
                            }
                            let component = route.component;
                            if (
                                clubData &&
                                clubData.status &&
                                clubData.status != "1" &&
                                pathname.includes("/plans") == false &&
                                pathname.includes("/plan") == false
                            ) {
                                component = (
                                    <NoAccess club_status={clubData.status} />
                                );
                            }

                            return (
                                <Route
                                    key={i}
                                    {...route}
                                    element={
                                        <FrontendLayout>
                                            {component}
                                        </FrontendLayout>
                                    }
                                />
                            );
                        })}
                    </React.Fragment>
                ) : currentUser &&
                  currentUser.roleId &&
                  currentUser.roleId == 3 ? (
                    <React.Fragment>
                        {authCustomerRoutes.map((route, i) => {
                            let path = route.path;
                            if (!path.includes(route.prefix)) {
                                route.path = route.prefix
                                    ? route.prefix + path
                                    : path;
                            }
                            let component = route.component;
                            return (
                                <Route
                                    key={i}
                                    {...route}
                                    element={
                                        <FrontendLayout>
                                            {component}
                                        </FrontendLayout>
                                    }
                                />
                            );
                        })}
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        {unAuthRoutes.map((route, i) => {
                            let component = route.component;
                            return (
                                <Route
                                    key={i}
                                    {...route}
                                    element={<Fragment>{component}</Fragment>}
                                />
                            );
                        })}
                    </React.Fragment>
                )}

                {baseRoutes.map((route, i) => {
                    let component = route.component;
                    let mobile = false;
                    if (route && route.mobile) {
                        mobile = true;
                    }
                    let props = { mobile };
                    return (
                        <Route
                            key={i}
                            {...route}
                            element={
                                <FrontendLayout {...props}>
                                    {component}
                                </FrontendLayout>
                            }
                        />
                    );
                })}

                {login_view ? (
                    <Route path="*" element={<Login />} />
                ) : (
                    <Route path="*" element={<Error404 />} />
                )}
            </Routes>
        </Fragment>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(RouteList);
