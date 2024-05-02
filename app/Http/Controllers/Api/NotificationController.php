<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Auth;
use App\Models\User;
use Carbon\Carbon;

class NotificationController extends Controller
{
    //
    public function broadcastNotification(Request $request){

        $users = User::where("role","3")->where("device_token", "!=", "")->get();

        if($request->notificationText != ""){

            foreach ($users as $key => $user) {
                if($user->device_token != ""){
                   $this->sendWebNotification($user->device_token,$request->notificationText);
                }
            }
            $data["success"] = true;
            return $this->responser($data,'Notification send successfully!');

        }else{
            return $this->responser([],"Text empty!");
        }

    }
    public function sendWebNotification($device_key,$message)
    {
        
        $url = 'https://fcm.googleapis.com/fcm/send';
        $FcmToken = $device_key;

          
        $serverKey = 'AAAApHZw3sQ:APA91bEcstyYqTN-YUx8mo19YqtbqFZ9pPdubVUI8_FbAAwP38EwY8kOzcEgYLvf9z96zw3GHgWioJvHuwEe4Dlgk86qTQn_Z2T18VQNYdOntnR5ojP-dr3Jm2uaXM8D7Ev3IT4ElYPu';
  
        $data = [
            "registration_ids" => [$FcmToken],
            "notification" => [
                "title" => "",
                "body" => $message,  
            ]
        ];
        $encodedData = json_encode($data);
    
        $headers = [
            'Authorization:key=' . $serverKey,
            'Content-Type: application/json',
        ];
    
        $ch = curl_init();
      
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
        curl_setopt($ch, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_1);
        // Disabling SSL Certificate support temporarly
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);        
        curl_setopt($ch, CURLOPT_POSTFIELDS, $encodedData);
        // Execute post
        $result = curl_exec($ch);
        if ($result === FALSE) {
            die('Curl failed: ' . curl_error($ch));
        }        
        // Close connection
        curl_close($ch);
        // FCM response
        /*echo "<pre>"; print_r($result); die;
        dd($result); */       
    }

}
