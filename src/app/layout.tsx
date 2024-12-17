import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import PageHeader from "@/app/_components/page-header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Schlauchpflege",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className={inter.className}>
        <div className="min-h-screen">
          <PageHeader />
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
