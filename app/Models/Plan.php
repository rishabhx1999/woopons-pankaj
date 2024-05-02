<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Plan extends Model
{
    use HasFactory;

        /**
     * The attributes that are mass assignable.
     *
     * @var array

     */
    protected $fillable = [
        'name',
        'slug',
        'stripe_plan',
        'price',
        'type',
    ];
  
    /**
     * Write code on Method
     *
     * @return response()
     */
    public function getRouteKeyName()
    {
        return 'slug';
    }

    public function feature(){
        return $this->hasOne('App\Models\PlanFeature');
    }
}
