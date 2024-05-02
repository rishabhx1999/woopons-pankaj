<?php
namespace App\Http\Controllers\Api\User;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\verifyOtp;
use Illuminate\Support\Facades\Auth;
use Validator;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Exceptions\JWTException;
use Illuminate\Support\Facades\Mail;
use Carbon\Carbon;
use JWTAuth,DB;
use App\Http\Resources\UserResource;
use App\Mail\ResetPassword;
use Illuminate\Support\Str;
use App\Mail\SendOtp as sendOTP;
use Twilio\Rest\Client;

class UserController extends Controller
{

    public function login(Request $request){

        $credentials = $request->only('email', 'password');

        //Request is validated
        //Crean token
        try {
            if (!$token = auth()->attempt($credentials)) {
                return $this->responser([], 'Login credentials are invalid.');
            }
        } catch (JWTException $e) {
            // return $credentials;
            return $this->responser([],'Could not create token.');
            
        }
        $user = Auth::guard("api")->user(); 

        if ($request->has('mobile') && $request->mobile && $user->role != 3) {
            Auth::guard('api')->logout();
            return $this->responser([],'unauthenticated.');
        }

        if ($request->has('mobile') && $request->mobile && $request->device_id && $user->role == 3) {
            $user_deviceId = $user->userInfo->device_id;
            if (!$user_deviceId) {
                    $user->userInfo->device_id = $request->device_id;
                    $user->userInfo->save();
            } elseif ($request->device_id != $user_deviceId) {
                Auth::guard('api')->logout();
                return $this->responser([],'unauthenticated.');
            }
        }

        if ($request->has('device_token') && $request->device_token != "") {
            $user->device_token = $request->device_token;
            $user->save();
        }
        // $return = [];

        // Get the user data.
        
        
        // if ($request->has('device_token')) {
        //     $user->device_token = $request->device_token;
        // }

        // $user->save();

        $data = array(
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'email_verified' => $user->email_verified_at,
                    'roleId' => $user->role,
                    'token' => $token,
                    'avatar' => $user->userInfo && $user->userInfo->profile ? '/'.$user->userInfo->profile : null,
                    'phone' => $user->userInfo ? $user->userInfo->phone : '',
                    'address' => $user->userInfo ? $user->userInfo->address : '',
                    'dob' => $user->userInfo ? $user->userInfo->dob : '',
                );
        if ($user->role == 2) {
            $data['business_type'] = $user->businessInfo->business_type;
            $data['business_phone'] = $user->businessInfo->business_phone;
            $data['description'] = $user->businessInfo->description;
            $data['latitude'] = $user->businessInfo->latitude;
            $data['longitude'] = $user->businessInfo->longitude;
            $data['how_long_in_business'] = $user->businessInfo->how_long;
            $data['potential_customers_to_know'] = $user->businessInfo->potential_customers_to_know;
            $data['status'] = (int) $user->businessInfo->status;
        }
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
        $data['active_plan'] = $activeplan;
        $data['sub_status'] = $status;
   //      if ($user->role_id == 2) {
   //      	$existKitchen = Mikitchn::where('user_id',$user->id)->first();
   //      	$is_kitchen = 0;
			// if ($existKitchen) {
			// 	$is_kitchen = 1;
			// }

			// $uData['is_kitchen_added'] = $is_kitchen;
   //      }


        // $data = [
        //         'token' => $token,
        //         'token_type' => 'bearer',
        //         // 'expires_in' => auth()->factory()->getTTL() * 60,
        //         'user' => $uData
        // ];
        $msg = "Login Successfully.";
    
        return $this->responser($data,$msg);

        

    }

    public function LoginWithToken(Request $request)
    {
        // print_r($request->access_token); die();
        // $user = \JWTAuth::toUser($request->access_token);
        $user = Auth::guard('api')->user();
        $msg = "User Not found";
        $data = [];
        if ($user) {

            $data = array(
                        'id' => $user->id,
                        'name' => $user->name,
                        'email' => $user->email,
                        'email_verified' => $user->email_verified_at,
                        'roleId' => $user->role,
                        'token' => $request->bearerToken(),
                        'avatar' => $user->userInfo && $user->userInfo->profile ? '/'.$user->userInfo->profile : null,
                        'phone' => $user->userInfo ? $user->userInfo->phone : '',
                        'address' => $user->userInfo ? $user->userInfo->address : '',
                        'dob' => $user->userInfo ? $user->userInfo->dob : '',
                    );
            $msg = "Login Successfully.";
        }
    
        return $this->responser($data,$msg);
    }

    public function info(Request $request) {
        $data = [];
        // echo $request->bearerToken(); die();
        if(Auth::check()) {
            $user = Auth::guard('api')->user();
            $data = new UserResource($user);
        }

        return $this->responser($data,'info user');
    }

    public function register(Request $request){
        // die('test');
        $validator = Validator::make($request->all(), [
            'first_name' => 'required',
            'last_name' => 'required',
            'email' => 'required|email|unique:users,email',
            'password' => 'required',
            // 'c_password' => 'required|same:password',
            'phone' => 'required|numeric',
        ]);

        if($validator->fails()){
            return $this->responser([],$validator->errors());
        }

        // $device_token = '';

        $input = $request->all();

        $input['password'] = bcrypt($input['password']);
        // echo "<pre>"; 
        $user = User::create($input);

        if ($request->has('device_token')) {
            $user->device_token = $request->device_token;
        }
        // print_r($user); die();
        $user->save();
        $userData['id'] = $user->id;
        
        $userData['name'] = $user->first_name.' '.$user->last_name;
        $userData['email'] = $user->email;
        $userData['role_id'] = $user->role_id;
        $userData['role'] = $user->role->role;
        $this->sendOtp($user->id,$request->phone);
        $return = [
            'status' => 200,
            'isSuccess'=>true,
            'message' => 'Registered Successfully.',
            'data'=>$userData,
        ];
        return response()->json($return, 200);
    }

    public function update(Request $request){

        $user = Auth::guard('api')->user();

        // $validator = Validator::make($request->all(), [
            // 'name' => 'required',
            // 'phone' => 'required',
            // 'email' => 'required|email|unique:users,email,'.$user->id
        // ]);

        // if($validator->fails()){
        //     return $this->responser([],$validator->errors());
        // }
        if ($request->has('name')) {
            $user->name = $request->name;
        }
        if ($request->has('phone')) {
            $user->userInfo->phone = $request->phone;
        }
        
        if ($request->hasFile('avatar')) {
            $avatar = $this->uploadImage($request->avatar,'user');
            if ($avatar['success']) {
                $user->userInfo->profile = $avatar['path'];
            } else {
                return $this->responser($data, $avatar['msg']);
            }
        }

        $user->save();
        $user->userInfo->save();

        $data = new UserResource($user);
        return $this->responser($data, 'Profile Updated Successfully');
    }

    public function resendOtp(Request $request)
    {
    	$user = User::find($request->user_id);

    	if ($user) {
    		$otpres = $this->sendOtp($user->id,$user->userInfo->phone);
    		if ($otpres['status'] == 200) {
    			$rsend = 1;
                $msg = 'Send Otp Successfully';
            } else {
                $msg = 'UnAuthorized.';
                $rsend = 0;
            }

           return $this->responser(['resend'=>$rsend],$msg);


    	}

    	return $this->responser([],'User not found');
    }

    public function sendOtp($id,$userPhone)
    {

        $otp = rand(1000,9999);
        // Log::info("otp = ".$otp);
        $userOtpExist = verifyOtp::where('user_id',$id)->get()->first();


        if (!empty($userOtpExist)) {
            $sendOtp = verifyOtp::where('user_id','=',$id)->update(['otp' => $otp]);
        } else {
            $sendOtp = verifyOtp::create(['user_id' => $id,'otp' => $otp]);
        }
        
        if($sendOtp){
        // send otp in the email
        // $mail_details = [
        //     'subject' => 'Testing Application OTP',
        //     'otp' => $otp
        // ];
       // echo $otp; die();
         // \Mail::to($userEmail)->send(new sendOTP($otp));
        $account_sid = getenv("TWILIO_SID");
        $auth_token = getenv("TWILIO_TOKEN");
        $twilio_number = getenv("TWILIO_FROM");

        $client = new Client($account_sid, $auth_token);
        try {
  
           
            $client->messages->create("+1".$userPhone, [
                'from' => $twilio_number, 
                'body' => 'Your Woo-pon Account Otp : '.$otp]);
  
            return array("status" => 200, "message" => "OTP sent successfully");
  
        } catch (\Exception $e) {
            return array("status" => 401, 'message' => $e->getMessage());
        }
       
         
        }
        else{
            return array("status" => 401, 'message' => 'Invalid Phone Number');
        }
    }

   

    public function verifyOtp(Request $request){
    
        $checkOtp  = verifyOtp::where([['user_id',$request->user_id],['otp',$request->otp]])->first();
        // $checkOtp  = verifyOtp::where('user_id',$request->id)->where('otp',$request->otp)->get()->first();
        // echo "string";
        if($checkOtp){
            // $chkstrpaccexist = 0;
            $user = User::where('id',$request->user_id)->first();

            $user->email_verified_at = Carbon::now();
            $user->save();

            // echo $account; die();
            // if (!is_object($account)) {
            //     return $this->responser([],$account);
            // } 

            $accessToken = auth()->login($user, true);



            $return = [
                'message' => 'OTP Verified',
                'data' => array(
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'email_verified' => $user->email_verified_at,
                    'roleId' => $user->role,
                    'token' => $accessToken,
                    'avatar' => $user->userInfo && $user->userInfo->profile ? '/'.$user->userInfo->profile : null,
                    'phone' => $user->userInfo ? $user->userInfo->phone : '',
                    'address' => $user->userInfo ? $user->userInfo->address : '',
                    'dob' => $user->userInfo ? $user->userInfo->dob : '',
                    'sub_status' => "Inactive"
                ),   
            ];
            
        }
        else{
            $return = ['message' => 'Invalid Otp.','data'=> []];
        }
        return $this->responser($return['data'],$return['message']);
    }

    public function logout(Request $request)
    {

        $data = Auth::guard('api')->user();
        Auth::guard('api')->logout();

        return $this->responser($data, 'User logged out.');
    }


    public function index(){

        $user = User::OrderBy('id', 'asc')->get();

        $data = UserResource::collection($user);

        return $this->responser($user, $data, 'Users');

    }

    public function myProfile(){

        $user = Auth::guard('api')->user();

        $data = new UserResource($user);

        return $this->responser($data, 'User');

    }

    public function changePassword(Request $request){

        $validator = Validator::make($request->all(), [
            'current_password' => 'required',
            'new_password' => 'required|different:current_password'
        ]);

        if($validator->fails()){
            return $this->responser([],$validator->errors()->first());
        }

        $user = Auth::user();
        $oldpass = $request->current_password;
        $ok = password_verify($oldpass, $user->password);
        if ( $ok == true) {
            // if($request->new_password == $request->confirm__password){
                $user->password = bcrypt($request->new_password);
                $user->save();
                return $this->responser($user,'User Password Updated successfully');
            // } else {
                // return $this->responser([],'Password doesn\'t match');
            // }
        } else {
            return $this->responser([],'Current password doesn\'t match');
        }
    }

    public function updateDeviceToken(Request $request)
    {
        $user = Auth::guard('api')->user();
        if ($request->has('device_token')) {
            $user->device_token = $request->device_token;
            $user->save();
        }

        return $this->responser($user,'Device Token Updated.');
    }

    

    // public function toggleNotifications(Request $request)
    // {
    //     $user = Auth::user();

    //     $exitsInNotify = NotifyDisable::where('user_id',$user->id)->get()->first();
    //     if ($exitsInNotify) {
    //         $exitsInNotify->delete();
    //     } else {
    //         $notifyDisable = new NotifyDisable();
    //         $notifyDisable->user_id = $user->id;
    //         $notifyDisable->save();
    //     }
        
    //     return $this->responser($user,'User notifications updated successfully.');

    // }

    // public function delete(Request $request)
    // {
    //     $user = Auth::guard('api')->user();
    //     $user->delete();

    //     return $this->responser($user,'Account Deleted Successfully.');
    // }

}
