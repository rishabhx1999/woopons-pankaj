<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Http\Resources\Json\JsonResource;

class BussinessResource extends JsonResource
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
        // echo "<pre>";
        // print_r($this->user->userInfo); die();
        $return = [
                    'id' => $this->id,
                    'user_id' => $this->user_id,
                    'name' => $this->user->name,
                    'email' => $this->user->email,
                    'email_verified' => $this->user->email_verified,
                    'roleId' => $this->user->role,
                    'avatar' => $this->user->userInfo && $this->user->userInfo->profile ? '/'.$this->user->userInfo->profile : null,
                    'phone' => $this->user->userInfo ? $this->user->userInfo->phone : '',
                    'address' => $this->user->userInfo ? $this->user->userInfo->address : '',
                    'business_type' => $this->business_type,
                    'business_phone' => $this->business_phone,
                    'description' => $this->description,
                    'business_status' => $this->status,
                    'featured' => $this->featured,
                ];
        $return['latitude'] = $this->latitude;
        $return['longitude'] = $this->longitude;
        $return['how_long_in_business'] = $this->how_long;
        $return['potential_customers_to_know'] = $this->potential_customers_to_know;
        $return['promote_images'] = $this->promote_images;

        return $return;      
    }
}
