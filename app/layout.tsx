import { Metadata } from 'next';

import './globals.css';

import { Inter } from 'next/font/google';
import { ThemeProvider } from 'providers/theme-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: `ScholarHive | School Management`,
  description: `ScholarHive is an open-source school management platform designed to streamline class management, enhance collaboration, and track student performance with ease.`,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-zinc-50 dark:bg-[#111318]`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <main className="min-h-screen">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
