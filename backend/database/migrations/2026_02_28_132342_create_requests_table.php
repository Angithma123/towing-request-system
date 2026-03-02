<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
       Schema::create('towing_requests', function (Blueprint $table) {
    $table->id();
    $table->string('customer_name');
    $table->string('location');
    $table->text('note')->nullable();
    $table->string('status')->default('pending'); // optional
    $table->timestamps();
});
    }

    public function down(): void
    {
        Schema::dropIfExists('requests');
    }
};