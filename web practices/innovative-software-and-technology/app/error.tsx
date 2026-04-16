"use client";

import Link from 'next/link';

export default function Error() {
  return (
    <main className="min-h-screen bg-[#020817] text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-6xl font-black mb-6">500</h1>
      <p className="text-xl text-slate-300 mb-8 text-center">
        Something went wrong on our end. Please try again or head back to the homepage.
      </p>
      <Link
        href="/"
        className="px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 transition-colors"
      >
        Return home
      </Link>
    </main>
  );
}
