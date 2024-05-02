<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\CouponResource;

class OrderResource extends JsonResource
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
        // print_r($this->user); die('oll');

        $return = [
            'order_id' => $this->id,
            'rating' => $this->rating,
            // 'coupon_data' => new CouponResource($this->coupon)
        ];
        return array_merge($return, (new CouponResource($this->coupon))->toArray(request())) ;
        // return $return;
    }
}
