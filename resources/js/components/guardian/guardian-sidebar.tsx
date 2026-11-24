import { Link, usePage } from '@inertiajs/react';
import { Eye, LogOut, ShieldCheck, UserCheck } from 'lucide-react';
import AppLogo from '@/components/app-logo';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';

export function GuardianSidebar() {
    const { url, props } = usePage<{ auth: { user: { name: string; email: string } } }>();
    const user = props.auth?.user;

    const navItems = [
        {
            title: 'Portal Wali • Pengawasan',
            href: '/guardian/portal',
            icon: Eye,
        },
        {
            title: 'Persetujuan Empat Pihak',
            href: '/guardian/portal#approvals',
            icon: UserCheck,
        },
    ];

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/guardian/portal">
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel className="flex items-center gap-1.5">
                        <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                        <span>Perwalian Syariah</span>
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {navItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={url.startsWith('/guardian/portal')}
                                        tooltip={item.title}
                                    >
                                        <Link href={item.href}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
                <SidebarMenu>
                    {user && (
                        <SidebarMenuItem>
                            <div className="px-2 py-1.5 text-xs">
                                <p className="truncate font-medium">{user.name}</p>
                                <p className="truncate text-muted-foreground">{user.email}</p>
                            </div>
                        </SidebarMenuItem>
                    )}
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild tooltip="Keluar">
                            <Link href="/logout" method="post" as="button" className="w-full">
                                <LogOut />
                                <span>Keluar</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}