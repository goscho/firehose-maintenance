import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import PageHeader from "@/app/_components/page-header";
import { Toaster } from "sonner";

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
        <Toaster
          position={"top-right"}
          richColors={true}
          theme={"light"}
          toastOptions={{
            classNames: {
              title: "!text-xl",
              description: "!text-base",
            },
          }}
        />
      </body>
    </html>
  );
}
