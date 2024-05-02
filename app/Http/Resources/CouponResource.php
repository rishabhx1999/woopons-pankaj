<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CouponResource extends JsonResource
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
            'offer' => $this->offer,
            'about' => $this->about,
            'repetition' => $this->one_time ? "One Time": "Unlimited",
            'coupon_code' => $this->coupon_code,
            'status' => $this->status,
            'company_name' => $this->user->name,
            'company_category' => $this->user->businessInfo->category->name,
            'company_logo' => $this->user->userInfo && $this->user->userInfo->profile ? '/'.$this->user->userInfo->profile : null,
            'company_location' => $this->user->userInfo && $this->user->userInfo->address ? $this->user->userInfo->address : null,
            'rating_count' => $this->rating_count,
            'rating_avg' => $this->rating_avg ? round($this->rating_avg,2) : 5,
            'is_favourited' => $this->is_favourited,
            // 'how_to_use' => "•Er zijn vele variaties van passages van \n •van passage Er zijn vele variaties \n •Er zijn vele variaties van passages van \n •van passage Er zijn vele variaties \n"
            'how_to_use' => "Make sure you click the “Activate WOO-PON” when you are ready to check out. ALL WOO-PONS will expire 60 seconds after redeeming & you WILL NOT be able to activate it again."
        ];
        $return['latitude'] = $this->user->businessInfo && $this->user->businessInfo->latitude ? floatval($this->user->businessInfo->latitude) : null;
        $return['longitude'] = $this->user->businessInfo && $this->user->businessInfo->longitude ? floatval($this->user->businessInfo->longitude) : null;
        $return['how_long_in_business'] = $this->user->businessInfo && $this->user->businessInfo->how_long ? $this->user->businessInfo->how_long : null;
        $return['potential_customers_to_know'] = $this->user->businessInfo && $this->user->businessInfo->potential_customers_to_know ? $this->user->businessInfo->potential_customers_to_know : null;
        $return['business_description'] = $this->user->businessInfo && $this->user->businessInfo->description ? $this->user->businessInfo->description : null;
        $return['usage_count'] = $this->usedOrder->count();

        return $return;
    }
}
