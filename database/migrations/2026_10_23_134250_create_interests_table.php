<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('interests', function (Blueprint $table) {
            $table->id();
            $table->foreignId('sender_id')->constrained('users');
            $table->foreignId('receiver_id')->constrained('users');
            $table->enum('status', ['JEDA', 'LANJUT', 'BERHENTI']);
            $table->timestamp('sender_approved_at')->nullable();
            $table->timestamp('receiver_approved_at')->nullable();
            $table->timestamp('sender_guardian_approved_at')->nullable();
            $table->timestamp('receiver_guardian_approved_at')->nullable();
            $table->text('end_reason')->default("");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('interests');
    }
};
