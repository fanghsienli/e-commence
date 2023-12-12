import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import BreadCrumb from "../components/BreadCrumb";
import NavHeader from "../components/NavHeader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "e commance",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavHeader />
        {children}
      </body>
    </html>
  );
}
