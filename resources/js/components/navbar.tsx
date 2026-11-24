import { Link, usePage } from "@inertiajs/react";
import {
    Bell,
    Inbox,
    LayoutGrid,
    MessageSquareText,
    ShieldCheck,
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { chat } from "@/routes";
import { portal } from "@/routes/guardian";

export default function Navbar() {
    const { url } = usePage();
    const { user } = useAuth();

    const navItems = [
        {
            name: "Direktori",
            href: "/directory",
            icon: LayoutGrid,
        },
        {
            name: "Pengajuan",
            href: "/pengajuan",
            icon: Inbox,
        },
        {
            name: "Obrolan",
            href: chat().url,
            icon: MessageSquareText,
        },
        {
            name: "Portal wali",
            href: portal().url,
            icon: ShieldCheck,
        },
    ];

    const isActive = (href: string) => {
        return url === href || url.startsWith(`${href}/`);
    };

    return (
        <header className="w-full border-b border-gray-100 bg-white sticky-top">
            <div className="mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-20">
                <div className="flex shrink-0 items-center">
                    <Link
                        href="/"
                        className="font-serif text-2xl font-bold tracking-tight text-[#125B44]"
                    >
                        Zawjan
                    </Link>
                </div>

                <nav className="flex items-center space-x-2 sm:space-x-6">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const active = isActive(item.href);

                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm transition-colors ${
                                    active
                                        ? "bg-[#EAF1EC] font-semibold text-[#125B44]"
                                        : "font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                                }`}
                            >
                                <Icon
                                    className={`h-4 w-4 ${
                                        active
                                            ? "text-[#125B44]"
                                            : "text-gray-500"
                                    }`}
                                    strokeWidth={2}
                                />
                                <span>{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="flex items-center gap-4">
                    <button
                        type="button"
                        aria-label="Notifikasi"
                        className="relative rounded-full p-1.5 text-gray-700 transition-colors hover:bg-gray-100"
                    >
                        <Bell className="h-5 w-5" strokeWidth={1.8} />
                    </button>

                    <span className="text-sm font-semibold text-[#1E322B]">
                        {user?.name ?? "Guest"}
                    </span>
                </div>
            </div>
        </header>
    );
}
