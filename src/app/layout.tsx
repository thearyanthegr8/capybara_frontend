import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/root/globals.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Capybara",
  description: "Portal to secure your prescription with our technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
