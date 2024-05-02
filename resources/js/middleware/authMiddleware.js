import React from "react";

import agent from "../agent";
import {
    APP_LOAD,
    LOGIN,
    LOGOUT,
    LOGOUT_USER,
    FRONTEND_LOGIN,
    CUSTOMER_LOGIN_TOKEN,
} from "./../constants/actionTypes";

const emptyStoredValues = async () => {
    localStorage.setItem("isLoggedIn", "false");
    localStorage.setItem("email", "");
    if (localStorage.getItem("jwt")) {
        localStorage.setItem("jwt", "");
    }
    localStorage.setItem("LSLT", "");
    localStorage.setItem("OSTL", "");
    localStorage.setItem("customerUser", "");
    agent.setToken(null);
};

const setStoredValues = async (payload) => {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("jwt", payload.token);
    localStorage.setItem("LSLT", new Date().getTime());
    agent.setToken(payload.token);
};

const authMiddleware = (store) => (next) => (action) => {
    if (action.type === LOGIN) {
        if (action && !action.error && action.payload && action.payload.data) {
            setStoredValues(action.payload.data);
        }
    } else if (action.type === FRONTEND_LOGIN) {
        if (action && !action.error && action.payload && action.payload.data) {
            setStoredValues(action.payload.data);
        }
    } else if (action.type === CUSTOMER_LOGIN_TOKEN) {
        if (action && !action.error && action.payload && action.payload.data) {
            setStoredValues(action.payload.data);
        }
    } else if (action.type === LOGOUT) {
        emptyStoredValues();
    } else if (action.type === LOGOUT_USER) {
        emptyStoredValues();
    } else if (action.type === APP_LOAD) {
        if (action.error) {
            // debugger
            emptyStoredValues();
        }
        if (action.payload == null && action.token == "") {
            // debugger
            emptyStoredValues();
        }
    }

    next(action);
};

export default authMiddleware;
