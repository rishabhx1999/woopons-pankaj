import auth from "./auth";
import { combineReducers } from "redux";
import common from "./common";
import admin from "./admin";
import plan from "./plan";
import user from "./user";
import { routerReducer } from "react-router-redux";

export default combineReducers({
    auth,
    admin,
    common,
    plan,
    user,
    router: routerReducer,
});
