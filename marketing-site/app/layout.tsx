import type { Metadata } from 'next';
import { JetBrains_Mono, Plus_Jakarta_Sans, Space_Grotesk } from 'next/font/google';
import { AppChrome } from '../components/AppChrome';
import './globals.css';

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '500', '600', '700', '800'],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['500', '600', '700'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://decentralized.host'),
  title: {
    default: 'Decentralized.Host — Open-Source Decentralized Hosting & Compute',
    template: '%s',
  },
  description:
    'Deploy applications from Git or CLI across independently operated compute nodes with Decentralized.Host, an open-source self-hosted PaaS and distributed compute mesh.',
  keywords: [
    'decentralized hosting',
    'self-hosted PaaS',
    'distributed compute',
    'open-source hosting',
    'Docker deployment',
    'Git deploy',
    'DePIN compute',
  ],
  other: {
    'theme-color': '#050505',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`dark ${jetbrainsMono.variable} ${plusJakartaSans.variable} ${spaceGrotesk.variable}`}
    >
      <body className="bg-[#050505] text-[#e0e0e0] antialiased selection:bg-[#00FF41]/30 selection:text-[#00FF41]">
        <AppChrome>{children}</AppChrome>
      </body>
    </html>
  );
}
