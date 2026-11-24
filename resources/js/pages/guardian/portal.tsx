import { Head } from '@inertiajs/react';
import { MessageSquare, UserCheck } from 'lucide-react';
import { useState } from 'react';
import { ChatMonitorPanel } from '@/components/guardian/chat-monitor-panel';
import { FourPartyApprovalCard } from '@/components/guardian/four-party-approval-card';
import { GuardianControlCard } from '@/components/guardian/guardian-control-card';
import { PortalHeader } from '@/components/guardian/portal-header';
import { WardSessionSelector } from '@/components/guardian/ward-session-selector';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import type { GuardianInterestItem } from '@/types/guardian';

interface GuardianPortalProps {
    interests: GuardianInterestItem[];
}

export default function GuardianPortal({ interests }: GuardianPortalProps) {
    const [selectedId, setSelectedId] = useState<number | null>(interests[0]?.id ?? null);
    const [mobileTab, setMobileTab] = useState<'chat' | 'approvals'>('chat');

    const activeInterest =
        interests.find((item) => item.id === selectedId) ?? interests[0] ?? null;

    return (
        <>
            <Head title="Portal Wali • Pengawasan" />

            <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 p-4 md:p-6">
                <PortalHeader />

                {!activeInterest ? (
                    <Card>
                        <CardContent className="py-12 text-center text-sm text-muted-foreground">
                            Belum ada pengajuan atau sesi ta’aruf aktif dari anggota keluarga yang Anda dampingi.
                        </CardContent>
                    </Card>
                ) : (
                    <>
                        <WardSessionSelector
                            interests={interests}
                            activeId={activeInterest.id}
                            onSelect={setSelectedId}
                        />

                        {/* Navigasi Tab Khusus Mobile */}
                        <div className="grid grid-cols-2 gap-2 lg:hidden">
                            <Button
                                variant={mobileTab === 'chat' ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => setMobileTab('chat')}
                            >
                                <MessageSquare className="mr-2 h-4 w-4" />
                                Ruang Pantau Chat
                            </Button>
                            <Button
                                variant={mobileTab === 'approvals' ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => setMobileTab('approvals')}
                            >
                                <UserCheck className="mr-2 h-4 w-4" />
                                Persetujuan & Kontrol
                            </Button>
                        </div>

                        {/* Layout Desktop 12 Kolom (8 Kolom Chat + 4 Kolom Panel Wali) */}
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                            <div
                                className={`lg:col-span-8 ${
                                    mobileTab === 'chat' ? 'block' : 'hidden lg:block'
                                }`}
                            >
                                <ChatMonitorPanel interest={activeInterest} />
                            </div>

                            <div
                                id="approvals"
                                className={`space-y-6 lg:col-span-4 ${
                                    mobileTab === 'approvals' ? 'block' : 'hidden lg:block'
                                }`}
                            >
                                <FourPartyApprovalCard interest={activeInterest} />
                                <GuardianControlCard interest={activeInterest} />
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}