<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use App\Models\UserPass;
use App\Models\Business;
use App\Models\UserInfo;
use App\Models\Plan;
use App\Models\Coupon;
use App\Http\Resources\CouponResource;
use App\Http\Resources\BussinessResource;
use App\Http\Resources\UserResource;
use App\Mail\LoginDetail;
use Auth,DB;
use Carbon\Carbon;
use Laravel\Cashier\Subscription;

class BusinessController extends Controller
{
    public function register(Request $request){

        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'address' => 'required|string',
            'phone' => 'required|string',
            'business_phone' => 'required|string',
            'business_type' => 'required|string',
            'description' => 'required|string',
        ]);

        if ($validator->fails()) {
            return $this->responser([],$validator->errors());
        }

        try{
            $user = new User;
            $user->name = $request->name;
            $user->email = $request->email;
            $user->password = Hash::make($request->password);
            $user->role = 2;

            $create = $user->save();
            if($create){
                $userPass = new UserPass;
                $userPass->user_id = $user->id;
                $userPass->pass = $request->password;
                $userPass->save();

                $business = new Business;
                $business->user_id = $user->id;
                $business->business_phone = $request->business_phone;
                $business->business_type = $request->business_type;
                $business->description = $request->description;

                if ($request->has('how_long')) {
                    $business->how_long = $request->how_long;
                }

                if ($request->has('potential_customers')) {
                    $business->potential_customers_to_know = $request->potential_customers;
                }

                if ($request->has('latitude')) {
                    $business->latitude = $request->latitude;
                }
                
                if ($request->has('longitude')) {
                    $business->longitude = $request->longitude;
                }

                if ($request->has('promote_images')) {
                    $business->promote_images = (int) $request->promote_images;
                }

                $business->save();

                $userInfo = new UserInfo;
                $userInfo->phone = $request->phone;
                $userInfo->address = $request->address;
                $userInfo->user_id = $user->id;
                if($request->hasFile('profile')){
                    $avatar = $this->uploadImage($request->profile,'business');
                    $userInfo->profile = $avatar['path'];
                }
                $userInfo->save();
                $return = [
                            'id' => $user->id,
                            'name' => $user->name,
                            'email' => $user->email,
                            'email_verified' => $user->email_verified_at,
                            'roleId' => $user->role,
                            'avatar' => $user->userInfo && $user->userInfo->profile ? env('APP_URL').'/'.$user->userInfo->profile : '',
                            'phone' => $user->userInfo ? $user->userInfo->phone : '',
                            'address' => $user->userInfo ? $user->userInfo->address : '',
                            'dob' => $user->userInfo ? $user->userInfo->dob : '',

                    ];
                

                if (!$request->has('planId')) {
                    $accessToken = auth()->login($user, true);
                    
                    $return['token'] = $accessToken;
                }

                if ($request->has('plan_id') || $request->has('plan_slug')) {
                    if ($request->has('plan_id')) {
                        $plnId = (int) $request->plan_id;
                        $plan = Plan::find($plnId);
                    }
                    if ($request->has('plan_slug')) {
                        $plnSlg = $request->plan_slug;
                        $plan = Plan::where('slug',$plnSlg)->get()->first();
                    }
                    

                    $trialEndsAt = now()->addDays(729);

                    $subscription = $user->newSubscription($plan->name, $plan->stripe_plan)->trialUntil($trialEndsAt)->create(null);

                    Subscription::where('user_id',$user->id)
                            ->where('stripe_status','trialing')
                            ->update(['stripe_status'=> 'active']);

                    $user->trial_ends_at = $trialEndsAt;
                    $user->save();
                }

                $return['business_type'] = $user->businessInfo->business_type;
                $return['business_phone'] = $user->businessInfo->business_phone;
                $return['description'] = $user->businessInfo->description;
                $return['latitude'] = $user->businessInfo->latitude;
                $return['longitude'] = $user->businessInfo->longitude;
                $return['how_long_in_business'] = $user->businessInfo->how_long;
                $return['potential_customers_to_know'] = $user->businessInfo->potential_customers_to_know;
                $return['status'] = (int) $user->businessInfo->status;
                $status = 'Inactive';
                $activeplan = '';
                if ($user->subscriptions->count()) {
                    $subscription = $user->subscriptions()->latest()->first();
                    $sub_status = $subscription->stripe_status;
                    $activeplan = $subscription->stripe_price;
                    
                    switch ($sub_status) {
                        case 'active':
                            $status = 'Active';
                            break;
                        case 'canceled':
                            $status = 'Expired';
                            break;
                        case 'trialing':
                            $status = 'Free Trail';
                            break;
                        default:
                            $status = 'Inactive';
                            break;
                    }
                    
                }
                $return['active_plan'] = $activeplan;
                $return['sub_status'] = $status;

                // \Mail::to($user->email)->send(new LoginDetail($user,$request->password));

                return $this->responser($return,'Business Registered successfully.');
            }
            
        } catch (Exception $e) {
            return $this->responser([],$e->message);
        }
    }

    public function update(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'address' => 'required|string',
            'phone' => 'required|string',
            'business_phone' => 'required|string',
            'business_type' => 'required|string',
            'description' => 'required|string',
        ]);

        if ($validator->fails()) {
            return $this->responser([],$validator->errors());
        }

        try{
            $user = Auth::guard('api')->user();
            $user->name = $request->name;
            $create = $user->save();

            if($create){
                $business = $user->businessInfo;
                $business->business_phone = $request->business_phone;
                $business->business_type = $request->business_type;
                $business->description = $request->description;

                if ($request->has('how_long')) {
                    $business->how_long = $request->how_long;
                }

                if ($request->has('potential_customers')) {
                    $business->potential_customers_to_know = $request->potential_customers;
                }

                if ($request->has('latitude')) {
                    $business->latitude = $request->latitude;
                }
                
                if ($request->has('longitude')) {
                    $business->longitude = $request->longitude;
                }

                $business->save();

                $userInfo = $user->userInfo;
                $userInfo->phone = $request->phone;
                $userInfo->address = $request->address;
                if($request->hasFile('profile')){
                    $avatar = $this->uploadImage($request->profile,'business');
                    $userInfo->profile = $avatar['path'];
                }
                $userInfo->save();
               
                return $this->responser(new UserResource($user),'Business Updated successfully.');
            }
            
        } catch (Exception $e) {
            return $this->responser([],$e->message);
        }
    }

    public function getAllBusiness()
    {
        $businessesAr = Business::where('status',1)->get()->pluck('user_id')->toArray();
        

        return User::findMany($businessesAr);
    }

    public function all(){
        $businesses = $this->getAllBusiness();
        $businesses = UserResource::collection($businesses);

        $data["businesses"] = $businesses;

        $buss = Business::where('status',1);

        $buss->select('subscriptions.name', DB::raw('count(*) as total'));
        $buss->join('subscriptions','subscriptions.user_id','=','businesses.user_id');
        $buss->groupBy('subscriptions.name');


        $data["subscriptions_counts"] = $buss->get();

        return $this->responser($data,'all businesses');
    }

    public function viewBusiness($busId){
        $user = User::find($busId);

        $businesse = Business::find($user->businessInfo->id);
        if ($businesse) {
            $data = new BussinessResource($businesse);

            return $this->responser($data,'businesse data');
        } else {

            return $this->responser([],'businesse not found');
        }
        
    }

    public function updateBusiness(Request $request){
        $user = User::find($request->id);
        $business = $user->businessInfo;
        $status = $request->status;

        if ($request->has('reject_reason')) {
            $business->reject_reason = $request->reject_reason;
        }
        if ($business) {
            $business->status = (int) $status;
            $business->save();
            if (!$status) {
                $subscription = $user->subscriptions()->first();
                if ($subscription) {
                    $subscription->cancelNow();
                }
                
            }
                

            $data = new BussinessResource($business);

            return $this->responser($data,'businesse updated');
        } else {

            return $this->responser([],'business not found');
        }
        
    }

    public function topRatedBusiness(Request $request)
    {
        $business = (new Business)->newQuery(); 
        $searchQuerey = $request->query();
        $page = 0;
        if($searchQuerey['page']) { $page = (int) $searchQuerey['page'] - 1; }

        
        $business = $business
                        ->select('businesses.*')
                        ->join('users', 'users.id', '=', 'businesses.user_id')
                        ->join('subscriptions','subscriptions.user_id','=','users.id')
                        ->where('subscriptions.stripe_status','!=','canceled');
        
        
        $business = $business
                    ->where('businesses.status',1)
                    ->where('businesses.featured',1)
                    ->orderBy("businesses.created_at","DESC");
                    // ->orderByRaw("businesses.created_at DESC")
                    // ->groupBy('businesses.id');

        // echo $business->toSql();
        // die();

        $this->data['total_count'] = $business->get()->count();

        $data = $business->offset($page*$searchQuerey['limit'])
                                ->limit($searchQuerey['limit'])
                                ->get();
        
        $this->data['business'] = BussinessResource::collection($data);

        return $this->responser($this->data,'business by rating');
    }

    public function updateCouponsAndBusiness(Request $request)
    {
        $currentDate = Carbon::now();
        $subs = Subscription::where('trial_ends_at','<',$currentDate)
                ->where('stripe_status','trialing')
                ->whereNull('ends_at')
                ->update(['stripe_status'=> 'active']);
        // print_r($currentDate); die();

        $coupons = Coupon::where('status',2)->whereDate('created_at', '<' , Carbon::now()->subDay(2)->toDateTimeString())->update(['status'=>4]);

        $business = Business::where('status',2)->whereDate('created_at', '<' , Carbon::now()->subDay(2)->toDateTimeString())->update(['status'=>1]);

        return true;
        // print_r($business); die();
        // $business = Business::where('status',2)->update(['status'=>1]);
    }

    public function toogleBusinessFeatured(Request $request)
    {
        $bId = (int) $request->b_id;
        $business = Business::find($bId);
        if ($business) {
            $business->featured = $business->featured ? 0 : 1;
            $business->save();
            
            $businesses = $this->getAllBusiness();
            $data = UserResource::collection($businesses);

            return $this->responser($data,'all businesses');
        }

        return $this->responser([],'business not found');
    }
    public function getCouponsByBusinessId($id)
    {
        $bId = (int) $id; 
        $business = User::where("id",$bId)->first();
        $coupons = $business->coupons;
        $data["couponData"] = CouponResource::collection($coupons);
        $data["businessName"] = $business->name;
        /*$business = Business::find($bId);
        if ($business) {
            $business->featured = $business->featured ? 0 : 1;
            $business->save();
            
            $businesses = $this->getAllBusiness();
            $data = UserResource::collection($businesses);

            return $this->responser($data,'all businesses');
        }*/

        return $this->responser($data,'Business Coupons');
    }
}
