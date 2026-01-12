import type { Metadata } from "next";
import { Geist, Geist_Mono, Google_Sans_Code } from "next/font/google";
import "./styles/index.scss";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  fallback: ["sans-serif"],
  preload: true,
});

const googleSansCode = Google_Sans_Code({
  variable: "--font-google-sans-code",
  subsets: ["latin"],
  fallback: ["sans-serif"],
  preload: true,
});

export const metadata: Metadata = {
  title: "Quang Portfolio",
  description: "Quang Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${googleSansCode.variable}`}
      >
        <main>{children}</main>
      </body>
    </html>
  );
}
