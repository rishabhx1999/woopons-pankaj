<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\User\UserController;
use App\Http\Controllers\Api\UserController as FrontUserController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\ProfileController;
use App\Http\Controllers\Api\BusinessController;
use App\Http\Controllers\Api\ForgotPasswordController;
use App\Http\Controllers\Api\PlanController;
use App\Http\Controllers\Api\CustomerController;
use App\Http\Controllers\Api\CouponController;
use App\Http\Controllers\Api\FavoriteController;
use App\Http\Controllers\Api\PromoCodeController;
use App\Http\Controllers\Api\NotificationController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });
Route::group([ 'prefix' => 'v1' ], function ($router) {

	Route::prefix('auth')->group(function () {

		Route::post('login', [UserController::class, 'login']);
		Route::post('forgotpassword', [ForgotPasswordController::class, 'sendResetLinkResponse']);
        
		Route::post('reset-password', [ForgotPasswordController::class, 'sendResetResponse']);
		// Route::post('register', [UserController::class, 'register']);
		// Route::post('forgot', [UserController::class, 'email']);
	});

    Route::get('updateBAndC', [BusinessController::class, 'updateCouponsAndBusiness']);

	Route::prefix('base')->group(function () {
		Route::get('customerplans', [PlanController::class, 'indexCustomer']);
		Route::get('businessplans', [PlanController::class, 'indexBusiness']);
		Route::post('customercreate', [CustomerController::class, 'register']);
		Route::post('verifyOtp', [UserController::class, 'verifyOtp']);
		Route::post('resendOtp', [UserController::class, 'resendOtp']);
		Route::post('register/business', [BusinessController::class, 'register']);
	});

	// users authentication routes.
    Route::group(['middleware' => 'auth:api'], function ($router) {
    	Route::get('info', [UserController::class, 'info']);

        Route::get('allcategories', [DashboardController::class, 'categories']);
        Route::get('getrecentcoupons', [DashboardController::class, 'recentCoupons']);
        Route::get('getallcoupons', [DashboardController::class, 'getAllCoupons']);

        Route::post('updatepassword', [UserController::class, 'changePassword']);

        Route::group(['middleware' => ['customer']], function () {
            Route::get('getdashboardata', [DashboardController::class, 'getdashboardata']);
            Route::post('addreview', [CouponController::class, 'addReview']);
            Route::post('toggleFavoriteCoupon', [FavoriteController::class, 'toggleFavorite']);
            Route::get('getfavoriteslist', [FavoriteController::class, 'getFavoritesList']);
            Route::get('topratedbusiness', [BusinessController::class, 'topRatedBusiness']);

            Route::post('addcouponorder', [CouponController::class, 'getCouponInOrder']);
            Route::get('getmycoupons', [CouponController::class, 'myCoupons']);
            Route::post('unlockcoupon', [CouponController::class, 'unlockCoupon']);

            Route::post('removecoupon', [CouponController::class, 'removeCoupon']);

            Route::get('getcoupons/category/{catid}', [CouponController::class, 'getCouponsFromCategory']);
            Route::get('getcoupons/business/{busid}', [CouponController::class, 'getCouponsFromBusiness']);
            Route::get('topratedcategory', [CouponController::class, 'topRatedCategory']);

            Route::post('searchanything', [DashboardController::class, 'searchAnything']);

            Route::post('getpromocode', [PromoCodeController::class, 'getOne']);
        });
        

        Route::post('updateprofile', [UserController::class, 'update']);
        Route::post('logout', [UserController::class, 'logout']);

    	Route::group(['middleware' => ['admin']], function () {
    		Route::get('businesses', [BusinessController::class, 'all']);
    		Route::get('customers', [CustomerController::class, 'all']);
            Route::get('allcodes', [PromoCodeController::class, 'getAll']);
            Route::post('create/promocode', [PromoCodeController::class, 'create']);
            Route::post('delete/promocode', [PromoCodeController::class, 'delete']);
    		Route::post('business/register', [BusinessController::class, 'register']);
            Route::post('business/featuredtoggle', [BusinessController::class, 'toogleBusinessFeatured']);
            Route::post('customer/canceltoggle', [CustomerController::class, 'toogleCustomerCancel']);
    		// Route::post('updatepassword', [UserController::class, 'changePassword']);
            Route::get('dashboarddata', [DashboardController::class, 'index']);
            Route::get('allcoupons', [DashboardController::class, 'allCoupons']);
            Route::get('couponadmin/get/{cupid}', [CouponController::class, 'getCoupon']);
            Route::post('couponadmin/update', [CouponController::class, 'update']);
            Route::get('couponadmin/viewbusiness/{busId}', [BusinessController::class, 'viewBusiness']);
            Route::post('updatebusiness', [BusinessController::class, 'updateBusiness']);
            Route::post('getallfeedbacks', [DashboardController::class, 'getAllFeedbacks']);
            Route::post('broadcastNotification', [NotificationController::class, 'broadcastNotification']);
            Route::get('getCouponsByBusinessId/{id}', [BusinessController::class, 'getCouponsByBusinessId']);
    	});

    	Route::get('plan/detail/{plan}', [PlanController::class, 'show']);
    	Route::post('plan/subscribe', [PlanController::class, 'subscription']);
    	Route::get('user/myaccount', [FrontUserController::class, 'getAccount']);
    	Route::get('user/logindetail', [CustomerController::class, 'getLoginDetail']);
    	Route::post('user/customerupdate', [CustomerController::class, 'update']);
    	Route::post('user/businessupdate', [BusinessController::class, 'update']);
    	Route::get('user/subscription/cancel/{subid}', [FrontUserController::class, 'cancelSubscription']);

        Route::post('user/feedback', [FrontUserController::class, 'addSuggestion']);
        Route::post('user/loginwithtoken', [UserController::class, 'LoginWithToken']);

    	Route::group(['middleware' => ['business']], function () {
    		Route::post('coupon/create', [CouponController::class, 'create']);
            Route::post('coupon/update', [CouponController::class, 'update']);
            Route::post('coupon/delete', [CouponController::class, 'delete']);
    		Route::get('coupon/all', [CouponController::class, 'getCustomerCoupons']);
            Route::get('coupon/get/{cupid}', [CouponController::class, 'getCoupon']);
    	});

	});
});
