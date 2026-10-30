<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Attributes\Fillable;

#[Fillable(['user_id'])]
class Guardian extends Model
{
    public function guardian() {
        return $this->belongsTo(User::class, 'user_id');
    }
}
