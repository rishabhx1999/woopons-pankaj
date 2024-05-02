<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserInfo extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'profile',
        'phone',
        'address',
        'dob',
        
    ];

    public function user()
    {
        return $this->belongsTo('App\Models\User');
    }
}
