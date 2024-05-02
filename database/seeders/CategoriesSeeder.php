<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Category;

class CategoriesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $categories = [
            [
                'name' => 'Food & Beverage', 
                'image' => '/categories/Food&beverage.png',
                'trending_image' => '/categories/Food&beverageTC.png',
                'description' => "Date Night? Girls Night? Bros Only...We've got you covered! Check out the best deals for your favorite local establishments providing delicious Food & Beverages",
            ],
            // [
            //     'name' => 'Beauty', 
            //     'image' => '/categories/beauty.png',
            //     'trending_image' => '/categories/beautyTC.png',
            //     'description' => "Drink your shakes, Look your best & be the best version of yourself...We've got you covered! Check out the best deals for local establishments providing you with a great lifestyle",
            // ],
            [
                'name' => 'Beauty/Health/Fitness', 
                'image' => '/categories/Healthbeautyfitness.png',
                'trending_image' => '/categories/Health beauty fitness TC.png',
                'description' => "Drink your shakes, Look your best & be the best version of yourself...We've got you covered! Check out the best deals for local establishments providing you with a great lifestyle",
            ],
            [
                'name' => 'Home Services', 
                'image' => '/categories/Homeservice.png',
                'trending_image' => '/categories/HomeserviceTC.png',
                'description' => "Toilet still running? House a mess? Take a rest...We got you covered! Check out the best deals for your favorite local home service providers",
            ],
            [
                'name' => 'Entertainment & Activities', 
                'image' => '/categories/entertainment&activities.png',
                'trending_image' => '/categories/entertainment&activitiesTC.png',
                'description' => "Need a Night Out? Call the Babysitter...We've got you covered! Check out the best deals for your favorite local establishments that provide fun & exciting things to do",
            ],
            [
                'name' => 'Other', 
                'image' => '/categories/Others.png',
                'trending_image' => '/categories/otherTC.png',
                'description' => "Everything else...We've got you covered! Check out the best deals for local establishments providing you with incredible savings",
            ],
            [
                'name' => 'Recently Added', 
                'image' => '/categories/recentlyadded.png',
            ]
        ];
  
        foreach ($categories as $category) {
            Category::create($category);
        }
    }
}
