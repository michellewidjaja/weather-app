import type { Metadata } from "next";
import { DM_Sans, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-bricolage-grotesque",
});

export const metadata: Metadata = {
  title: "Weather Now – Current & 7-Day Forecast",
  description: "Check the latest weather in your city with hourly and daily forecasts, temperature, precipitation, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${bricolageGrotesque.variable}`}>{children}</body>
    </html>
  );
}
