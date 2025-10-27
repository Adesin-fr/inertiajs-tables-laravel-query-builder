<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class DemoItemsSeeder extends Seeder
{
    /**
     * Seed the demo items table for infinite scrolling demonstration.
     *
     * @return void
     */
    public function run(): void
    {
        $faker = Faker::create();

        // Generate 250 demo items to properly demonstrate infinite scrolling
        $items = [];
        
        for ($i = 1; $i <= 250; $i++) {
            $items[] = [
                'name' => $faker->name(),
                'email' => $faker->unique()->safeEmail(),
                'status' => $faker->randomElement(['active', 'pending', 'inactive']),
                'description' => $faker->paragraph(),
                'price' => $faker->randomFloat(2, 10, 1000),
                'quantity' => $faker->numberBetween(0, 100),
                'created_at' => $faker->dateTimeBetween('-1 year', 'now'),
                'updated_at' => now(),
            ];

            // Insert in batches of 50 for better performance
            if ($i % 50 === 0) {
                DB::table('demo_items')->insert($items);
                $items = [];
            }
        }

        // Insert remaining items
        if (!empty($items)) {
            DB::table('demo_items')->insert($items);
        }

        $this->command->info('Created 250 demo items for infinite scrolling demonstration.');
    }
}
