<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations for the infinite scrolling demo.
     */
    public function up(): void
    {
        // Create a demo items table if it doesn't exist
        if (!Schema::hasTable('demo_items')) {
            Schema::create('demo_items', function (Blueprint $table) {
                $table->id();
                $table->string('name');
                $table->string('email')->unique();
                $table->enum('status', ['active', 'pending', 'inactive'])->default('active');
                $table->text('description')->nullable();
                $table->decimal('price', 10, 2)->nullable();
                $table->integer('quantity')->default(0);
                $table->timestamps();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('demo_items');
    }
};
