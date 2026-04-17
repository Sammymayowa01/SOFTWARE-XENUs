import Head from 'next/head';
import Link from 'next/link';

export default function Custom404() {
  return (
    <div className="min-h-screen bg-[#020817] text-white flex flex-col items-center justify-center px-6 py-12">
      <Head>
        <title>404 - Page Not Found | Software Xenus</title>
      </Head>
      <h1 className="text-7xl font-black mb-6">404</h1>
      <p className="text-xl text-slate-300 mb-8 text-center max-w-2xl">
        The requested page could not be found. If you believe this is an error, please return home.
      </p>
      <Link href="/" className="rounded-2xl bg-blue-600 px-8 py-4 font-semibold text-white hover:bg-blue-500 transition-colors">
        Go to Home
      </Link>
    </div>
  );
}