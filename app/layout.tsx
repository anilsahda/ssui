import type { Metadata } from "next";

export const metadata: Metadata = { title: "Multi Layout", description: "Main and Admin layouts" };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}