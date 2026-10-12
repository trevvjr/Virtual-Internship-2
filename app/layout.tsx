import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Summarist Home Page",
  description: "Understand books in a few minutes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
