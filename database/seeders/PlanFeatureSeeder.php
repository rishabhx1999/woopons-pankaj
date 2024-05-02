<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\PlanFeature;

class PlanFeatureSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $planFeatures = [
            [
		        'plan_id' => 1,
		        'coupon' => 1,
		        'valid_time' => 'weekly',
		    ],
		    [
		        'plan_id' => 2,
		        'coupon' => 1,
		        'valid_time' => 'daily',
		    ],
		    [
		        'plan_id' => 3,
		        'coupon' => 1,
		        'valid_time' => 'monthly',
		    ],
		    [
		        'plan_id' => 4,
		        'coupon' => 3,
		        'valid_time' => 'monthly',
		    ]
        ];
  
        foreach ($planFeatures as $planFeature) {
            PlanFeature::create($planFeature);
        }
    }
}
