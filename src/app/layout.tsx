import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Task Generator",
    description: "Generate user stories and engineering tasks with AI",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${outfit.className} bg-slate-950 text-slate-100 min-h-screen selection:bg-indigo-500/30`}>
                <div className="fixed inset-0 -z-10 h-full w-full bg-slate-950 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
                <div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 z-50"></div>

                <nav className="flex justify-between items-center p-6 max-w-5xl mx-auto">
                    <Link href="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400 hover:opacity-80 transition-opacity">
                        TaskGen
                    </Link>
                    <div className="flex gap-6 text-sm font-medium text-slate-400">
                        <Link href="/" className="hover:text-white transition-colors">Generate</Link>
                        <Link href="/history" className="hover:text-white transition-colors">History</Link>
                        <Link href="/status" className="hover:text-white transition-colors">Status</Link>
                    </div>
                </nav>

                <main className="max-w-5xl mx-auto p-6 min-h-[calc(100vh-100px)]">
                    {children}
                </main>

                <footer className="tex-center p-6 text-slate-600 text-sm text-center">
                    <p>Powered by Google Gemini • Built with Next.js</p>
                </footer>
            </body>
        </html>
    );
}
