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
use App\Http\Resources\FeedbackResource;
use App\Models\Coupon;
use App\Models\Plan;
use App\Models\Category;
use App\Models\Suggestion;
use Auth,DB;

class DashboardController extends Controller
{

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function index() {

        $businessesAr = Business::where('status',2)->get()->pluck('user_id')->toArray();
        $businesses = User::whereIn('id',$businessesAr)->orderBy('created_at', 'DESC')->get();
        $data = UserResource::collection($businesses);

        return $this->responser($data,'latest businesses');
    }

    public function getdashboardata()
    {
        $user = Auth::guard('api')->user();
        $hideCoupons = $this->getUseHideCoupons();

        $data['categories'] = Category::all();
        $acUsersIds = DB::table('users')
                            ->select('users.*')
                            ->join('subscriptions','subscriptions.user_id','=','users.id')
                            ->where('subscriptions.stripe_status','!=','canceled')
                            ->where('users.role',2)
                            ->get()->pluck('id')->toArray();

        $couponsQuery = Coupon::whereIn('user_id', $acUsersIds)
                        ->whereNotIn('id', $hideCoupons)
                        ->where('status',1);

        $coupons = $couponsQuery->limit(5)->orderBy('created_at', 'DESC')->get();
        $data['coupons'] = CouponResource::collection($coupons);
        // join('reviews', 'reviews.business_id', '=', 'businesses.id')
                            // ->select('businesses.*',
                            //     DB::raw('AVG(reviews.rating) as rating_avg'),
                            // )
        $business = Business::select('businesses.*')
                            ->join('users', 'users.id', '=', 'businesses.user_id')
                            ->join('subscriptions','subscriptions.user_id','=','users.id')
                            ->where('subscriptions.stripe_status','!=','canceled')
                            ->where('businesses.status',1)
                            ->where('businesses.featured',1)
                            ->whereIn('businesses.user_id',$acUsersIds)
                            // ->orderByRaw("rating_avg DESC")
                            ->groupBy('businesses.id')
                            ->limit(5)
                            ->get();

        $data['business'] = BussinessResource::collection($business);

        $businessForCat = Business::join('reviews', 'reviews.business_id', '=', 'businesses.id')
                            ->select('businesses.*',
                                DB::raw('AVG(reviews.rating) as rating_avg'),
                            )
                            ->join('users', 'users.id', '=', 'businesses.user_id')
                            ->join('subscriptions','subscriptions.user_id','=','users.id')
                            ->where('subscriptions.stripe_status','!=','canceled')
                            ->where('businesses.status',1)
                            ->whereIn('businesses.user_id',$acUsersIds)
                            ->orderByRaw("rating_avg DESC")
                            ->groupBy('businesses.id')
                            ->get();
        $itemIds = $businessForCat->pluck('business_type')->toArray();
        // print_r($itemIds); die();
        $ids = implode(',', $itemIds);
        $catData = [];
        if (!empty($itemIds)) {
            $catData = Category::whereIn('id',$itemIds)
                    ->orderByRaw(DB::raw("FIELD(id, $ids)"))->get();
        }
        $data['trending_categories'] = $catData;


        return $this->responser($data,'dashboard data');
    }

    public function allCoupons() {
    	$coupons = Coupon::where('status',2)->orderBy('created_at', 'DESC')->get();
    	$data = CouponResource::collection($coupons);
    	return $this->responser($data,'Business Coupons');
    }

    public function recentCoupons() {
        $coupons = Coupon::where('status',1)->limit(10)->orderBy('created_at', 'DESC')->get();
        $data = CouponResource::collection($coupons);
        return $this->responser($data,'Recently Added Business Coupons');
    }

    public function getAllCoupons(Request $request) {
        $searchQuerey = $request->query();

        $user = Auth::guard('api')->user();
        $hideCoupons = $this->getUseHideCoupons();
         // print_r($oneT); die();
        $acUsersIds = DB::table('users')
                            ->select('users.*')
                            ->join('subscriptions','subscriptions.user_id','=','users.id')
                            ->where('subscriptions.stripe_status','!=','canceled')
                            ->where('users.role',2)
                            ->get()->pluck('id')->toArray();

        $couponsQuery = Coupon::whereIn('user_id', $acUsersIds)
                        ->whereNotIn('id', $hideCoupons)
                        ->where('status',1)
                        ->orderBy('created_at', 'DESC');

        $data['total_count'] = $couponsQuery->count();
        $coupons = $couponsQuery->paginate($searchQuerey['limit']);
        $data['coupons'] = CouponResource::collection($coupons);
        return $this->responser($data,'All Coupons');
    }

    public function categories(Request $request)
    {
        $data = Category::all();
        return $this->responser($data,'all categories');
    }

    public function searchAnything(Request $request)
    {
        $q1 = User::query()
            ->select('id', 'name')
            ->addSelect(DB::raw("'user' as 'type'"))
            ->where('name', 'LIKE', '%'.$request->search.'%')
            ->where('role', 2);

        $q2 = Category::query()
            ->select('id', 'name')
            ->addSelect(DB::raw("'category' as 'type'"))
            ->where('name', 'LIKE', '%'.$request->search.'%');

        // $result = $q2->union($q1)->first();
        $results = $q2->union($q1)->get();
        // print_r($result->type); die();
        $data = [];
        foreach ($results as $key => $result) {
            if ($result->type == 'user') {
                $business = User::find($result->id)->businessInfo;
                if ($business->status == 1) {
                    $data['business'][] = new BussinessResource($business);
                }
                
            } elseif ($result->type == 'category') {
                $data['categories'][] = Category::find($result->id);
            } 
        }
        
        if (empty($data)) {
            $data['business'] = [];
            $data['categories'] = [];
        }

        return $this->responser($data, 'search result');
    }

    public function getAllFeedbacks(Request $request)
    {
        $feedbacks = Suggestion::query();

        if(isset($request->filter) && !empty($request->filter)){
            if(in_array("recent", $request->filter)){
                $feedbacks->orderBy('id', 'desc');
            }
            $feedbacks->join('users','suggestions.user_id','=','users.id');
            $feedbacks->select('suggestions.*','users.role');
            if(in_array("business", $request->filter)){
                $feedbacks->orWhere("users.role",2);
            }
            if(in_array("customer", $request->filter)){
                $feedbacks->orWhere("users.role",3);
            }
        }
        $feedbacks = $feedbacks->get();

        if ($feedbacks) {
            return $this->responser(FeedbackResource::Collection($feedbacks), 'all feedbacks');
        }
        return $this->responser([], 'all feedbacks');

        

    }
}
