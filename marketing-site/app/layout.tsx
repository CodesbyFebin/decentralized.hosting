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
    default: 'Decentralized.Host — Self-Hosted Infrastructure Where Hosts Stay Sovereign',
    template: '%s',
  },
  description:
    'Self-hosted infrastructure in Go: a replicated control plane proposes signed work, and every host admits it under its own policy and reports what it observed. Not yet production-validated.',
  keywords: [
    'self-hosted infrastructure',
    'host sovereignty',
    'Raft control plane',
    'WireGuard mesh',
    'signed observations',
    'decentralized hosting',
    'Go',
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
