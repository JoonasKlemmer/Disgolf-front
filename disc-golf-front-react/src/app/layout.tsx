import type { Metadata } from "next";
import 'bootstrap/dist/css/bootstrap.css';
import { Inter } from "next/font/google";
import "./globals.css";
import BootstrapActivation from '@/components/BootstrapActivation';
import Footer from "@/components/nav/Footer";
import Header from "@/components/nav/Header";
import AppState from "@/components/AppState";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Discgolf",
    description: "Joonas Klemmer",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <AppState>
                    <Header />
                    <div className="container">
                        <main role="main" className="pb-3">
                            {children}
                        </main>
                    </div>
                    <Footer />
                    <BootstrapActivation />
                </AppState>
            </body>
        </html>
    );
}