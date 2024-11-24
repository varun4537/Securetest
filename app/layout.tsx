import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';

// Initialize Inter font
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'SecurityCheck - Online Security Assessment',
  description:
    'Free, instant security assessment to help protect your digital life. Check your connection security, privacy settings, and more.',
  keywords:
    'security check, online security, privacy, cybersecurity, network security',
  authors: [{ name: 'SecurityCheck' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://securitycheck.com',
    title: 'SecurityCheck - Online Security Assessment',
    description:
      'Free, instant security assessment to help protect your digital life.',
    siteName: 'SecurityCheck',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="min-h-screen bg-background antialiased">{children}</body>
    </html>
  );
}
