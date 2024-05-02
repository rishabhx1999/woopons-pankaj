<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Support\Str;
use DB;
use App\Models\User;
use App\Mail\ResetPassword;
use Illuminate\Support\Facades\Mail;

class ForgotPasswordController extends Controller
{
    protected function sendResetLinkResponse(Request $request)
    {
        $input = $request->only('email');

        $validator = Validator::make($input, [
            'email' => "required|email"
        ]);

        if ($validator->fails()) {
            return $this->responser([],$validator->errors()->first());
        }

        $user = User::where('email',$input)->get()->first();
        if (!$user) {
            return $this->responser([],"user not exist");
        }
        
        $token = Str::random(60);

        try {
            $rstTbl = DB::table(config('auth.passwords.users.table'))->where('email',$user->email)->get()->first();
            if ($rstTbl) {
                DB::table(config('auth.passwords.users.table'))->where('email',$user->email)->update([ 
                    'token' => $token
                ]);
            }else{
                DB::table(config('auth.passwords.users.table'))->insert([
                    'email' => $user->email, 
                    'token' => $token
                ]);
            }

            Mail::to($input)->send(new ResetPassword($user->name, $token));
            return $this->responser(['sendmail'=>1],'The forgot password link send to your email address '.$user->email);
        } catch (Exception $e) {
            return $this->responser([],'Email could not be sent to this email address');
        }
        
    }

    protected function sendResetResponse(Request $request){
        //password.reset
        $input = $request->only('email','token', 'password');

        $validator = Validator::make($input, [
        'token' => 'required',
        // 'email' => 'required|email',
        'password' => 'required|min:8',
        ]);

        if ($validator->fails()) {
            return $this->responser([],$validator->errors()->first());
            // return response(['errors'=>$validator->errors()->all()], 422);
        }

        // $rstTbl = DB::table(config('auth.passwords.users.table'))->where('email',$request->email)->where('token',$request->token)->get()->first();
        $rstTbl = DB::table(config('auth.passwords.users.table'))->where('token',$request->token)->get()->first();
        
        if ($rstTbl) {
            $user = User::where('email',$rstTbl->email)->get()->first();
            if ($user) {
                $user->forceFill([
                'password' => Hash::make($request->password)
                ])->save();
                $message = "Password reset successfully";
                return $this->responser(['resetpassword'=>1],$message);
            } else {
                $message = "User not exist";
                return $this->responser([],$message);
            }


        }else{
            $message = "Token not authenticated for this request";
            return $this->responser([],$message);
        }
        # return Redirect::to('/reset-password/'.$request->token)->with('message', $message);
        
        
    }
}
