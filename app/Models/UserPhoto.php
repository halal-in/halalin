<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Attributes\Fillable;

#[Fillable(['user_id', 'photo_url'])]
class UserPhoto extends Model
{
    public function user() {
        return $this->belongsTo(User::class, 'user_id');
    }
}
