import '../src/globals.css';
import GradientParticles from '../src/components/animations/GradientParticles';
import dynamic from 'next/dynamic';

// Dynamic import to avoid SSR issues
const WhatsAppButton = dynamic(
  () => import('../src/components/common/WhatsAppButton'),
  { ssr: false }
);

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      {/* 🌌 Background animation */}
      <div className="fixed inset-0 -z-10">
        <GradientParticles />
      </div>

      {/* Main content */}
      <main className="relative z-10">
        <Component {...pageProps} />
      </main>

      {/* Floating WhatsApp button */}
      <WhatsAppButton />
    </>
  );
}