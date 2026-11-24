import { Eye, ShieldCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export function PortalHeader() {
    return (
        <div className="flex flex-col justify-between gap-3 rounded-xl border-[1.5px] border-[#E1E7DF] bg-white p-5 sm:flex-row sm:items-center">
            <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600">
                    <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                    <h1 className="text-lg text-black/70 font-semibold tracking-tight font-serif">
                        Portal Pengawasan Wali
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Pantau persetujuan empat pihak dan dampingi obrolan terarah secara transparan.
                    </p>
                </div>
            </div>
            <Badge
                variant="outline"
                className="w-fit border-emerald-600 py-1 px-2 bg-emerald-50 text-emerald-70 text-black/70"
            >
                <Eye className="mr-1.5 h-3.5 w-3.5" />
                Mode Pengawasan Aktif
            </Badge>
        </div>
    );
}