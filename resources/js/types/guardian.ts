export type InterestStatus = 'JEDA' | 'LANJUT' | 'BERHENTI';
export type ChatRoomStatus = 'locked' | 'unlocked' | 'blocked';

export interface GuardianParticipant {
    id: number;
    name: string;
    email?: string;
    age: string;
    location: string;
}

export interface GuardianMessageItem {
    id: number;
    sender_id: number;
    sender_name: string;
    is_guardian: boolean;
    topic_tag: string | null;
    body: string;
    created_at: string;
}

export interface FourPartyApprovals {
    sender: boolean;
    receiver: boolean;
    sender_guardian: boolean;
    receiver_guardian: boolean;
}

export interface GuardianChatRoom {
    id: number;
    status: ChatRoomStatus;
    messages: GuardianMessageItem[];
}

export interface GuardianInterestItem {
    id: number;
    status: InterestStatus;
    ward: GuardianParticipant;
    counterpart: GuardianParticipant;
    approvals: FourPartyApprovals;
    has_guardian_approved: boolean;
    chat_room: GuardianChatRoom | null;
}