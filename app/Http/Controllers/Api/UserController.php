<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request; 
use Auth,Validator;
use App\Models\User;
use App\Models\Suggestion;
use Carbon\Carbon;
use App\Http\Resources\UserResource;

class UserController extends Controller
{

    public function info() {
    	$data['user'] = null;
    	if(Auth::check()) {
    		$data['user'] = Auth::user();
    	}

    	return response()->json($data);
    }

    private function getSubscriptionRenewDate($plan)
	{
	    $sub = Auth::user()->subscription($plan)->asStripeSubscription();
        // echo "<pre>"; current_period_end
        // print_r(Auth::user()->upcomingInvoice()); die();
	    return Carbon::createFromTimeStamp($sub->current_period_end)->format('m/d/Y');
	}

    public function getAccount(Request $request)
    {
    	$user = Auth::user();
    	// echo "<pre>";
    	// $user->subscription(1)->noProrate()->swap( 'price_1M4zcfLqeRJ82vvRieJLIPDn' );
    	// print_r($user->subscriptions()->first()); 
    	// $subscriptionItem = $user->subscriptions()->active()->first();
    	$subscriptionItem = $user->subscriptions()->latest()->first();
    	if ($subscriptionItem) {
            if ($subscriptionItem->stripe_status == 'trialing' && ($subscriptionItem->name == 'Bronze' || $subscriptionItem->name == 'Platinum')) {
                $subscriptionItem->stripe_status = 'active';
                $subscriptionItem->save();
            }
            

    		$nextBiling = $this->getSubscriptionRenewDate($subscriptionItem->name);

    		// if ($subscriptionItem->trial_ends_at && !$subscriptionItem->trial_ends_at->isPast()) {
    		// 	$diff = now()->diffInDays(Carbon::parse($subscriptionItem->trial_ends_at));
    		// 	$nextBiling = $subscriptionItem->trial_ends_at->addDays(30)->format('m/d/Y');
    		// 	// print_r($nextBiling); die();
    		// }

    		$data = [
    			'id' => $subscriptionItem->id,
    			'plan_name' => $subscriptionItem->name,
    			'stripe_plan' => $subscriptionItem->stripe_price,
    			'status' => $subscriptionItem->stripe_status,
    			'next_billing' => $nextBiling,
    			'canceled_at' => $subscriptionItem->ends_at ? $subscriptionItem->ends_at->format('m/d/Y') : '',
                'user' => new UserResource($user)

    		];
    		return $this->responser($data,'subscription plan');
    	} else {
    		return $this->responser([],'No subscription yet.');
    	}
    	// print_r($this->getSubscriptionRenewDate('Silver plan')); 
    	// print_r($subscriptionItem); 
    	// die();

    }

    public function cancelSubscription(Request $request,$subid)
    {
    	// $subscription = Auth::user()->subscriptions()->first();
    	$subscription = Auth::user()->subscriptions()->where('id', $subid)->first();
    	
    	if ($subscription) {
    		$subscription->cancelNow();
    		$data = [
    			'id' => $subscription->id,
    			'plan_name' => $subscription->name,
    			'stripe_plan' => $subscription->stripe_price,
    			'status' => $subscription->stripe_status,
    			'canceled_at' => $subscription->ends_at->format('m/d/Y'),
    			'next_billing' => '',

    		];

    		return $this->responser($data,'subscription plan');
    	} else {
    		return $this->responser([],'Not found subscription');
    	}

    }

    public function updateSubscription( Request $request ){
	    $user = $request->user();
	    $planID = $request->get('plan');
	    $paymentID = $request->get('payment');

	    if( $user->subscribed('Super Notes') ){
	        $user->newSubscription( 'Super Notes', $planID )
	                ->create( $paymentID );
	    }else{
	        $user->subscription('Super Notes')->swap( $planID );
	    }
	    
	    return response()->json([
	        'subscription_updated' => true
	    ]);
	}

    public function addSuggestion(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'feedback' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->responser([],$validator->errors());
        }

        try {
            $suggestion = new Suggestion;
            $suggestion->user_id = $request->user()->id;
            $suggestion->feedback = $request->feedback;

            $suggestion->save();

            return $this->responser($suggestion,'Suggestion added successfully');

        } catch (Exception $e) {
            return $this->responser([], $e->message);
        }



    }
}
