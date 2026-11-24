import { Eye, ShieldCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export function PortalHeader() {
    return (
        <div className="flex flex-col justify-between gap-3 rounded-xl border bg-card p-5 shadow-xs sm:flex-row sm:items-center">
            <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600">
                    <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                    <h1 className="text-lg font-semibold tracking-tight">
                        Portal Pengawasan Wali
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Pantau persetujuan empat pihak dan dampingi obrolan terarah secara transparan.
                    </p>
                </div>
            </div>
            <Badge
                variant="outline"
                className="w-fit border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-950/30 dark:text-emerald-400"
            >
                <Eye className="mr-1.5 h-3.5 w-3.5" />
                Mode Pengawasan Aktif
            </Badge>
        </div>
    );
}