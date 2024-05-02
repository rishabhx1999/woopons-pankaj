<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

        /**
     * The attributes that are mass assignable.
     *
     * @var array

     */
    protected $fillable = [
        'name',
        'image',
        'description',
    ];

    public function businesses()
    {
        return $this->hasMany('App\Models\Business','business_type');
    }

    public function activebusinesses()
    {
        return $this->businesses()->where('status',1);
    }

}
