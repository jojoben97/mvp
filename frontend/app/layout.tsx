import type { Metadata } from "next";
import "./globals.css";
import { AppShell } from "../components/layout/app-shell";

export const metadata: Metadata = {
  title: "Viral Engine control center",
  description:
    "Sponsor and creator dashboards for orchestrating viral campaigns in MVPX.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
