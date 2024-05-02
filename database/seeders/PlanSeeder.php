<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Plan;

class PlanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $plans = [
            [
                'name' => 'Silver plan', 
                'slug' => 'silver-plan', 
                'stripe_plan' => 'price_1M4zb1LqeRJ82vvRBXTHGZz2', 
                'price' => 10, 
                'type' => 'customer'
            ],
            [
                'name' => 'Gold plan', 
                'slug' => 'gold-plan', 
                'stripe_plan' => 'price_1M4zcfLqeRJ82vvRieJLIPDn', 
                'price' => 15, 
                'type' => 'customer'
            ],
            [
                'name' => 'Basic plan', 
                'slug' => 'basic-plan', 
                'stripe_plan' => 'price_1M4zfaLqeRJ82vvRuYswmH12', 
                'price' => 29, 
                'type' => 'business'
            ],
            [
                'name' => 'Pro plan', 
                'slug' => 'pro-plan', 
                'stripe_plan' => 'price_1M4zhKLqeRJ82vvR65HFj2NR', 
                'price' => 49, 
                'type' => 'business'
            ]
        ];
  
        foreach ($plans as $plan) {
            Plan::create($plan);
        }
    }
}
