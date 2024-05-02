<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Overtrue\LaravelFavorite\Traits\Favoriteable;
use Auth;

class Coupon extends Model
{
    use HasFactory, Favoriteable;

        /**
     * The attributes that are mass assignable.
     *
     * @var array

     */
    protected $fillable = [
        'user_id',
        'subscription_id',
        'name',
        'offer',
        'about',
        'one_time',
        'unlimited',
        'coupon_code',
        'status',
    ];

    protected $appends = ['rating_count','rating_avg','is_favourited'];

    public function user()
    {
        return $this->belongsTo('App\Models\User');
    }

    public function reviews()
    {
        return $this->hasMany('App\Models\Review');
    }

    public function getRatingAvgAttribute()
    {
        return $this->reviews->avg('rating');
    }

    public function getRatingCountAttribute()
    {
        return $this->reviews->count();
    }

    public function getIsFavouritedAttribute(){
        return Auth::guard('api')->user()->hasFavorited($this);
    }

    public function orders()
    {
        return $this->hasMany('App\Models\Order');
    }

    public function activeOrder()
    {
        // if ($this->coupons) {
        return $this->orders()->where('status', 1);
        // }
    }

    public function usedOrder()
    {
        // if ($this->coupons) {
        return $this->orders()->where('status', 0);
        // }
    }


}
