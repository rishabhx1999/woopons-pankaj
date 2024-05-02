<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $appends = ['rating'];

    /**
     * Get the reviews of the product.
     */
    public function user()
    {
        return $this->belongsTo('App\Models\User');
    }

    public function coupon()
    {
        return $this->belongsTo('App\Models\Coupon');
    }

    public function oneTimeCoupon()
    {
        return $this->coupon()->where('one_time',1);
    }

    public function review()
    {
        return $this->hasOne('App\Models\Review');
    }

    public function getRatingAttribute()
    {
        return $this->review ? $this->review->rating : null;
    }

}
