<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        Role::create([
            'name' => 'admin',
        ]);

        User::factory()->create([
            'role_id' => 1,
            'name' => 'Test User',
            'email' => 'test@example.com',
            'phone_number' => '081122334455',
            'is_verified' => true,
            'age' => 17,
            'location' => 'GENTAR',
            'is_blocked' => false,
        ]);
    }
}
