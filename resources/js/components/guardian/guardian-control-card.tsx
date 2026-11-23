import { useForm } from '@inertiajs/react';
import { ShieldAlert, XCircle } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import type { GuardianInterestItem } from '@/types/guardian';

interface GuardianControlCardProps {
    interest: GuardianInterestItem;
}

export function GuardianControlCard({ interest }: GuardianControlCardProps) {
    const [isConfirming, setIsConfirming] = useState(false);

    const terminateForm = useForm({
        end_reason: '',
    });

    const handleTerminate = (e: FormEvent) => {
        e.preventDefault();
        if (!terminateForm.data.end_reason.trim()) return;

        terminateForm.post(`/guardian/interests/${interest.id}/terminate`, {
            preserveScroll: true,
            onSuccess: () => {
                setIsConfirming(false);
                terminateForm.reset();
            },
        });
    };

    return (
        <Card className="border-rose-200/70 dark:border-rose-900/40">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base text-rose-600">
                    <ShieldAlert className="h-4 w-4" />
                    Kontrol Pengawasan Wali
                </CardTitle>
                <CardDescription>
                    Wali berhak menghentikan proses ta’aruf kapan saja demi kemaslahatan.
                </CardDescription>
            </CardHeader>
            <CardContent>
                {interest.status === 'BERHENTI' ? (
                    <div className="rounded-lg bg-muted p-3 text-xs text-muted-foreground">
                        Sesi ta’aruf ini telah dihentikan.
                    </div>
                ) : !isConfirming ? (
                    <Button
                        variant="destructive"
                        className="w-full"
                        onClick={() => setIsConfirming(true)}
                    >
                        <XCircle className="mr-2 h-4 w-4" />
                        Akhiri Sesi Ta’aruf
                    </Button>
                ) : (
                    <form onSubmit={handleTerminate} className="space-y-3">
                        <Input
                            placeholder="Alasan pengakhiran ta'aruf..."
                            value={terminateForm.data.end_reason}
                            onChange={(e) => terminateForm.setData('end_reason', e.target.value)}
                            required
                        />
                        <div className="flex gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                className="flex-1"
                                onClick={() => setIsConfirming(false)}
                            >
                                Batal
                            </Button>
                            <Button
                                type="submit"
                                variant="destructive"
                                className="flex-1"
                                disabled={terminateForm.processing}
                            >
                                Konfirmasi
                            </Button>
                        </div>
                    </form>
                )}
            </CardContent>
        </Card>
    );
}