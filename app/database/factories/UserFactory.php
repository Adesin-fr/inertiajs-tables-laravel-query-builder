<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'name'          => $this->faker->name(),
            'score'         => $this->faker->numberBetween(1, 100),
            'email'         => $this->faker->unique()->safeEmail(),
            'language_code' => $this->faker->randomElement(['en', 'nl']),
            'is_admin'      => $this->faker->boolean(50), // 20% chance to be admin
        ];
    }
}
