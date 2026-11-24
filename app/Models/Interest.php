<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Interest extends Model
{
    protected $fillable = [
        'sender_id',
        'receiver_id',
        'status', // 'JEDA', 'LANJUT', 'BERHENTI'
        'sender_approved_at',
        'receiver_approved_at',
        'sender_guardian_approved_at',
        'receiver_guardian_approved_at',
        'end_reason',
    ];

    protected $casts = [
        'sender_approved_at' => 'datetime',
        'receiver_approved_at' => 'datetime',
        'sender_guardian_approved_at' => 'datetime',
        'receiver_guardian_approved_at' => 'datetime',
    ];

    public function sender(): BelongsTo
    {
        return $this->belongsTo(User::class, 'sender_id');
    }

    public function receiver(): BelongsTo
    {
        return $this->belongsTo(User::class, 'receiver_id');
    }

    public function chatRooms(): HasMany
    {
        return $this->hasMany(ChatRoom::class, 'interest_id');
    }

    public function isFourPartyApproved(): bool
    {
        return !is_null($this->sender_approved_at)
            && !is_null($this->receiver_approved_at)
            && !is_null($this->sender_guardian_approved_at)
            && !is_null($this->receiver_guardian_approved_at);
    }
}