import './globals.css';
import GradientParticles from '@/components/animations/GradientParticles';
import dynamic from 'next/dynamic';
import type { Metadata } from 'next';

// Dynamic import to avoid SSR issues
const WhatsAppButton = dynamic(
  () => import('@/components/common/WhatsAppButton'),
  { ssr: false }
);

export const metadata: Metadata = {
  title: 'Software Xenus | Custom Software & Cloud Solutions',
  description:
    'Software Xenus delivers bespoke software solutions, mobile apps, cloud infrastructure, and digital transformation services for enterprises worldwide.',
  keywords:
    'software development, cloud solutions, mobile apps, digital transformation, custom software, DevOps',
  authors: [{ name: 'Software Xenus' }],
  openGraph: {
    title: 'Software Xenus | Custom Software & Cloud Solutions',
    description: 'Enterprise software engineering and digital transformation services.',
    type: 'website',
    url: 'https://softwarexenus.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Software Xenus',
    description: 'Enterprise software engineering and digital transformation services.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="relative bg-[#0A1A2F] min-h-screen text-white antialiased">

        {/* 🌌 Background animation */}
        <div className="fixed inset-0 -z-10">
          <GradientParticles />
        </div>

        {/* Main content */}
        <main className="relative z-10">
          {children}
        </main>

        {/* Floating WhatsApp button */}
        <WhatsAppButton />
      </body>
    </html>
  );
}