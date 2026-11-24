import { router } from '@inertiajs/react';
import { CheckCircle2, Clock, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { GuardianInterestItem } from '@/types/guardian';

interface FourPartyApprovalCardProps {
    interest: GuardianInterestItem;
}

export function FourPartyApprovalCard({ interest }: FourPartyApprovalCardProps) {
    const [submitting, setSubmitting] = useState(false);

    const approvalSteps = [
        { label: `Calon Pengaju (${interest.counterpart.name})`, approved: interest.approvals.sender },
        { label: `Calon Penerima (${interest.ward.name})`, approved: interest.approvals.receiver },
        { label: 'Wali Pengaju', approved: interest.approvals.sender_guardian },
        { label: 'Wali Penerima (Anda)', approved: interest.approvals.receiver_guardian },
    ];

    const handleApprove = () => {
        setSubmitting(true);
        router.post(
            `/guardian/interests/${interest.id}/approve`,
            {},
            {
                preserveScroll: true,
                onFinish: () => setSubmitting(false),
            },
        );
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-base">Persetujuan Empat Pihak</CardTitle>
                <CardDescription>
                    Syarat wajib pembukaan kunci ruang komunikasi ta’aruf.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
                {approvalSteps.map((step, idx) => (
                    <div
                        key={idx}
                        className="flex items-center justify-between rounded-lg border px-3 py-2.5 text-sm"
                    >
                        <span className="truncate pr-2">{step.label}</span>
                        {step.approved ? (
                            <span className="flex shrink-0 items-center font-medium text-emerald-600">
                                <CheckCircle2 className="mr-1.5 h-4 w-4" />
                                Setuju
                            </span>
                        ) : (
                            <span className="flex shrink-0 items-center text-amber-600">
                                <Clock className="mr-1.5 h-4 w-4" />
                                Menunggu
                            </span>
                        )}
                    </div>
                ))}

                {!interest.has_guardian_approved && interest.status !== 'BERHENTI' && (
                    <Button
                        className="mt-2 w-full bg-emerald-600 text-white hover:bg-emerald-700"
                        disabled={submitting}
                        onClick={handleApprove}
                    >
                        <ShieldCheck className="mr-2 h-4 w-4" />
                        Berikan Restu & Persetujuan Wali
                    </Button>
                )}
            </CardContent>
        </Card>
    );
}