import type { Metadata } from "next";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import { NextUIProvider } from "@nextui-org/react";

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
      <body className="bg-background dark">
        <NextUIProvider>
          <StoreProvider>{children}</StoreProvider>
        </NextUIProvider>
      </body>
    </html>
  );
}
