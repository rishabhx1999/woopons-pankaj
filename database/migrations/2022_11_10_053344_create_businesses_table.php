<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBusinessesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('businesses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained('users');
            $table->string('business_type')->nullable();
            $table->string('business_phone')->nullable();
            $table->mediumText('description')->nullable();
            $table->integer('status')->default(2)->comment("1=approved,2=pending,0=declined");
            $table->string('latitude')->nullable();
            $table->string('longitude')->nullable();
            $table->mediumText('reject_reason')->nullable();
            $table->integer('featured')->default(0);
            $table->integer('promote_images')->default(1);
            $table->mediumText('how_long')->nullable();
            $table->mediumText('potential_customers_to_know')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('businesses');
    }
}
