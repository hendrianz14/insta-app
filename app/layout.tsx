import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";

const fontSans = Geist({ subsets: ["latin"], variable: "--font-sans" });
const fontMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  metadataBase: new URL("https://example.com"),
  title: {
    default: "Insta App",
    template: "%s • Insta App",
  },
  description:
    "A full-stack starter for building subscription SaaS products with Next.js 14, Supabase, Stripe, and shadcn/ui.",
  keywords: [
    "Next.js",
    "Supabase",
    "Stripe",
    "SaaS starter",
    "Tailwind CSS",
  ],
  openGraph: {
    title: "Insta App",
    description:
      "Launch your SaaS faster with authentication, dashboards, and billing flows pre-wired.",
    url: "https://example.com",
    siteName: "Insta App",
    images: [
      {
        url: "https://example.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Insta App preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Insta App",
    description:
      "Launch your SaaS faster with authentication, dashboards, and billing flows pre-wired.",
    images: ["https://example.com/og-image.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("font-sans", fontSans.variable, fontMono.variable)}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="min-h-screen bg-background text-foreground">
            {children}
            <Toaster />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
