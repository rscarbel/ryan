import './globals.css'
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ryan Scarbel",
  description: "Home of the coolest software nerd on the internet.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
