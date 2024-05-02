import agent from "../agent";
import React, { Suspense, useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { APP_LOAD, CLEAR_LOGOUT } from "../constants/actionTypes";
import "./styles/style.scss";
import "./styles/responsive.scss";
import RouteList from "./RouteList";
import Loader from "./Loader";

const mapStateToProps = (state) => {
    return {
        ...state,
        appLoaded: state.common.appLoaded,
        appName: state.common.appName,
        redirectTo: state.common.redirectTo,
        currentUser: state.common.currentUser,
        logoutRedirectTo: state.common.logoutRedirectTo,
        logoutUserRedirectTo: state.common.logoutUserRedirectTo,
        showLoader: state.common.showLoader,
    };
};

const mapDispatchToProps = (dispatch) => ({
    onAppLoad: (payload, token) =>
        dispatch({ type: APP_LOAD, payload, token, skipTracking: true }),
    onLogoutClear: () => {
        dispatch({ type: CLEAR_LOGOUT });
    },
});

const AppComponent = () => {
    const {
        appLoaded,
        redirectTo,
        appName,
        currentUser,
        onAppLoad,
        logoutUserRedirectTo,
        logoutRedirectTo,
        onLogoutClear,
        showLoader,
    } = props;

    const routerProps = {
        currentUser,
        appName,
    };

    let navigate = useNavigate();

    useEffect(() => {
        if (currentUser && currentUser.roleId && redirectTo) {
            if (currentUser.roleId == "1") {
                navigate("/admin/dashboard");
            } else if (currentUser.roleId == 2) {
                navigate("/business");
            } else {
                navigate("/");
            }
        }
    }, [redirectTo]);

    useEffect(() => {
        if (logoutRedirectTo) {
            onLogoutClear();
            navigate("/login");
        }
    }, [logoutRedirectTo]);

    useEffect(() => {
        if (logoutUserRedirectTo) {
            if (currentUser && currentUser.roleId == "2") {
                // debugger
                onLogoutClear();
                navigate("/business");
                setTimeout(function () {
                    navigate("/business");
                }, 2000);
            } else {
                // debugger
                onLogoutClear();
                navigate("/");
            }
        }
    }, [logoutUserRedirectTo]);

    useEffect(() => {
        let token = null,
            _payload = null;

        if (localStorage.getItem("jwt")) {
            token = localStorage.getItem("jwt");
            agent.setToken(token);
            _payload = agent.Auth.current();
        }

        onAppLoad(_payload, token);
    }, []);

    return (
        <div className="main-body">
            {appLoaded ? (
                <Suspense fallback={null}>
                    {showLoader ? <Loader /> : ""}
                    <RouteList {...routerProps} />
                </Suspense>
            ) : (
                <Loader />
            )}
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(AppComponent);
