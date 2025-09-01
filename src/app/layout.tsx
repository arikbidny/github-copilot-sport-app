import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";

import { cn } from "@/lib/utils";

import "./globals.css";
import { QueryProvider } from "@/components/query-provider";

export const metadata: Metadata = {
  title: "Sports - GitHub Copilot Workshop",
  description: "Copilot Workshopt",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("antialiased min-h-screen font-sans")}>
        <QueryProvider>
          <Toaster />
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
