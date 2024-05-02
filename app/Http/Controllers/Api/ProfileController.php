<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\APIController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Auth;
use App\User;
use Carbon\Carbon;

class ProfileController extends APIController
{
    //
    public function index(){
        $info = array();
        if(Auth::check()){
            $user_id = Auth::user()->id;
            if(Auth::user()->role == "2"){
                $user_data = User::join('user_infos', 'users.id', '=', 'user_infos.user_id')
                                ->join('businesses', 'users.id', '=', 'businesses.user_id')
                                ->select('users.*', 'user_infos.*', 'businesses.status as biz_status', 'businesses.business_name', 'businesses.description')
                                ->where('users.id',$user_id)
                                ->first();
            }else{
                $user_data = User::join('user_infos', 'users.id', '=', 'user_infos.user_id')
                                ->select('users.*', 'user_infos.*')
                                ->where('users.id',$user_id)
                                ->get();
                if(count($user_data) == 0){
                    $user_data = Auth::user();
                }
            }
            return $this->responseSuccess($user_data);
        }else{
            return $this->responseNotAllowed();
        }
    }


    public function update_profile(Request $request){
        if(Auth::check()){
            $user_id = Auth::user()->id;

            $update = User::find($user_id);
            $update->name = $request->name;
            $update->email = $request->email;
            $update->save();
            // if(isset)
            return $this->responseSuccess($user_data);
        }else{
            return $this->responseNotAllowed();
        }
    }

    public function change_password(Request $request){
        $validator = Validator::make($request->all(), [
            'password' => 'required|string|min:6|confirmed',
        ]);

        if ($validator->fails()) {
            return $this->responseUnprocessable($validator->errors());
        }

        try {
            $password = $request->password;
            $user_id = Auth::user()->id;
            $user = User::find($user_id);
            $old_pass = $user->password;
            if (Hash::check($password, $old_pass)) {
                return $this->responseUnprocessable('Your new password can not be same as current password.');
            }else{
                $hashed = Hash::make($password);
                $user->password = $hashed;
                $user->updated_at = Carbon::now();
                $user->save();
            }
            return $this->responseSuccess('Password updated successfully.');
        } catch (Exception $e) {
            return $this->responseServerError('Something went wrong.');
        }
        
    }
}
