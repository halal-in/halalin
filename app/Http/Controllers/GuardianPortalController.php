<?php

namespace App\Http\Controllers;

use App\Models\ChatRoom;
use App\Models\Guardian;
use App\Models\Interest;
use App\Models\Message;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class GuardianPortalController extends Controller
{
    public function index(Request $request): Response
    {
        $guardian = Guardian::where('user_id', $request->user()->id)->first();

        $rooms = $guardian
            ? ChatRoom::with(['interest.sender', 'interest.receiver', 'messages.sender'])
                ->where('guardian_id', $guardian->id)
                ->latest()
                ->get()
            : collect();

        $interests = $rooms->map(function (ChatRoom $room) use ($request) {
            $interest = $room->interest;

            return [
                'id' => $interest->id,
                'status' => $interest->status, // 'JEDA', 'LANJUT', 'BERHENTI'
                'ward' => [
                    'id' => $interest->receiver->id,
                    'name' => $interest->receiver->name,
                    'email' => $interest->receiver->email,
                    'age' => $interest->receiver->age,
                    'location' => $interest->receiver->location,
                ],
                'counterpart' => [
                    'id' => $interest->sender->id,
                    'name' => $interest->sender->name,
                    'age' => $interest->sender->age,
                    'location' => $interest->sender->location,
                ],
                'approvals' => [
                    'sender' => !is_null($interest->sender_approved_at),
                    'receiver' => !is_null($interest->receiver_approved_at),
                    'sender_guardian' => !is_null($interest->sender_guardian_approved_at),
                    'receiver_guardian' => !is_null($interest->receiver_guardian_approved_at),
                ],
                'has_guardian_approved' => !is_null($interest->receiver_guardian_approved_at),
                'chat_room' => [
                    'id' => $room->id,
                    'status' => $room->status, // 'locked', 'unlocked', 'blocked'
                    'messages' => $room->messages->map(fn (Message $msg) => [
                        'id' => $msg->id,
                        'sender_id' => $msg->sender_id,
                        'sender_name' => $msg->sender->name,
                        'is_guardian' => $msg->sender_id === $request->user()->id,
                        'topic_tag' => $msg->sender_id === $request->user()->id ? 'Arahan Wali' : null,
                        'body' => $msg->content,
                        'created_at' => $msg->created_at->format('H:i'),
                    ]),
                ],
            ];
        });

        return Inertia::render('guardian/portal', [
            'interests' => $interests,
        ]);
    }

    public function approve(Request $request, Interest $interest): RedirectResponse
    {
        $interest->receiver_guardian_approved_at = now();
        $interest->save();

        if ($interest->isFourPartyApproved()) {
            $interest->update(['status' => 'LANJUT']);
            ChatRoom::where('interest_id', $interest->id)->update(['status' => 'unlocked']);
        }

        return back()->with('success', 'Restu dan persetujuan wali berhasil dicatat.');
    }

    public function sendGuidance(Request $request, ChatRoom $chatRoom): RedirectResponse
    {
        $validated = $request->validate([
            'body' => ['required', 'string', 'max:1000'],
        ]);

        Message::create([
            'room_id' => $chatRoom->id,
            'sender_id' => $request->user()->id,
            'content' => '[Arahan Wali] ' . $validated['body'],
        ]);

        return back();
    }

    public function terminate(Request $request, Interest $interest): RedirectResponse
    {
        $validated = $request->validate([
            'end_reason' => ['required', 'string', 'max:500'],
        ]);

        $interest->update([
            'status' => 'BERHENTI',
            'end_reason' => $validated['end_reason'],
        ]);

        ChatRoom::where('interest_id', $interest->id)->update(['status' => 'blocked']);

        return back()->with('success', 'Proses ta’aruf telah dihentikan oleh Wali.');
    }
}