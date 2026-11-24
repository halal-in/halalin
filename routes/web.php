<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GuardianPortalController;
use App\Http\Controllers\ChatController;

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');

    Route::controller(ChatController::class)->group(function() {
        Route::get('/chat', 'index')->name('chat');
    });

    Route::prefix('guardian')->name('guardian.')->group(function() {
        Route::get('/portal', [GuardianPortalController::class, 'index'])->name('portal');
        Route::post('/interests/{interest}/approve', [GuardianPortalController::class, 'approve'])->name('interests.approve');
        Route::post('/chat-rooms/{chatRoom}/guidance', [GuardianPortalController::class, 'sendGuidance'])->name('chat.guidance');
        Route::post('/interests/{interest}/terminate', [GuardianPortalController::class, 'terminate'])->name('interests.terminate');
    });
});

require __DIR__.'/settings.php';
