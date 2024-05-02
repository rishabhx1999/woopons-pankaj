<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\PromoCode;
use Auth,DB;
use Carbon\Carbon;
use Illuminate\Support\Facades\Validator;

class PromoCodeController extends Controller
{
    public function getAll(Request $request)
    {
    	$promoCodes = PromoCode::all();

    	return $this->responser($promoCodes,'All promoCodes');
    }

    public function getOne(Request $request)
    {
    	if ($request->has('code_text')) {
    		$promoCode = PromoCode::where('code_text',$request->code_text)->get()->first();
	    	if ($promoCode) {
	    		// print_r($promoCode); die();
	    		return $this->responser($promoCode,'This code is valid for '.$promoCode->code_value.' day free.');
	    	}
    	}

    	return $this->responser([],'This Promo Code Is Not Valid');
    }

    public function create(Request $request)
    {
    	$validator = Validator::make($request->all(), [
            'code_text' => 'required|string',
            'code_value' => 'required|integer',
        ]);

        if ($validator->fails()) {
            return $this->responser([],$validator->errors()->first());
        }

        try {
        	$promoCode = new PromoCode;
	        $promoCode->code_text = $request->code_text;
	        $promoCode->code_value = $request->code_value;
	        $promoCode->save();

	        return $this->responser($promoCode,'New Promo Code Added');
        } catch (Exception $e) {
        	return $this->responser([],$e->message);
        }
	        

    }

    public function delete(Request $request)
    {
        $promoCode = PromoCode::find($request->id);
        $promoCode->delete();
        

        $promoCodes = PromoCode::all();

        return $this->responser($promoCodes,'All promoCodes');
    }
}
