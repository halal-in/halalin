import { ReactNode } from 'react';
import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { GuardianSidebar } from '@/components/guardian/guardian-sidebar';
import { SidebarTrigger } from '@/components/ui/sidebar';

interface GuardianLayoutProps {
    children: ReactNode;
}

export function GuardianLayout({ children }: GuardianLayoutProps) {
    return (
        <AppShell variant="sidebar">
            <GuardianSidebar />
            <AppContent variant="sidebar" className="overflow-x-hidden">
                {/* Header ringkas untuk tombol toggle sidebar (Desktop & Mobile) tanpa breadcrumbs */}
                <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
                    <SidebarTrigger className="-ml-1" />
                    <span className="text-sm font-medium text-muted-foreground">
                        Zaujān • Area Pendampingan Wali
                    </span>
                </header>
                {children}
            </AppContent>
        </AppShell>
    );
}