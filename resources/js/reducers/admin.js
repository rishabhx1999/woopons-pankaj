import {
  ADMIN_DASHBOARD_DATA,
  ALL_BUSSINESS_DATA,
  ALL_CUSTOMER_DATA,
  CLEAR_BUSINESS_MESSAGES,
  CREATE_BUSINESS,
  ADMIN_PROFILE_UPDATE,
  ADMIN_CLEAR_MESSAGES,
  SAVE_PROMOTION_SETTING,
  GET_PROMOTION_SETTING,
  FETCH_ADMIN_PROMOTIONS,
  ADMIN_EARNING_DATA,
  ADMIN_CHANGE_PASSWORD,
  ADMIN_SAVE_SETTINGS,
  ADMIN_GET_NOTIFICATION_STATUS,
  PROMOTIONS_BY_CLUB,
  ADMIN_PAYMENTS_FETCH,
  ADMIN_CHANGE_PASS,
  ADMIN_CLEAR_CHANGE_PASS_MESSAGES,
  ADD_LOCATION,
  ADD_LOCATION_MSG_REMOVE,
  ALL_LOCATIONS,
  EDIT_LOCATION,
  UPDATE_LOCATION,
  UPDATE_LOCATION_MSG_REMOVE,
  ALL_USERS,
  DELETE_LOCATION,
  CLEAR_LOCATION_MSG,
  FEATCH_PAYMENT_BY_ID,
  ADMIN_COUPONS_DATA,
  GET_COUPON_ADMIN,
  UPDATE_COUPON_ADMIN,
  CLEAR_COUPON_MESSAGE,
  GET_BUSINESS_ADMIN,
  UPDATE_BUSINESS_DASH_ADMIN,
  CLEAR_ADMIN_DASH_MESSAGE,
  FETACH_ADMIN_FEEDBACKS_DATA,
  TOGGLE_BUSSINESS,
  FETACH_ALL_PROMOCODES,
  CREATE_PROMO_CODE,
  CLEAR_PROMO_CODE_MESSAGES,
  BROADCAST_NOTIFICATION,
  CLEAR_BROADCAST_NOTIFICATION,
  GET_COUPONS_BY_BUSINESS_ID,
  CANCEL_CUS_SUBSCRIPTION
} from "../constants/actionTypes";


const defaultState = {
    successMsg: null,
    errorMsg: null,
    promotionSettings: null,
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case ADMIN_DASHBOARD_DATA:
            return {
                ...state,
                dashboarddata : action.payload   && action.payload.data ? action.payload.data : null,
                errorMsg : action.payload   && !action.payload.isSuccess ? action.payload.message : null,
            };
        case UPDATE_BUSINESS_DASH_ADMIN:
            return {
                ...state,
                dashboardBusdata : action.payload   && action.payload.data ? action.payload.data : null,
                errorMsg : action.payload   && !action.payload.isSuccess ? action.payload.message : null,
            };
        case CLEAR_ADMIN_DASH_MESSAGE:
            return {
                ...state,
                dashboardBusdata : action.payload   && action.payload.data ? action.payload.data : null,
                errorMsg : action.payload   && !action.payload.isSuccess ? action.payload.message : null,
            };
        case ADMIN_COUPONS_DATA:
            return {
                ...state,
                coupondata : action.payload   && action.payload.data ? action.payload.data : null,
                errorMsg : action.payload   && !action.payload.isSuccess ? action.payload.message : null,
            };
        case ADMIN_CHANGE_PASS:
            return {
                ...state,
                changePassSuccess : action.payload   && action.payload.isSuccess ? action.payload.message : null,
                changePassError : action.payload   && !action.payload.isSuccess ? action.payload.message  : null,
            }; 
        case ADMIN_CLEAR_CHANGE_PASS_MESSAGES:
            return {
                ...state,
                changePassSuccess : null,
                changePassError : null,
            };
        case ALL_BUSSINESS_DATA:
            return {
                ...state,
                allBussinesses : action.payload   && action.payload.data && action.payload.data.businesses && !action.payload.error ? action.payload.data.businesses : null,
                subscriptionsCountsBus : action.payload   && action.payload.data && action.payload.data.subscriptions_counts && !action.payload.error ? action.payload.data.subscriptions_counts : null,
            };
        case GET_COUPONS_BY_BUSINESS_ID:
            return {
                ...state,
                couponData : action.payload   && action.payload.data && !action.payload.error && action.payload.data.couponData ? action.payload.data.couponData : null,
                businessName : action.payload   && action.payload.data && !action.payload.error && action.payload.data.businessName ? action.payload.data.businessName : null,
            };
        case TOGGLE_BUSSINESS:
            return {
                ...state,
                allBussinesses : action.payload   && action.payload.data && !action.payload.error ? action.payload.data : null
            };
        case ALL_CUSTOMER_DATA:
            return {
                ...state,
                allCustomers : action.payload   && action.payload.data && action.payload.data.customers && !action.payload.error ? action.payload.data.customers : null,
                subscriptionsCounts : action.payload   && action.payload.data && action.payload.data.subscriptions_counts && !action.payload.error ? action.payload.data.subscriptions_counts : null,
            };
        case CANCEL_CUS_SUBSCRIPTION:
            return {
                ...state,
                allCustomers : action.payload   && action.payload.data && action.payload.data.customers && !action.payload.error ? action.payload.data.customers : null,
                subscriptionsCounts : action.payload   && action.payload.data && action.payload.data.subscriptions_counts && !action.payload.error ? action.payload.data.subscriptions_counts : null,
            };
        case FETACH_ALL_PROMOCODES:
            return {
                ...state,
                allPromoCodes : action.payload   && action.payload.data && !action.payload.error ? action.payload.data : null
            };
        case CREATE_PROMO_CODE:
            return {
                ...state,
                newPromoCodes : action.payload   && action.payload.data && !action.payload.error ? action.payload.data : null,
                errorAddPromo : action.payload   && !action.payload.isSuccess && action.payload.message  ? action.payload.message  : null,
            };
        case BROADCAST_NOTIFICATION:
            return {
                ...state,
                successBroadcastNotification : action.payload  && action.payload.data && action.payload.isSuccess ? action.payload.message : null,
                errorBroadcastNotification : action.payload   && !action.payload.isSuccess && action.payload.message  ? action.payload.message  : null,
            };
        case CLEAR_BROADCAST_NOTIFICATION:
            return {
                ...state,
                successBroadcastNotification : null,
                errorBroadcastNotification: null
            };
        case CLEAR_PROMO_CODE_MESSAGES:
            return {
                ...state,
                newPromoCodes : null,
                errorAddPromo: null
            };
        case CREATE_BUSINESS:
            return {
                ...state,
                successAddBusiness : action.payload   && action.payload.data && action.payload.isSuccess ? action.payload.message : null,
                errorAddBusiness : action.payload   && !action.payload.isSuccess && action.payload.message  ? action.payload.message  : null,
            };
        case CLEAR_BUSINESS_MESSAGES:
            return {
                ...state,
                successAddBusiness : null,
                errorAddBusiness : null,
            };
        case ALL_LOCATIONS:
            return {
                ...state,
                allLocations : action.payload   && action.payload.data && !action.payload.error ? action.payload.data : null
            };
        case EDIT_LOCATION:
            return {
                ...state,
                Location : action.payload   && action.payload.data && !action.payload.error ? action.payload.data : null
            };
        case DELETE_LOCATION:
            return {
                ...state,
                Location : action.payload   && action.payload.data && !action.payload.error ? action.payload.data : null,
                isDeleted : action.payload   && action.payload.data && !action.payload.error ? true : false,
                locationMsg : action.payload   && action.payload.data && !action.payload.error ? action.payload.message : null,
            };
        case  CLEAR_LOCATION_MSG:
            return {
                ...state,
                Location : null,
                isDeleted : false,
                locationMsg : null,
            };
        case UPDATE_LOCATION:
            return {
                ...state,
                Location : action.payload   && action.payload.data && !action.payload.error ? action.payload.data : null,
                successUpdateLocation : action.payload   && action.payload.data && !action.payload.error ? action.payload.message : null,
                errorUpdateLocation : action.payload   && action.payload.error && action.payload.message  ? action.payload.message  : null,
            };
        case UPDATE_LOCATION_MSG_REMOVE:
            return {
                ...state,
                successUpdateLocation : null,
                errorUpdateLocation : null,
            };
        case ADD_LOCATION:
            return {
                ...state,
                successAddLocation : action.payload   && action.payload.data && !action.payload.error ? action.payload.message : null,
                errorAddLocation : action.payload   && action.payload.error && action.payload.message  ? action.payload.message  : null,
            };
        case ADD_LOCATION_MSG_REMOVE:
            return {
                ...state,
                successAddLocation : null,
                errorAddLocation : null,
            }; 
        case ALL_USERS:
            return {
                ...state,
                AllUsers : action.payload   && action.payload.data && !action.payload.error ? action.payload.data : null,
            }; 
        case ADMIN_EARNING_DATA:
            return {
                ...state,
                earningData : action.payload   && action.payload.data && action.payload.data.earningData ? action.payload.data.earningData : null,
                errorMsg : action.payload   && action.payload.errMessage ? action.payload.errMessage : null,
            };
        case ADMIN_PAYMENTS_FETCH:
            return {
                ...state,
                paymentsData : action.payload   && action.payload.data && action.payload.data.paymentsData ? action.payload.data.paymentsData : null,
                errorMsg : action.payload   && action.payload.errMessage ? action.payload.errMessage : null,
            };
        case FEATCH_PAYMENT_BY_ID:
            return {
                ...state,
                paymentData : action.payload   && action.payload.data && action.payload.data.paymentData ? action.payload.data.paymentData : null,
                errorMsg : action.payload   && action.payload.errMessage ? action.payload.errMessage : null,
            };
        case ADMIN_GET_NOTIFICATION_STATUS:
            return {
                ...state,
                notificationStatus : action.payload   && action.payload.data && action.payload.data.notificationStatus ? action.payload.data.notificationStatus : null,
                errorMsg : action.payload   && action.payload.errMessage ? action.payload.errMessage : null,
            }; 
        case ADMIN_CHANGE_PASSWORD:
            return {
                ...state,
                successMsg : action.payload   && action.payload.data && action.payload.data.message ? action.payload.data.message : null,
                errorMsg : action.payload   && action.payload.errMessage ? action.payload.errMessage : null,
            };
        case ADMIN_SAVE_SETTINGS:
        // console.log(action.payload)
            return {
                ...state,
                successMsg : action.payload   && action.payload.data && !action.payload.error ? action.payload.message : null,
                errorMsg : action.payload   && action.payload.error ? action.payload.message : null,
            };
        case ADMIN_PROFILE_UPDATE:
            return {
                ...state,
                currentAdminUser: action.payload   && action.payload.data && action.payload.data ? action.payload.data : null,
                successMsg : action.payload   && action.payload.data && action.payload.isSuccess ? action.payload.message : null,
                errorMsg : action.payload   && !action.payload.isSuccess && action.payload.message ? action.payload.message : null,
            };
        case SAVE_PROMOTION_SETTING:
            return {
                ...state,
                successMsg : action.payload   && action.payload.data && action.payload.data.message ? action.payload.data.message : null,
                errorMsg : action.payload   && action.payload.errMessage ? action.payload.errMessage : null,
            };
        case GET_PROMOTION_SETTING:
            return {
                ...state,
                promotionSettings : action.payload   && action.payload.data && action.payload.data.promotionSettings ? action.payload.data.promotionSettings : null,
                errorMsg : action.payload   && action.payload.errMessage ? action.payload.errMessage : null,
            }; 
        case FETCH_ADMIN_PROMOTIONS:
            return {
                ...state,
                promotionData : action.payload   && action.payload.data && action.payload.data.promotionData ? action.payload.data.promotionData : null,
                errorMsg : action.payload   && action.payload.errMessage ? action.payload.errMessage : null,
            }; 
        case PROMOTIONS_BY_CLUB:
            return {
                ...state,
                promotionDataByClub : action.payload   && action.payload.data && action.payload.data.promotionDataByClub ? action.payload.data.promotionDataByClub : null,
                errorMsg : action.payload   && action.payload.errMessage ? action.payload.errMessage : null,
            };     
        case ADMIN_CLEAR_MESSAGES:
            return {
                ...state,
                successMsg : null,
                errorMsg : null,
            };
        case GET_COUPON_ADMIN:
          return {
            ...state,
            coupondata:
              action.payload && action.payload.data && action.payload.data
                ? action.payload.data
                : null,
            // couponASucc: action.payload && action.payload.isSuccess 
            //     ? action.payload.message
            //     : null,   
            // couponAErr: action.payload && !action.payload.isSuccess 
            //     ? action.payload.message
            //     : null,    
          };
        case UPDATE_COUPON_ADMIN:
          return {
            ...state,
            coupondata:
              action.payload && action.payload.data && action.payload.data
                ? action.payload.data
                : null,
            couponASucc: action.payload && action.payload.isSuccess 
                ? action.payload.message
                : null,   
            couponAErr: action.payload && !action.payload.isSuccess 
                ? action.payload.message
                : null,    
          };
        case GET_BUSINESS_ADMIN:
          return {
            ...state,
            businessdata:
              action.payload && action.payload.data && action.payload.data
                ? action.payload.data
                : null,
            businessASucc: action.payload && action.payload.isSuccess 
                ? action.payload.message
                : null,   
            businessAErr: action.payload && !action.payload.isSuccess 
                ? action.payload.message
                : null,    
          };
        case CLEAR_COUPON_MESSAGE:
          return {
            ...state,
            couponASucc: null,   
            couponAErr: null,    
          }; 
        case FETACH_ADMIN_FEEDBACKS_DATA:
          return {
            ...state,
            feedbackData:
              action.payload && action.payload.isSuccess && action.payload.data
                ? action.payload.data
                : null,   
          };      
        default:
            return state;
    }
};