<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        // return parent::toArray($request);

        $return = [
                    'id' => $this->id,
                    'name' => $this->name,
                    'email' => $this->email,
                    'email_verified' => $this->email_verified_at,
                    'roleId' => $this->role,
                    'avatar' => $this->userInfo && $this->userInfo->profile ? '/'.$this->userInfo->profile : null,
                    'phone' => $this->userInfo ? $this->userInfo->phone : '',
                    'address' => $this->userInfo ? $this->userInfo->address : '',
                    'dob' => $this->userInfo ? $this->userInfo->dob : '',
                ];
        if ($this->role == 2) {
            $return['business_id'] = $this->businessInfo->id;
            $return['business_type'] = $this->businessInfo->business_type;
            $return['business_phone'] = $this->businessInfo->business_phone;
            $return['description'] = $this->businessInfo->description;
            $return['latitude'] = $this->businessInfo->latitude;
            $return['longitude'] = $this->businessInfo->longitude;
            $return['how_long_in_business'] = $this->businessInfo->how_long;
            $return['potential_customers_to_know'] = $this->businessInfo->potential_customers_to_know;
            $return['status'] = (int) $this->businessInfo->status;
            $return['featured'] = (int) $this->businessInfo->featured;
            $return['promote_images'] = (int) $this->businessInfo->promote_images;
        }
        // echo "<pre>";
        // print_r($this->subscriptions->count());
        // die();
        $status = 'Inactive';
        $activeplan = '';
        if ($this->subscriptions->count()) {
            $subscription = $this->subscriptions()->latest()->first();
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

        $return['active_plan'] = $activeplan;
        $return['sub_status'] = $status;
        // echo $token; die();
        // if ($token != null) {
        //     $return['token'] = $token;
        // }
        return $return;
    }
}
