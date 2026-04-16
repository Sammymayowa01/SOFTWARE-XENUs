"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiCheck, FiLoader } from 'react-icons/fi';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');

    try {
      // Simulate API call for demonstration, can be replaced with actual Mailchimp/SendGrid API
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus('success');
        setMessage('Subscription successful! Welcome to Nexus Insight.');
        setEmail('');
      } else {
        throw new Error('Subscription failed.');
      }
    } catch (err) {
      setStatus('error');
      setMessage('Something went wrong. Please try again later.');
    }
  };

  return (
    <section className="py-24 bg-[#020817] relative overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto p-10 md:p-16 rounded-[3rem] bg-slate-900/40 border border-slate-800 backdrop-blur-md shadow-2xl text-center"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-500/10 text-blue-400 mb-8 border border-blue-500/20">
            <FiMail size={32} />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white tracking-tight">
            Nexus <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Insights</span>
          </h2>
          
          <p className="text-slate-400 text-lg font-light mb-10 max-w-xl mx-auto leading-relaxed">
            Stay ahead of the curve. Subscribe to receive our curated insights on enterprise architecture, cloud strategy, and bespoke software engineering.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <div className="flex-grow relative group">
              <input
                type="email"
                required
                placeholder="Enter your professional email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === 'loading' || status === 'success'}
                className="w-full px-6 py-4 rounded-2xl bg-slate-950/50 border border-slate-800 focus:border-blue-500/50 outline-none transition-all placeholder:text-slate-700 text-slate-200"
              />
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              className={`px-8 py-4 rounded-2xl font-bold text-sm tracking-widest uppercase transition-all flex items-center justify-center gap-2 ${
                status === 'success' 
                  ? "bg-green-600 text-white cursor-default" 
                  : "bg-blue-600 hover:bg-blue-500 text-white shadow-[0_10px_30px_rgba(37,99,235,0.3)]"
              }`}
            >
              {status === 'loading' ? (
                <FiLoader className="animate-spin" />
              ) : status === 'success' ? (
                <>
                  <FiCheck /> Subscribed
                </>
              ) : (
                'Join Nexus'
              )}
            </motion.button>
          </form>

          {message && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-6 text-sm font-medium ${status === 'success' ? 'text-green-400' : 'text-red-400'}`}
            >
              {message}
            </motion.p>
          )}

          <p className="mt-8 text-slate-600 text-[10px] uppercase tracking-widest font-bold">
            NO SPAM. ONLY PURE ENGINEERING INSIGHTS.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;
