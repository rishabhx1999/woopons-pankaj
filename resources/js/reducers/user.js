import {
  GET_CUSTOMER_LOG_DETAIL,
  GET_CUSTOMER_SUBSCRIPTION,
  CANCEL_CUSTOMER_SUBSCRIPTION,
  BUSSINESS_ALL_COUPONS,
  CREATE_COUPON,
  CLEAR_COUPON_MESSAGES,
  GET_COUPON,
  UPDATE_COUPON,
  CLEAR_MESSAGE_FEEDBACK,
  SEND_FEEDBACK,
  DELETE_COUPON
} from "../constants/actionTypes";

const defaultState = {
  subDetail: null
};

export default (state = defaultState, action) => {

  switch (action.type) {
    case GET_CUSTOMER_LOG_DETAIL:
      return {
        ...state,
        logDetail:
          action.payload && action.payload.data && action.payload.data
            ? action.payload.data
            : null,   
      };  
    case GET_CUSTOMER_SUBSCRIPTION:
      return {
        ...state,
        subDetail:
          action.payload && action.payload.data && action.payload.data
            ? action.payload.data
            : null, 
      }; 
    case CANCEL_CUSTOMER_SUBSCRIPTION:
      return {
        ...state,
        subDetail:
          action.payload && action.payload.data && action.payload.data
            ? action.payload.data
            : null,   
      }; 
    case BUSSINESS_ALL_COUPONS:
      return {
        ...state,
        allCoupons:
          action.payload && action.payload.data && action.payload.data
            ? action.payload.data
            : null,   
      };
    case DELETE_COUPON:
      return {
        ...state,
        allCoupons:
          action.payload && action.payload.data && action.payload.data
            ? action.payload.data
            : null,   
      };
    case CREATE_COUPON:
      return {
        ...state,
        coupondata:
          action.payload && action.payload.data && action.payload.data
            ? action.payload.data
            : null,
        couponSucc: action.payload && action.payload.isSuccess 
            ? action.payload.message
            : null,   
        couponErr: action.payload && !action.payload.isSuccess 
            ? action.payload.message
            : null,    
      }; 
    case GET_COUPON:
      return {
        ...state,
        couponViewdata:
          action.payload && action.payload.data && action.payload.data
            ? action.payload.data
            : null, 
      }; 
    case UPDATE_COUPON:
      return {
        ...state,
        couponViewdata:
          action.payload && action.payload.data && action.payload.data
            ? action.payload.data
            : null,
        couponSucc: action.payload && action.payload.isSuccess 
            ? action.payload.message
            : null,   
        couponErr: action.payload && !action.payload.isSuccess 
            ? action.payload.message
            : null,    
      }; 
    case CLEAR_COUPON_MESSAGES:
      return {
        ...state,
        coupondata: null,   
        couponSucc: null,   
        couponErr: null,   
        couponViewdata: null,   
      }; 
    case SEND_FEEDBACK:
      return {
        ...state,
        feedbackData:
          action.payload && action.payload.data && action.payload.data
            ? action.payload.data
            : null,
        feedbackSucc: action.payload && action.payload.isSuccess 
            ? action.payload.message
            : null,   
        feedbackErr: action.payload && !action.payload.isSuccess 
            ? action.payload.message
            : null,    
      }; 
    case CLEAR_MESSAGE_FEEDBACK:
      return {
        ...state,
        feedbackData: null,   
        feedbackSucc: null,   
        feedbackErr: null,    
      };     
    default:
      return state;
  }
};
