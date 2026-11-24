import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

export default function UserLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="relative min-h-screen w-full overflow-x-hidden bg-[#F8F9F5]">
            <Navbar />
            <div className="px-20 py-12">
                {children}
            </div>
            <Footer />
        </div>
    );
};
