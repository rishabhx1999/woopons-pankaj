<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class FeedbackResource extends JsonResource
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
            'feedback' => $this->feedback,
            'user_name' => $this->user->name,
            'user_email' => $this->user->email,
            'user_phone' => $this->user->userInfo->phone,
            'user_type' => ($this->user->role == 3) ? 'Customer' : 'Business',

        ];

        return $return;
    }
}
