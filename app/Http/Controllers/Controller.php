<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Carbon\Carbon;
use File,DateTime,Auth;
use Illuminate\Support\Facades\Storage;
use App\Models\Order;
use App\Models\Coupon;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function responser($data,$msg)
    {

        if(!empty($data)){
            return response()->json([ 
                'status' => 200,
                'isSuccess' => true,
                'message' => $msg,
                'data' => $data
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'isSuccess' => false,
                'message' => $msg,
                // 'data' => $data
            ], 404);
        }
    }

    public function uploadImage($mediaFile,$folderPathOrName){
        // Instantiate an Amazon S3 client.
        $allowedfileExtension=['jpg','jpeg','png','gif','svg'];
        $extension = $mediaFile->getClientOriginalExtension();
 
        $check = in_array($extension,$allowedfileExtension);
        if ($check) {
            $current = Carbon::now()->format('YmdHs');

            // $imageName = time().'.'.$mediaFile->extension(); 

            $name = $mediaFile->getClientOriginalName();
            $name = pathinfo($name, PATHINFO_FILENAME);
            $name = preg_replace("/\s+/", "", $name).'-'.$current.'.'.$extension;
            $path = $mediaFile->storeAs('/Images/'.$folderPathOrName, $name, ['disk' =>   'my_files']);
            // echo "<pre>";
            // print_r($result); die();
            return ['success'=>true,'path'=>$path];
        } else {
            return ['success'=>false,'msg'=>"Allow Image with (jpg,jpeg,png,gif,svg) These extensions."];
        }
    }

    public function random_generator($alphabets,$digits){
        srand ((double) microtime() * 10000000);
        //Array of alphabets
        $input = array ("A", "B", "C", "D", "E","F","G","H","I","J","K","L","M","N","O","P","Q",
        "R","S","T","U","V","W","X","Y","Z");

        $random_generator="";// Initialize the string to store random numbers
        for($i=1;$i<$alphabets+1;$i++){ // Loop the number of times of required digits
            // print_r(rand(1,2)); 
            // echo "-----";
            // die();
            // if(rand(1,2) == 1){
            // to decide the digit should be numeric or alphabet
            // Add one random alphabet 
                $rand_index = array_rand($input);
                $random_generator .=$input[$rand_index]; // One char is added

            // }else{

            // Add one numeric digit between 1 and 10
                // $random_generator .=rand(1,9); // one number is added
            // } // end of if else

        } // end of for loop 

        for($i=1;$i<$digits+1;$i++){ 
            $random_generator .=rand(1,9);
        }

        return $random_generator;
    }

    public function getUseHideCoupons()
    {
        $user = Auth::guard('api')->user();

        $used_coupons = $user->usedOrder()
                        ->get()->pluck('coupon_id')
                        ->toArray();

        $used_coupons = array_unique($used_coupons);
        // print_r($used_coupons);
        // $unlimited = Coupon::whereIn('id',$used_coupons)
        //             ->where('unlimited',1)
        //             ->get()->pluck('id')->toArray();
        
        

        $oneTime = Coupon::whereIn('id',$used_coupons)
                    ->where('one_time',1)
                    ->get()->pluck('id')->toArray();

        // if ($unlimited) {
        //     $orders = Order::whereIn('coupon_id',$unlimited)
        //                 ->where('status',0)
        //                 ->where('user_id',$user->id)
        //                 ->whereDate('updated_at', '<' , Carbon::now()
        //                 ->subDay(1)->toDateTimeString())->get()->pluck('coupon_id')->toArray(); 
        //     if ($orders) {
        //         $oneTime = array_unique(array_merge($oneTime,$orders));
        //     }
        // }

        return $oneTime;
    }
}
