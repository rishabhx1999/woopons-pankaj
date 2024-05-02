<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use App\Models\Business;
use App\Models\UserInfo;
use App\Http\Resources\BussinessResource;
use App\Http\Resources\UserResource;
use App\Http\Resources\CouponResource;
use App\Http\Resources\OrderResource;
use App\Http\Resources\PlanResource;
use App\Models\Coupon;
use App\Models\Plan;
use App\Models\Review;
use App\Models\Order;
use App\Models\Category;
use Auth,DB;
use Carbon\Carbon;
use Laravel\Cashier\Subscription;

class CouponController extends Controller
{
    public function create(Request $request){
        // $user = Auth::guard('api')->user();
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|unique:coupons,name',
            'offer' => 'required|string',
            'one_time' => 'required|integer',
            'unlimited' => 'required|integer',
            'coupon_code' => 'required|string',
        ]);

        if ($validator->fails()) {
            return $this->responser([],$validator->errors());
        }

        try{
        	$user = Auth::guard('api')->user();
        	$user_sub = $user->subscriptions()->latest()->first();
            // print_r($user_sub); die();
        	if ($user_sub && $user_sub->stripe_status != 'canceled') {
        		$plan = Plan::where('stripe_plan',$user_sub->stripe_price)->first();

        		$active_coupon = $user->activeCoupon ? $user->activeCoupon->count() : 0;
        		$valid_coupon = $plan->feature->coupon;

        		if ($active_coupon != $valid_coupon) {
        			
	            	$coupon = new Coupon;
		            $coupon->name = $request->name;
		            $coupon->offer = $request->offer;
		            if ($request->has('about')) {
		            	$coupon->about = $request->about;
		            }
		            $coupon->one_time = $request->one_time;
		            $coupon->unlimited = $request->unlimited;
                    if(isset($request->max_limit) && $request->max_limit != ""){
                         $coupon->max_limit = $request->max_limit;
                    }
                   
		            $coupon->coupon_code = $request->coupon_code;

		            $coupon->user_id = $user->id;
		            $coupon->subscription_id = $user_sub->id;

		            $coupon->save();
		            
		            return $this->responser($coupon,'Coupon Created successfully.');
		               
        		} else {
        			return $this->responser([],'You Reached Active Coupons from Subscription');
        		}

        	}else{
        		return $this->responser([],'Please Buy Plan For This');
        	}

            
        } catch (Exception $e) {
            return $this->responser([],$e->message);
        }
    }

    public function update(Request $request){

        $validator = Validator::make($request->all(), [
            'id' => 'required',
            'status' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->responser([],$validator->errors());
        }

        try{
            
            if ($request->status == 1) {
                $user = Auth::guard('api')->user();
                $rechedMsg = 'You Reached Active Coupons from Subscription';
                if ($user->role == 1) {
                    $coupon = Coupon::find($request->id);
                    $user = $coupon->user;
                    $rechedMsg = 'This User Reached Active Coupons from Subscription';
                    // print_r($user); die();
                }
                $user_sub = $user->subscriptions()->latest()->first();
                if ($user_sub && $user_sub->stripe_status != 'canceled') {
                    $plan = Plan::where('stripe_plan',$user_sub->stripe_price)->first();

                    $active_coupon = $user->activeCoupon ? $user->activeCoupon->count() : 0;
                    $valid_coupon = $plan->feature->coupon;

                    if ($active_coupon != $valid_coupon) {
                        $coupon = Coupon::find($request->id);
                        $coupon->status = (int) $request->status;

                        $coupon->save();
                        
                        return $this->responser($coupon,'Coupon Updated successfully.');
                    }else{
                        return $this->responser([],$rechedMsg);
                    }
                }else{
                    return $this->responser([],'Please Buy Plan For This');
                }

            } else {
                $coupon = Coupon::find($request->id);
                $coupon->status = (int) $request->status;

                $coupon->save();
                
                return $this->responser($coupon,'Coupon Updated successfully.');
            }
            
        } catch (Exception $e) {
            return $this->responser([],$e->message);
        }
    }

    public function getCustomerCoupons(Request $request)
    {
    	$coupons = Auth::guard('api')->user()->coupons;
    	$data = CouponResource::collection($coupons);
    	return $this->responser($data,'Business Coupons');

    }

    public function getCoupon(Request $request,$cupid)
    {
        $coupon = Coupon::find($cupid);
        if ($coupon) {
            $data = new CouponResource($coupon);
            return $this->responser($data,'Coupon data');
        } else {
           return $this->responser([],'Coupon not found'); 
        }
        

    }

    public function addReview(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'coupon_id' => 'required',
            'order_id' => 'required',
            'rating' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->responser([],$validator->errors());
        }

        try{

            $user = Auth::guard('api')->user();
            $review = new Review;

            $business = Coupon::find($request->coupon_id)->user->businessInfo;

            $review->business_id = $business->id;
            $review->coupon_id = $request->coupon_id;
            $review->order_id = $request->order_id;
            $review->user_id = $user->id;
            $review->rating = $request->rating;

            $review->save();

            return $this->responser($review,'review data');
        } catch (Exception $e) {
            return $this->responser([],$e->message);
        }

    }

    public function getCouponInOrder(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'coupon_id' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->responser([],$validator->errors());
        }

        try{
            $user = Auth::guard('api')->user();
            $user_sub = $user->subscriptions()->latest()->first();
            if ($user_sub && $user_sub->stripe_status != 'canceled') {

                $plan = Plan::where('stripe_plan',$user_sub->stripe_price)->first();

                $active_orders = $user->activeOrder;
                $active_order_count = $user->activeCoupon ? $user->activeCoupon->count() : 0;
                $valid_order = $plan->feature->coupon;
                $valid_time = $plan->feature->valid_time;
                // print_r($plan->feature); die();
                $currentDate = Carbon::now();
                $prevorder = $user->orders()->latest()->first();

                $coupon = Coupon::where("id",$request->coupon_id)->first();

               /* $coupon_limit_exceed = false;

                if(isset($coupon->max_limit) && $coupon->max_limit != "" && $coupon->max_limit != null && $coupon->max_limit > 0){
                    $max_limit = $coupon->max_limit;

                    $orders_coupon_count = Order::where("coupon_id",$request->coupon_id)->count();

                    if($orders_coupon_count >= $max_limit){
                       $coupon_limit_exceed = true;
                    }

                }*/

                if(isset($coupon->status) && $coupon->status == "5"){

                    $message = 'Coupon limit exceeded!';

                    return $this->responser(new PlanResource($plan),$message);

                }else{

                    if ($prevorder && $prevorder->count()) {

                        if ($valid_time == 'weekly') {
                            $adddays = 7;
                        }
                        if ($valid_time == 'daily') {
                            $adddays = -1;
                            // $adddays = 0;
                        } 

                        $nextDate = $prevorder->created_at->addDays($adddays);

                        // print_r($nextDate); die();

                        if ($currentDate->greaterThan($nextDate)) {
                             
                            $order = new Order;

                            $order->user_id = $user->id;
                            $order->coupon_id = (int) $request->coupon_id;

                            $order->save();

                            $this->updateCouponStatus($coupon);

                            return $this->responser($order,'Order Created successfully.');

                        } else {
                            // $message = 'You Reached Get Coupons from Subscription.You can get coupon after this date ' . $nextDate;
                            $message = 'You have reached your WOO-PON limit. Your next WOO-PON will be available on '. $nextDate->format('m/d/Y');
                            return $this->responser(new PlanResource($plan),$message);
                        }

                    } else {
                        $order = new Order;

                        $order->user_id = $user->id;
                        $order->coupon_id = (int) $request->coupon_id;

                        $order->save();

                        $this->updateCouponStatus($coupon);
                        
                        return $this->responser($order,'Order Created successfully.');
                    }
                }    

            } else{
                return $this->responser([],'Please Buy Plan For This');
            }

        } catch(Exception $e) {
            return $this->responser([],$e->message);
        }
    }

    public function updateCouponStatus($coupon)
    {
        if(isset($coupon->max_limit) && $coupon->max_limit != "" && $coupon->max_limit != null && $coupon->max_limit > 0){
            $max_limit = $coupon->max_limit;

            $orders_coupon_count = Order::where("coupon_id",$coupon->id)->count();

            if($orders_coupon_count >= $max_limit){

               Coupon::where("id",$coupon->id)->update(["status"=>5]);
            }

        }
        return true;
    }

    public function myCoupons(Request $request)
    {
        $user = Auth::guard('api')->user();
        $active_coupons = $user->activeOrder()->latest()->get();
        $used_coupons = $user->usedOrder()->latest()->get();
        // print_r($active_coupons);
        // die();
        $datafavorite = $user->getFavoriteItems(Coupon::class);
        $hideCoupons = $this->getUseHideCoupons();
        $datafavorite->whereNotIn('id', $hideCoupons);
            
        // print_r($datafavorite->toSql()); die();
        // print_r($hideCoupons); die();

        

        $data['favorite'] = $datafavorite->count() ? CouponResource::collection($datafavorite->latest()->get()) : [];
        // $data['newly_added'] = $active_coupons->count() ? OrderResource::collection($active_coupons) : [];
        $data['history'] = $used_coupons->count() ? OrderResource::collection($used_coupons) : [];
        // print_r($data);
        // die();

        return $this->responser($data,'Coupons Cart');
    }

    public function unlockCoupon(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'order_id' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->responser([],$validator->errors());
        }

        try{
            $order = Order::find($request->order_id);

            if ($order) {
                $order->status = 0;
                $order->updated_at = Carbon::now();
                $order->save();

                return $this->responser(new OrderResource($order),'unlocked coupon');
            }else{
                return $this->responser([],'order not found');
            }

        } catch(Exception $e) {
            return $this->responser([],$e->message);
        }
        
    }

    public function removeCoupon(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'order_id' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->responser([],$validator->errors());
        }

        try{
            $order = Order::find($request->order_id);

            if ($order) {
                $order->delete();
                return $this->responser(['removed' => true],'removed coupon');
            }else{
                return $this->responser([],'order not found');
            }

        } catch(Exception $e) {
            return $this->responser([],$e->message);
        }
        
    }

    public function getCouponsFromCategory(Request $request,$catid)
    {
        $category = Category::find($catid);
        if ($category) {
            $searchQuerey = $request->query();
            $user = Auth::guard('api')->user();
            $hideCoupons = $this->getUseHideCoupons();

            $userQuery = DB::table('users')
                            ->select('users.*')
                            ->join('subscriptions','subscriptions.user_id','=','users.id')
                            ->where('subscriptions.stripe_status','!=','canceled')
                            ->where('users.role',2);

            $msg = 'Recently Added coupons';
            if ($catid != 7) {
            	$users = $category->activebusinesses()->with('user')->get()->pluck('user')->flatten();
            	$usersId = $users->pluck('id');	
            	$userQuery->whereIn('users.id',$usersId);
                $msg = 'Category coupons';
            }
            
            $acUsersIds = $userQuery->get()->pluck('id')->toArray();

            $couponsQuery = Coupon::whereIn('user_id', $acUsersIds)
            				->where('status',1)
            				->whereNotIn('id', $hideCoupons)
            				->orderBy('created_at', 'DESC');

            $data['total_count'] = $couponsQuery->count();
            $coupons = $couponsQuery->paginate($searchQuerey['limit']);
            $data['coupons'] = CouponResource::collection($coupons);

            return $this->responser($data,$msg);

        } else {
            return $this->responser([],'Category not found');
        }
        
    }

    public function getCouponsFromBusiness(Request $request,$busid)
    {
        $business = Business::find($busid);
        if ($business) {
            $searchQuerey = $request->query();
            $user = Auth::guard('api')->user();
            $hideCoupons = $this->getUseHideCoupons();

        	// print_r($hideCoupons); die();


            $couponsQuery = $business->user
            				->activeCoupon()
            				->whereNotIn('id', $hideCoupons)
            				->orderBy('created_at', 'DESC');
            $msg = 'Business Coupons';

            $data['total_count'] = $couponsQuery->count();
            $coupons = $couponsQuery->paginate($searchQuerey['limit']);
            $data['coupons'] = CouponResource::collection($coupons);

            return $this->responser($data,$msg);

        } else {
            return $this->responser([],'business not found');
        }
        
    }

    public function topRatedCategory(Request $request)
    {
        $business = (new Business)->newQuery(); 
        $searchQuerey = $request->query();
        $page = 0;
        if($searchQuerey['page']) { $page = (int) $searchQuerey['page'] - 1; }

        $business = $business->join('reviews', 'reviews.business_id', '=', 'businesses.id')
                            ->select('businesses.*',
                            DB::raw('AVG(reviews.rating) as rating_avg'),
                            );
        
        
        $business = $business->where('businesses.status',1)
                                ->orderByRaw("rating_avg DESC")
                                ->groupBy('businesses.id')
                                ->with('category');


        $business = $business->get();
        if ($business) {
            $categories = $business->pluck('category');
            $colCategories = collect($categories);
            // print_r(collect($colCategories)->pluck('id')); die();
            // ->paginate($searchQuerey['limit'])
            $itemIds = collect($colCategories)->pluck('id');
            // print_r($itemIds->toArray()); die();
            $ids = implode(',', $itemIds->toArray());
            $topCat = Category::whereIn('id',$itemIds)
                                ->orderByRaw(DB::raw("FIELD(id, $ids)"));

            $data['total_count'] = $topCat->get()->count();

            $data['categories'] = $topCat->offset($page*$searchQuerey['limit'])
                                    ->limit($searchQuerey['limit'])
                                    ->get();

            return $this->responser($data,'categories by rating');
        }else {
            return $this->responser([],'categories by rating not found');
        }
        
    }

    public function delete(Request $request)
    {
        $coupon = Coupon::find($request->id);
        if ($coupon->reviews->count()) {
            $coupon->reviews->each->delete();
        }
        if ($coupon->orders->count()) {
            $coupon->orders->each->delete();
        }
        if ($coupon) {
            $coupon->delete();
        }
        

        $coupons = Auth::guard('api')->user()->coupons;
        $data = CouponResource::collection($coupons);

        return $this->responser($data,'WOO-PON Deleted Successfully.');
    }
}
