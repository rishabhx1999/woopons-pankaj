<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Http\Resources\Json\JsonResource;

class PlanResource extends JsonResource
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
            'slug' => $this->slug, 
            'plan_type_upgrade' => $this->slug == 'silver-plan' ? 1 : 0, 
            'stripe_plan' => $this->stripe_plan, 
            'price' => $this->price,
            'type' => $this->type
        ];

        return $return;
    }
}
