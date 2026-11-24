export default function UserLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen px-20 bg-[#F8F9F5]">
            {children}
        </div>
    );
};
