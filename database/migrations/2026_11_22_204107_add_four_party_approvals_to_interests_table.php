<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('interests', function (Blueprint $table) {
            $table->timestamp('sender_approved_at')->nullable()->after('status');
            $table->timestamp('receiver_approved_at')->nullable()->after('sender_approved_at');
            $table->timestamp('sender_guardian_approved_at')->nullable()->after('receiver_approved_at');
            $table->timestamp('receiver_guardian_approved_at')->nullable()->after('sender_guardian_approved_at');
            $table->text('end_reason')->nullable()->after('receiver_guardian_approved_at');
        });
    }

    public function down(): void
    {
        Schema::table('interests', function (Blueprint $table) {
            $table->dropColumn([
                'sender_approved_at',
                'receiver_approved_at',
                'sender_guardian_approved_at',
                'receiver_guardian_approved_at',
                'end_reason',
            ]);
        });
    }
};