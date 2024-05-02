import {
    APP_LOAD,
    REDIRECT,
    LOGOUT,
    LOGOUT_USER,
    RESETLINK,
    REGISTER,
    RESETPASSWORD,
    LOGIN,
    LOGIN_PAGE_UNLOADED,
    REGISTER_PAGE_UNLOADED,
    CURRENT_VIEW,
    CLEAR_LOGOUT,
    PAGE_ATTR,
    SAVE_SETTINGS,
    CLEAR_MESSAGES,
    GET_SETTINGS,
    ASYNC_START,
    ASYNC_END,
    EMPTY_CHANGE_PASS_VALUE,
    EMPTY_RESET_VALUE,
    FEATCH_CUSTOMER_PLANS,
    CREATE_CUSTOMER,
    CREATE_CUSTOMER_CLEAR_MESSAGES,
    CUSTOMER_OTP_VERIFY,
    CUSTOMER_OTP_RESEND,
    CUSTOMER_PROFILE_UPDATE,
    FEATCH_BUSINESS_PLANS,
    CLEAR_BUSINESS_FRONT_MESSAGES,
    CREATE_BUSINESS_FRONT,
    CUSTOMER_LOGIN_TOKEN,
    CUSTOMER_LOGIN_TOKEN_RESET,
    FRONTEND_LOGIN,
    GET_CUSTOMER_SUBSCRIPTION,
    SUBSCRIBE_PLAN,
} from "../constants/actionTypes";

const defaultState = {
    pageheading: "Dashboard",
    appName: "vcalc",
    token: null,
    viewChangeCounter: 0,
    dashboardData: [],
    loginSuccess: false,
    redirectTo: false,
    loginError: null,
    appLoaded: false,
    logoutRedirectTo: false,
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case APP_LOAD:
            return {
                ...state,
                appLoaded: true,
                currentUser:
                    action.payload && action.payload.data && action.payload.data
                        ? action.payload.data
                        : null,
                spStatus:
                    action.payload && action.payload.data
                        ? action.payload.data.sub_status
                        : null,
            };
        case REDIRECT:
            return { ...state, redirectTo: "/" };
        case LOGIN:
        case REGISTER:
            // debugger
            return {
                ...state,
                redirectTo:
                    action.payload &&
                    action.payload.data &&
                    action.payload.data.token
                        ? true
                        : false,
                loginSuccess:
                    action.error || (action.payload && action.payload.isSuccess)
                        ? true
                        : false,
                loginError:
                    action.payload && !action.payload.isSuccess
                        ? action.payload.message
                        : null,
                token:
                    action.payload &&
                    action.payload.data &&
                    action.payload.data.token
                        ? action.payload.data.token
                        : null,
                currentUser:
                    action.payload && action.payload.data && action.payload.data
                        ? action.payload.data
                        : null,
                notFirstlogin:
                    action.payload && action.payload.data && action.payload.data
                        ? true
                        : false,
                spStatus:
                    action.payload && action.payload.data
                        ? action.payload.data.sub_status
                        : null,
            };
        case CUSTOMER_LOGIN_TOKEN_RESET:
            return {
                ...state,
                redirectToAccount: false,
            };
        case CUSTOMER_LOGIN_TOKEN:
            return {
                ...state,
                redirectToAccount:
                    action.payload &&
                    action.payload.data &&
                    action.payload.data.token
                        ? true
                        : false,
                loginSuccess:
                    action.error || (action.payload && action.payload.isSuccess)
                        ? true
                        : false,
                loginError:
                    action.payload && !action.payload.isSuccess
                        ? action.payload.message
                        : null,
                token:
                    action.payload &&
                    action.payload.data &&
                    action.payload.data.token
                        ? action.payload.data.token
                        : null,
                currentUser:
                    action.payload && action.payload.data && action.payload.data
                        ? action.payload.data
                        : null,
                notFirstlogin:
                    action.payload && action.payload.data && action.payload.data
                        ? true
                        : false,
            };
        case RESETLINK:
            return {
                ...state,
                ResetLinkError:
                    action.payload && action.payload.error
                        ? action.payload.message
                        : null,
                ResetLinkSuccess:
                    action.payload && !action.payload.error
                        ? action.payload.message
                        : null,
            };
        case RESETPASSWORD:
            return {
                ...state,
                ResetError:
                    action.payload && action.payload.error
                        ? action.payload.message
                        : null,
                ResetSuccess:
                    action.payload && !action.payload.error
                        ? action.payload.message
                        : null,
                notFirstlogin:
                    action.payload && !action.payload.error ? true : false,
            };
        case EMPTY_RESET_VALUE:
            return {
                ...state,
                ResetLinkError: null,
                ResetLinkSuccess: null,
            };
        case EMPTY_CHANGE_PASS_VALUE:
            return {
                ...state,
                ResetSuccess: null,
                ResetError: null,
            };
        case LOGOUT:
            return {
                ...state,
                logoutRedirectTo: true,
                token: null,
                currentUser: null,
                loginSuccess: false,
            };
        case LOGOUT_USER:
            return {
                ...state,
                logoutUserRedirectTo: true,
                token: null,
                loginSuccess: false,
                // businessPlans: null,
                // customerPlans: null,
            };
        case CLEAR_LOGOUT:
            return {
                ...state,
                logoutRedirectTo: false,
                redirectTo: false,
                logoutUserRedirectTo: false,
                currentUser: null,
            };
        case CURRENT_VIEW:
            return {
                ...state,
                viewName: action.payload.name,
                viewId: action.payload.id,
            };
        case PAGE_ATTR:
            return {
                ...state,
                pageheading: action.pageheading
                    ? action.pageheading
                    : state.pageheading,
            };
        case ASYNC_START:
            return {
                ...state,
                showLoader: true,
            };
        case ASYNC_END:
            return {
                ...state,
                showLoader: false,
                authError:
                    action.promise &&
                    action.promise.error &&
                    action.promise.message &&
                    action.promise.message == "Auth failed"
                        ? true
                        : false,
            };
        case SAVE_SETTINGS:
            return {
                ...state,
                successSettingMsg:
                    action.payload &&
                    action.payload.data &&
                    action.payload.data.message
                        ? action.payload.data.message
                        : null,
                errorSettingMsg:
                    action.payload && action.payload.message
                        ? action.payload.message
                        : null,
            };
        case GET_SETTINGS:
            return {
                ...state,
                settingsData:
                    action.payload &&
                    action.payload.data &&
                    action.payload.data.settingsData
                        ? action.payload.data.settingsData
                        : null,
                errorSettingMsg:
                    action.payload && action.payload.errMessage
                        ? action.payload.errMessage
                        : null,
            };
        case CLEAR_MESSAGES:
            return {
                ...state,
                successSettingMsg: null,
                errorSettingMsg: null,
            };
        case FEATCH_CUSTOMER_PLANS:
            return {
                ...state,
                customerPlans:
                    action.payload && action.payload.data
                        ? action.payload.data
                        : null,
            };
        case FEATCH_BUSINESS_PLANS:
            return {
                ...state,
                businessPlans:
                    action.payload && action.payload.data
                        ? action.payload.data
                        : null,
            };
        case CREATE_CUSTOMER:
            return {
                ...state,
                customerUser:
                    action.payload && action.payload.data
                        ? action.payload.data
                        : null,
                successMsg:
                    action.payload && action.payload.isSuccess
                        ? action.payload.message
                        : null,
                errorMsg:
                    action.payload && !action.payload.isSuccess
                        ? action.payload.message
                        : null,
                spStatus:
                    action.payload && action.payload.data
                        ? action.payload.data.sub_status
                        : null,
            };
        case SUBSCRIBE_PLAN:
            return {
                ...state,
                spStatus:
                    action.payload &&
                    action.payload.isSuccess &&
                    action.payload.data
                        ? action.payload.data.stripe_status
                        : null,
            };
        case CREATE_CUSTOMER_CLEAR_MESSAGES:
            return {
                ...state,
                successMsg: null,
                errorMsg: null,
            };
        case CUSTOMER_OTP_VERIFY:
            return {
                ...state,
                currentUser:
                    action.payload && action.payload.data
                        ? action.payload.data
                        : null,
                successMsg:
                    action.payload && action.payload.isSuccess
                        ? action.payload.message
                        : null,
                errorMsg:
                    action.payload && !action.payload.isSuccess
                        ? action.payload.message
                        : null,
            };
        case CUSTOMER_OTP_RESEND:
            return {
                ...state,
                successMsg:
                    action.payload && action.payload.isSuccess
                        ? action.payload.message
                        : null,
                errorMsg:
                    action.payload && !action.payload.isSuccess
                        ? action.payload.message
                        : null,
            };
        case CUSTOMER_PROFILE_UPDATE:
            return {
                ...state,
                currentUser:
                    action.payload && action.payload.data
                        ? action.payload.data
                        : null,
                successMsg:
                    action.payload && action.payload.isSuccess
                        ? action.payload.message
                        : null,
                errorMsg:
                    action.payload && !action.payload.isSuccess
                        ? action.payload.message
                        : null,
            };
        case CREATE_BUSINESS_FRONT:
            return {
                ...state,
                businessUser:
                    action.payload &&
                    action.payload.isSuccess &&
                    action.payload.data
                        ? action.payload.data
                        : null,
                successAddBusiness:
                    action.payload && action.payload.isSuccess
                        ? action.payload.message
                        : null,
                errorAddBusiness:
                    action.payload &&
                    !action.payload.isSuccess &&
                    action.payload.message
                        ? action.payload.message
                        : null,
            };
        case CLEAR_BUSINESS_FRONT_MESSAGES:
            return {
                ...state,
                businessUser: null,
                successAddBusiness: null,
                errorAddBusiness: null,
            };
        case FRONTEND_LOGIN:
            return {
                ...state,
                token:
                    action.payload &&
                    action.payload.data &&
                    action.payload.data.token
                        ? action.payload.data.token
                        : null,
                currentUser:
                    action.payload && action.payload.data && action.payload.data
                        ? action.payload.data
                        : null,
            };
        default:
            return state;
    }
};
