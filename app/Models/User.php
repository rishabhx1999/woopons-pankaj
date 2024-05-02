<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
// use Laravel\Sanctum\HasApiTokens;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;
use Laravel\Cashier\Billable;
use Overtrue\LaravelFavorite\Traits\Favoriter;
use Laravel\Cashier\Subscription;

class User extends Authenticatable implements JWTSubject
{
    use HasFactory, Notifiable, Billable, Favoriter;

    protected $cardUpFront = false;
    protected $trial_ends_at = null;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',

    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }

    public function userInfo(){
        return $this->hasOne('App\Models\UserInfo');
    }

    public function businessInfo(){
        return $this->hasOne('App\Models\Business');
    }

    public function userPass(){
        return $this->hasOne('App\Models\UserPass');
    }

    public function coupons()
    {
        return $this->hasMany('App\Models\Coupon');
    }

    public function activeCoupon()
    {
        // if ($this->coupons) {
        return $this->coupons()->where('status', 1);
        // }
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

    public function activeBusiness()
    {
        // if ($this->coupons) {
        return $this->businessInfo()->where('status', 1);
        // }
    }

    public function subscriptions()
    {
        return $this->hasMany(Subscription::class);
    }

    public function activeSubscription()
    {
        return $this->subscriptions()->where('stripe_status','!=','canceled');
    }
}
