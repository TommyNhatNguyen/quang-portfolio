import type { Metadata } from "next";
import { Geist, Geist_Mono, Google_Sans_Code } from "next/font/google";
import "./styles/index.scss";

const geistSans = Geist({
  variable: "--ff-gs",
  subsets: ["latin"],
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--ff-gm",
  subsets: ["latin"],
  fallback: ["sans-serif"],
  preload: true,
});

const googleSansCode = Google_Sans_Code({
  variable: "--ff-gc",
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
