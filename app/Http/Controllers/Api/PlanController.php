<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Plan;
use App\Models\User;
use Auth;
use App\Http\Resources\PlanResource;
use App\Models\PromoCode;

class PlanController extends Controller
{
    /**
     * Write code on Method
     *
     * @return response()
     */
    public function indexCustomer()
    {
        $plans = PlanResource::collection(Plan::where('type','customer')->get());
  		
        return $this->responser($plans,'plans');
    } 

    public function indexBusiness()
    {
        $plans = PlanResource::collection(Plan::where('type','business')->get());
  		
        return $this->responser($plans,'plans');
    }  
  
    /**
     * Write code on Method
     *
     * @return response()
     */
    public function show(Plan $plan, Request $request)
    {
        // $plan = Plan::where('slug',$slug)->first();
        $intent = Auth::guard('api')->user()->createSetupIntent();
  		$data = [
  			'plan' => new PlanResource($plan), 
  			'intent' => $intent 
  		];
  		return $this->responser($data,'plan');
        // return view("subscription", compact("plan", "intent"));
    }
    /**
     * Write code on Method
     *
     * @return response()
     */
    public function subscription(Request $request)
    {
        $plan = Plan::find($request->plan);
        $activeSub = null;
        $addDaysCus = 30;
        $pCode = false;
        if ($request->has('code_text')) {
          $promoCode = PromoCode::where('code_text',$request->code_text)->get()->first();
          if ($promoCode) {
            $addDaysCus = (int) $promoCode->code_value;
            $pCode = true;
          }
        }
        // echo "<pre>";
        // print_r($request->user()->subscribed($plan->name));
        // die();
        try{

	        if ($request->user()->role == 3) {
	            $activeSub = $request->user()->subscriptions()->where('stripe_status','!=','canceled')->get()->first();
	        } else{
	            $activeSub = $request->user()->subscriptions()->active()->first();  
	        }
	        
	        if ( $activeSub && $activeSub->name == $plan->name ) {
	            return $this->responser([],'You are already on this plan.');
	        } elseif( $activeSub && $activeSub->name != $plan->name ) {
	            if ($request->user()->role == 3) {

	                $subscription = $request->user()->subscription($activeSub->name)->noProrate()->skipTrial()->swap( $plan->stripe_plan );
	             //    print_r($activeSub);
	            	// die('dkdldks');
	                $subscription->name = $plan->name;
	                $subscription->stripe_status = $subscription->stripe_status == 'trialing' ? 'active' : $subscription->stripe_status;
	                $subscription->save();
	            }else{
	            	// die('kjkn');
	                $subscription = $request->user()->subscription($activeSub->name)->noProrate()->swap( $plan->stripe_plan );
	             //    print_r($subscription);
	            	// die();
	                $subscription->name = $plan->name;
	                $subscription->stripe_status = 'active';
	             //    print_r($subscription);
	            	// die();
	                $subscription->save();
	            }

	            return $this->responser($subscription,'Subscription Updated Successfully');
	        } else {

	            if ($request->user()->role == 2) {
	                $trialEndsAt = now()->addDays(729);
	                $subscription = $request->user()
                                        ->newSubscription($plan->name, $plan->stripe_plan)
                                        ->trialUntil($trialEndsAt)
                                        ->create($request->stripe_token);
                                        // trialUntil
	            }else{
                  $cancelSub = $request->user()->subscriptions()->get()->first();
                  if ($cancelSub) {
                    $subscription = $request->user()
                                        ->newSubscription($plan->name, $plan->stripe_plan)
                                        ->create($request->stripe_token);
                  } else {
                    $subscription = $request->user()
                                        ->newSubscription($plan->name, $plan->stripe_plan)
                                        ->trialDays($addDaysCus)
                                        ->create($request->stripe_token);
                    if ($subscription && $pCode) {
                      $user = $request->user();
                      $userInfo = $user->userInfo;
                      $userInfo->promo_code = $request->code_text;
                      $userInfo->save();
                    }
                  }
	                

	                // $subscription->extendTrial(
	                //   now()->addDays($addDaysCus)
	                // );
	            }

	            return $this->responser($subscription,'subscription success');
	        }
        } catch(\Exception $e) {
        	return $this->responser([],$e->getMessage());;
        }

    }
}

// public function upgradeBusinessplan(Request $request)
// {
//   # code...
// }
