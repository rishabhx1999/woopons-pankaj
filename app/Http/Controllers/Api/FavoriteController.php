<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Coupon;
use App\Models\User;
use App\Http\Resources\UserResource;
use App\Http\Resources\CouponResource;
use Auth;
use Illuminate\Support\Facades\Validator;

class FavoriteController extends Controller
{
    public $data = [];

    public function toggleFavorite(Request $request){
        $validator = Validator::make($request->all(), [
            'coupon_id' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->responser([],$validator->errors()->first());
        }

        try{
            $user = Auth::guard('api')->user();
            $coupon = Coupon::find($request->coupon_id);
            $favorite='';
            $msg = 'Favorite';
            $user->toggleFavorite($coupon);
            if ($user->hasFavorited($coupon)) {
                $favorite = 1;
            }else{
                $favorite = 0;
                $msg = 'UnFavorite';
            }

            $return = [
                'status' => 200,
                'isSuccess' => true,
                'message' => $msg,  
                'data' => ['favorite'=> $favorite]
            ];

            return response()->json($return, 200);
        } catch (Exception $e) {
            return $this->responser([],$e->message);
        }


    }

    public function getFavoritesList(Request $request)
    {
        
        $searchQuerey = $request->query();

        $user = Auth::guard('api')->user();
        $favorites = $user->getFavoriteItems(Coupon::class);

        $this->data['total_count'] = $favorites->count();

        $data = $favorites->paginate($searchQuerey['limit']);
        
        $this->data['coupons'] = CouponResource::collection($data);

        return $this->responser($this->data,"favorites List.");

    }
}
