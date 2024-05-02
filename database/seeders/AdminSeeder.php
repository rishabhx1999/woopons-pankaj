<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\UserInfo;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
    	$user = User::create([
            'name' => 'dev teqtop',
            'email' => 'pankaj.kumar@xcelance.com',
            'password' => bcrypt('Welcome@1'),
            'role' => 1,
        ])->id;

        UserInfo::create([
        	'user_id' => $user,
	        'profile' => env('APP_URL').'/images/avtar.jpg',
	        'phone' => '325235235',
	        'address' => 'MOHALI',
	        'dob' => '',
        ]);
    	

    }
}
