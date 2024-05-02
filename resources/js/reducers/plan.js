import {
  PLAN_FETCH,
  PLAN_DETAIL,
  SUBSCRIBE_PLAN,
  CLEAR_PLAN_MESSAGE,
  CLEAR_PLAN_DATA,
  CLEAR_MESSAGES,
  GET_CODE_PROMO,
  CLEAR_CODE_PROMO
} from "../constants/actionTypes";



const defaultState = {
    plans: null,
    detail: null,
    data: false,
    successMessagePlan: null,
    errorMessagePlan: null,
    planSuccess: null,
    planError: null,
    spSuccess: null,
    spError: null,
    errorMessageFeature: null,
    successMessageFeature: null,
    successMessagePlanFeature:null,
    errorMessagePlanFeature:null,
    plan_feature:null,
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case PLAN_FETCH:
            return {
                ...state,
                data: action.payload && action.payload.data ? true : false,
                plans : action.payload && action.payload.data  && action.payload.data ? action.payload.data : null,                
            };
        case PLAN_DETAIL:
            return {
                ...state,
                detail : action.payload && action.payload.data && action.payload.data ? action.payload.data : null
            };
        case CLEAR_PLAN_MESSAGE:
            return {
                ...state,
                successMessagePlan : null,
                errorMessagePlan : null,
                successMessageFeature : null,
                errorMessageFeature : null,
                successMessagePlanFeature : null,
                errorMessagePlanFeature : null,
            };
        case CLEAR_PLAN_DATA:
            return {
                ...state,
                plan_feature : null,
            };
        case SUBSCRIBE_PLAN:
            return {
                ...state,
                spSuccess : action.payload  && action.payload.isSuccess && action.payload.data ? action.payload.message : null,
                spError : action.payload  && !action.payload.isSuccess ? action.payload.message : null
            };
        case CLEAR_MESSAGES:
            return {
                ...state,
                spSuccess : null,
                spError : null
            };
        case GET_CODE_PROMO:
            return {
                ...state,
                codeSuccess : action.payload  && action.payload.isSuccess && action.payload.data ? action.payload.message : null,
                codeError : action.payload  && !action.payload.isSuccess ? action.payload.message : null
            };
        case CLEAR_CODE_PROMO:
            return {
                ...state,
                codeSuccess : null,
                codeError : null
            };
        default:
            return state;
    }
};