<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PlanFeature extends Model
{
    use HasFactory;

        /**
     * The attributes that are mass assignable.
     *
     * @var array

     */
    protected $fillable = [
        'plan_id',
        'coupon',
        'valid_time',
    ];

    public function plan()
    {
        return $this->belongsTo('App\Models\Plan');
    }
}
