import type { Metadata } from "next";
import "./globals.css";
import { Cairo } from "next/font/google";
import { NextIntlClientProvider, useMessages } from "next-intl";

export const metadata: Metadata = {
  title: "shipping tracker",
  description: "Generated by create next app",
};

const cairo = Cairo({ subsets: ["arabic"] });
export default function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = useMessages();
  return (
    <html lang={locale}>
      <body className={cairo.className}>
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
      </body>
    </html>
  );
}