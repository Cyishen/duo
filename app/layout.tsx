import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs'
import { zhCN } from "@clerk/localizations";
import { zhTW } from "@/lib/zh-TW";

const font = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Duo clone",
  description: "Duo clone App",
  icons: {
    icon: "/mascot.svg"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider localization={zhTW}>
      <html lang="en">
        <body className={font.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
