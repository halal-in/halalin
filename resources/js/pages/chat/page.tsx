import { useState, FormEvent } from 'react';
import { SendHorizontal, ShieldCheck } from 'lucide-react';

interface Message {
    id: number;
    sender: 'me' | 'partner';
    senderName: string;
    time: string;
    content: string;
}

export default function ChatPage() {
    const [messageInput, setMessageInput] = useState('');
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            sender: 'me',
            senderName: 'Anda',
            time: '10:20',
            content:
                'Terkait rencana tempat tinggal pasca menikah, bagaimana pandangan Ukhti mengenai kesiapan domisili mandiri dan komitmen studi atau dakwah bersama keluarga nantinya?',
        },
        {
            id: 2,
            sender: 'partner',
            senderName: 'Ukh Fathimah',
            time: '10:24',
            content:
                'Bismillah. Terkait tempat tinggal, saya fleksibel mengikuti suami asalkan kondusif untuk ibadah dan dekat dengan fasilitas keluarga. Mengenai kelanjutan studi, in syaa Allah tetap ingin saya tempuh dengan musyawarah berkala bersama suami.',
        },
    ]);

    const isAllWaliPresent = true;

    const handleSendMessage = (e: FormEvent) => {
        e.preventDefault();
        if (!messageInput.trim() || !isAllWaliPresent) return;

        const now = new Date();
        const formattedTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

        setMessages((prev) => [
            ...prev,
            {
                id: Date.now(),
                sender: 'me',
                senderName: 'Anda',
                time: formattedTime,
                content: messageInput.trim(),
            },
        ]);
        setMessageInput('');
    };

    return (
        <div className="w-full text-[#1E322B]">
            <div className="mb-6">
                <p className="text-xs font-bold tracking-wider text-[#125B44] uppercase">
                    OBROLAN TERARAH
                </p>
                <h1 className="mt-1 font-serif text-3xl font-bold tracking-tight text-[#1E322B]">
                    Ukh Fathimah A.
                </h1>
                <p className="mt-1 text-sm text-gray-500">
                    Tahap 2 · Tersisa 5 hari 14 jam
                </p>
            </div>

            {/* left section */}
            <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
                <div className="flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-xs lg:col-span-8">
                    <div className="flex items-center justify-between pb-4">
                        <span className="text-xs font-semibold tracking-wider text-gray-600 uppercase">
                            TOPIK: VISI KELUARGA &amp; DOMISILI
                        </span>
                        <button
                            type="button"
                            className="text-xs font-semibold text-[#125B44] transition-colors hover:text-[#0d4433] hover:underline"
                        >
                            Ganti topik
                        </button>
                    </div>

                    <div className="my-3 text-center">
                        <button
                            type="button"
                            className="text-xs text-gray-500 transition-colors hover:text-gray-700"
                        >
                            Hari ini · Lihat pesan sebelumnya
                        </button>
                    </div>

                    <div className="my-4 flex flex-col space-y-5">
                        {messages.map((msg) => {
                            const isMe = msg.sender === 'me';

                            return (
                                <div
                                    key={msg.id}
                                    className={`flex flex-col ${
                                        isMe ? 'items-end' : 'items-start'
                                    }`}
                                >
                                    <span className="mb-1.5 text-xs text-gray-500">
                                        {msg.senderName} · {msg.time}
                                    </span>
                                    <div
                                        className={`max-w-[85%] rounded-2xl px-5 py-3.5 text-sm leading-relaxed sm:max-w-[78%] ${
                                            isMe
                                                ? 'rounded-tr-sm bg-[#125B44] text-white'
                                                : 'rounded-tl-sm bg-[#EEF3EE] text-[#1E322B]'
                                        }`}
                                    >
                                        {msg.content}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="mt-6 mb-3 text-center">
                        <p className="text-xs text-gray-500">
                            Terbaca oleh kedua wali · Penyaring kata aktif
                        </p>
                    </div>

                    <form onSubmit={handleSendMessage} className="relative">
                        <input
                            type="text"
                            value={messageInput}
                            onChange={(e) => setMessageInput(e.target.value)}
                            disabled={!isAllWaliPresent}
                            placeholder={
                                isAllWaliPresent
                                    ? 'Tulis pesan sesuai topik...'
                                    : 'Obrolan terkunci sementara...'
                            }
                            className="w-full rounded-xl border border-gray-200 bg-white py-3.5 pr-12 pl-4 text-sm text-[#1E322B] placeholder-gray-400 transition-colors focus:border-[#125B44] focus:ring-1 focus:ring-[#125B44] focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-50"
                        />
                        <button
                            type="submit"
                            disabled={!isAllWaliPresent || !messageInput.trim()}
                            aria-label="Kirim pesan"
                            className="absolute top-1/2 right-3 -translate-y-1/2 rounded-lg p-1.5 text-[#125B44] transition-colors hover:bg-[#EAF1EC] disabled:opacity-40 disabled:hover:bg-transparent"
                        >
                            <SendHorizontal className="h-5 w-5" strokeWidth={1.8} />
                        </button>
                    </form>

                    <p className="mt-3 text-center text-[11px] text-gray-400">
                        Pesan terkunci jika salah satu wali tidak hadir.
                    </p>
                </div>

                {/* right section */}
                <div className="flex flex-col gap-4 lg:col-span-4">
                    <div className="flex items-start gap-3.5 rounded-2xl border border-[#DCE6DF] bg-[#EEF3EE] p-5">
                        <ShieldCheck
                            className="mt-0.5 h-5 w-5 shrink-0 text-[#125B44]"
                            strokeWidth={2}
                        />
                        <div>
                            <h2 className="text-sm font-semibold text-[#125B44]">
                                2/2 wali hadir · Hanya menyimak
                            </h2>
                            <p className="mt-1 text-xs text-gray-500">
                                Bpk. Hendra &amp; Bpk. Ahmad
                            </p>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-[#DCE6DF] bg-[#EEF3EE] p-5">
                        <h2 className="text-base font-bold text-[#1E322B]">
                            Pengawasan aktif · Hanya baca
                        </h2>
                        <p className="mt-2.5 text-sm leading-relaxed text-gray-600">
                            Pesan calon terkunci otomatis jika salah satu wali
                            meninggalkan ruang.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}