<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Api\User\UserController;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\UserInfo;
use App\Models\UserPass;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Validator,JWTAuth,DB;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Hash;
use App\Mail\LoginDetail;

class CustomerController extends Controller
{
    public function register(Request $request){

        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'email' => 'required|string|email|max:255|unique:users',
            // 'password' => 'required|string|min:8',
            'phone' => 'required|max:255',
        ]);

        if ($validator->fails()) {
            return $this->responser([],$validator->errors());
        }

        try{
            $password = $this->random_generator(6,3);
            $user = new User;
            $user->name = $request->name;
            $user->email = $request->email;
            $user->password = Hash::make($password);
            $user->role = 3;

            $userphone = $request->phone;

            $create = $user->save();
            $userPass = new UserPass;
            $userPass->user_id = $user->id;
            $userPass->pass = $password;
            $userPass->save();
            $userCntrlr = new UserController();

            $otpResult = $userCntrlr->sendOtp($user->id,$userphone);
            // print_r($otpResult); die();
            if ($otpResult && $otpResult['status'] == 401) {
                $user->delete();
                return $this->responser([],$otpResult['message']);
            }

            if($create){
                $userInfo = new UserInfo;
                $userInfo->phone = $userphone;
                // $userInfo->address = $request->address;
                $userInfo->user_id = $user->id;
                if($request->hasFile('profile')){
                    $avatar = $this->uploadImage($request->profile,'business');
                    $userInfo->profile = $avatar['path'];
                }
                $userInfo->save();
            }
            \Mail::to($user->email)->send(new LoginDetail($user,$password));
            return $this->responser(new UserResource($user),'Customer Registered successfully.');
        } catch (Exception $e) {
            return $this->responser([],$e->message);
        }
    }

    public function getAllCustomers(){
        $customers_data = User::where('role',3);
        $customers = $customers_data->get();
        $customers = UserResource::collection($customers);

        $data["customers"] = $customers;


        $customers_data->select('subscriptions.name', DB::raw('count(*) as total'));
        $customers_data->join('subscriptions','subscriptions.user_id','=','users.id');
        $customers_data->groupBy('subscriptions.name');

        $data["subscriptions_counts"] = $customers_data->get();

        return $data;
    }

    public function all(){
        $data = $this->getAllCustomers();

        return $this->responser($data,'all customers');
    }

    public function update(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'phone' => 'required|string',
            'address' => 'required|string',
        ]);

        if ($validator->fails()) {
            return $this->responser([],$validator->errors());
        }

        try{
            $user = Auth::guard('api')->user();
            $user->name = $request->name;
            $create = $user->save();
            if($create){
                $userInfo = $user->userInfo;
                $userInfo->phone = $request->phone;
                $userInfo->address = $request->address;
                if($request->hasFile('profile')){
                    $avatar = $this->uploadImage($request->profile,'business');
                    $userInfo->profile = $avatar['path'];
                }
                $userInfo->save();
            }
            return $this->responser(new UserResource($user),'Customer Updated successfully.');
        } catch (Exception $e) {
            return $this->responser([],$e->message);
        }
    }

    public function getLoginDetail(Request $request)
    {
        $user = Auth::guard("api")->user();
        $data = [
            'email' => $user->email,
            'password' => $user->userPass ? $user->userPass->pass : '',
        ];

        UserPass::find($user->userPass->id)->delete();

        return $this->responser($data,'user login details');
    }

    public function toogleCustomerCancel(Request $request)
    {
        $cId = (int) $request->c_id;
        $customer = User::find($cId);
        if ($customer) {
            $subscription = $customer->subscriptions()->first();
            if ($subscription && $subscription->stripe_status != 'canceled') {
                $subscription->cancelNow();
            }
            $data = $this->getAllCustomers();

            return $this->responser($data,'all customers');
        }

        return $this->responser([],'customer not found');
    }
    
}
