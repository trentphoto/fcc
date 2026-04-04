import type { Metadata } from "next";
import { Geist } from "next/font/google";
import NetlifyFormsBootstrap from "@/components/NetlifyFormsBootstrap";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Mission Church | Welcome Home",
  description:
    "The Mission Church — a welcoming non-denominational church serving Northern Virginia and the DMV. Join us for worship, community, and faith.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} antialiased`}>
        <NetlifyFormsBootstrap />
        {children}
      </body>
    </html>
  );
}
