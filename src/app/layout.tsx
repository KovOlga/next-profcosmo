import type { Metadata } from "next";
import "./globals.scss";
import StoreProvider from "./StoreProvider";

export const metadata: Metadata = {
  title: "Profcosmo",
  description: "profcosmo test task",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="dark bg-background">
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
