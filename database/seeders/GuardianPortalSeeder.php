<?php

namespace Database\Seeders;

use App\Models\ChatRoom;
use App\Models\Guardian;
use App\Models\Interest;
use App\Models\Message;
use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class GuardianPortalSeeder extends Seeder
{
    public function run(): void
    {
        $waliRole = Role::firstOrCreate(['name' => 'wali']);
        $userRole = Role::firstOrCreate(['name' => 'user']);

        // 1. Akun Wali (Login dengan akun ini untuk menguji Portal Wali)
        $waliUser = User::firstOrCreate(
            ['email' => 'wali.ahmad@zawjan.test'],
            [
                'role_id' => $waliRole->id,
                'name' => 'Ust. Ahmad Fauzi (Wali)',
                'phone_number' => '081234567801',
                'is_verified' => true,
                'age' => '48',
                'location' => 'Bandung, Jawa Barat',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ]
        );

        // Daftarkan ke tabel guardians
        $guardianProfile = Guardian::firstOrCreate([
            'user_id' => $waliUser->id,
        ]);

        // 2. Akun Calon Binaan (Penerima)
        $binaan = User::firstOrCreate(
            ['email' => 'aisyah@zawjan.test'],
            [
                'role_id' => $userRole->id,
                'name' => 'Aisyah Putri',
                'phone_number' => '081234567802',
                'is_verified' => true,
                'age' => '23',
                'location' => 'Bandung, Jawa Barat',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ]
        );

        // 3. Akun Lawan Ta'aruf (Pengaju)
        $kandidat = User::firstOrCreate(
            ['email' => 'farhan@zawjan.test'],
            [
                'role_id' => $userRole->id,
                'name' => 'Muhammad Farhan',
                'phone_number' => '081234567803',
                'is_verified' => true,
                'age' => '25',
                'location' => 'Cimahi, Jawa Barat',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ]
        );

        // 4. Data Ta'aruf (status ENUM: 'JEDA', 'LANJUT', 'BERHENTI')
        $interest = Interest::firstOrCreate(
            ['sender_id' => $kandidat->id, 'receiver_id' => $binaan->id],
            [
                'status' => 'LANJUT',
                'sender_approved_at' => now()->subDays(2),
                'receiver_approved_at' => now()->subDays(2),
                'sender_guardian_approved_at' => now()->subDay(),
                'receiver_guardian_approved_at' => null, // Wali Aisyah belum menyetujui agar tombol restu bisa dites
            ]
        );

        // 5. Ruang Obrolan (status ENUM: 'locked', 'unlocked', 'blocked')
        $room = ChatRoom::firstOrCreate(
            ['interest_id' => $interest->id, 'guardian_id' => $guardianProfile->id],
            ['status' => 'locked']
        );

        if ($room->messages()->count() === 0) {
            Message::create([
                'room_id' => $room->id,
                'sender_id' => $kandidat->id,
                'content' => 'Assalamu’alaikum warahmatullahi wabarakatuh. Izin menyampaikan visi keluarga dan rencana domisili pasca menikah.',
            ]);
            Message::create([
                'room_id' => $room->id,
                'sender_id' => $binaan->id,
                'content' => 'Wa’alaikumussalam warahmatullahi wabarakatuh. Baik, silakan disampaikan agar dapat dipahami bersama Wali.',
            ]);
        }
    }
}