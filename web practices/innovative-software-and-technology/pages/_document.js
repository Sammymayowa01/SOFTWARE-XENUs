import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="description" content="Software Xenus delivers bespoke software solutions, mobile apps, cloud infrastructure, and digital transformation services for enterprises worldwide." />
          <meta name="keywords" content="software development, cloud solutions, mobile apps, digital transformation, custom software, DevOps" />
          <meta property="og:title" content="Software Xenus | Custom Software & Cloud Solutions" />
          <meta property="og:description" content="Enterprise software engineering and digital transformation services." />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://softwarexenus.com" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Software Xenus" />
          <meta name="twitter:description" content="Enterprise software engineering and digital transformation services." />
        </Head>
        <body className="relative bg-[#0A1A2F] min-h-screen text-white antialiased">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;