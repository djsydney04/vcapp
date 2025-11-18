import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Deal Desk • VC pipeline",
  description: "Lightweight HubSpot-style CRM for angels and VCs to track dealflow.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
