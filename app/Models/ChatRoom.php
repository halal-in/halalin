<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ChatRoom extends Model
{
    protected $fillable = [
        'guardian_id',
        'interest_id',
        'status', // 'locked', 'unlocked', 'blocked'
    ];

    public function guardian(): BelongsTo
    {
        return $this->belongsTo(Guardian::class);
    }

    public function interest(): BelongsTo
    {
        return $this->belongsTo(Interest::class);
    }

    public function messages(): HasMany
    {
        return $this->hasMany(Message::class, 'room_id')->orderBy('created_at', 'asc');
    }
}