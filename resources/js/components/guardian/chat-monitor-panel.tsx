import { useForm } from '@inertiajs/react';
import { Lock, Send } from 'lucide-react';
import { FormEvent } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import type { GuardianInterestItem } from '@/types/guardian';

interface ChatMonitorPanelProps {
    interest: GuardianInterestItem;
}

export function ChatMonitorPanel({ interest }: ChatMonitorPanelProps) {
    const guidanceForm = useForm({
        body: '',
    });

    const isRoomUnlocked =
        interest.status === 'LANJUT' && interest.chat_room?.status === 'unlocked';

    const handleSendGuidance = (e: FormEvent) => {
        e.preventDefault();
        if (!interest.chat_room || !guidanceForm.data.body.trim()) return;

        guidanceForm.post(`/guardian/chat-rooms/${interest.chat_room.id}/guidance`, {
            preserveScroll: true,
            onSuccess: () => guidanceForm.reset('body'),
        });
    };

    return (
        <Card className="flex h-full flex-col">
            <CardHeader className="border-b pb-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                        <CardTitle className="text-base">
                            Obrolan Terarah: {interest.ward.name} & {interest.counterpart.name}
                        </CardTitle>
                        <CardDescription>
                            Seluruh percakapan tercatat dan dapat diberi arahan langsung oleh Wali.
                        </CardDescription>
                    </div>
                    <Badge variant={interest.status === 'LANJUT' ? 'default' : 'secondary'}>
                        Status: {interest.status}
                    </Badge>
                </div>
            </CardHeader>

            <CardContent className="flex flex-1 flex-col justify-between p-0">
                <div className="max-h-115 space-y-4 overflow-y-auto p-5">
                    {!interest.chat_room || interest.chat_room.status === 'locked' ? (
                        <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
                            <Lock className="h-5 w-5 text-amber-600" />
                            <p>
                                Ruang obrolan terarah masih terkunci hingga keempat pihak memberikan persetujuan.
                            </p>
                        </div>
                    ) : interest.chat_room.messages.length === 0 ? (
                        <div className="py-10 text-center text-sm text-muted-foreground">
                            Belum ada pesan dalam ruang obrolan ini.
                        </div>
                    ) : (
                        interest.chat_room.messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex flex-col rounded-xl border p-3.5 text-sm ${
                                    msg.is_guardian
                                        ? 'border-amber-200 bg-amber-50/70 dark:border-amber-900/50 dark:bg-amber-950/20'
                                        : 'bg-muted/40'
                                }`}
                            >
                                <div className="mb-1.5 flex items-center justify-between gap-2">
                                    <div className="flex items-center gap-2">
                                        <span className="font-semibold">{msg.sender_name}</span>
                                        {msg.topic_tag && (
                                            <Badge variant="outline" className="text-[11px]">
                                                {msg.topic_tag}
                                            </Badge>
                                        )}
                                    </div>
                                    <span className="text-xs text-muted-foreground">
                                        {msg.created_at}
                                    </span>
                                </div>
                                <p className="leading-relaxed text-foreground/90">{msg.body}</p>
                            </div>
                        ))
                    )}
                </div>

                {isRoomUnlocked && (
                    <form onSubmit={handleSendGuidance} className="border-t bg-muted/20 p-4">
                        <div className="flex flex-col gap-2 sm:flex-row">
                            <Input
                                placeholder="Tulis pesan arahan atau pertanyaan pendampingan sebagai Wali..."
                                value={guidanceForm.data.body}
                                onChange={(e) => guidanceForm.setData('body', e.target.value)}
                                className="flex-1 bg-background"
                            />
                            <Button
                                type="submit"
                                disabled={guidanceForm.processing || !guidanceForm.data.body.trim()}
                            >
                                <Send className="mr-2 h-4 w-4" />
                                Kirim Arahan
                            </Button>
                        </div>
                    </form>
                )}
            </CardContent>
        </Card>
    );
}