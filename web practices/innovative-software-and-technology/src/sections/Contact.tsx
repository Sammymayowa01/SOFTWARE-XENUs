"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiSend, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import { submitContact } from '@/services/api';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setErrorMsg('Name is required');
      return false;
    }
    if (!formData.email.includes('@')) {
      setErrorMsg('Valid email is required');
      return false;
    }
    if (!formData.subject.trim()) {
      setErrorMsg('Subject is required');
      return false;
    }
    if (!formData.message.trim()) {
      setErrorMsg('Message is required');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setStatus('error');
      return;
    }

    setLoading(true);
    setStatus('idle');
    setErrorMsg('');

    try {
      await submitContact({
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message
      });
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error: any) {
      setStatus('error');
      setErrorMsg(error.message || 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-32 bg-[#020817] text-white relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-20">
          
          {/* Contact Information Side */}
          <div className="lg:w-1/3">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="w-12 h-[1px] bg-blue-500"></span>
                <span className="text-blue-500 font-bold uppercase tracking-[0.3em] text-xs">Connect</span>
              </div>
              <h2 className="text-5xl font-bold mb-8 tracking-tight leading-tight">
                Let's Build Your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Next Innovation</span>
              </h2>
              <p className="text-slate-400 text-lg font-light leading-relaxed">
                Whether you're scaling an enterprise or launching a startup, our engineering expertise is ready to accelerate your digital journey.
              </p>
            </motion.div>

            <div className="space-y-8">
              {[
                { icon: <FiMail />, label: 'Email Us', value: 'info@softwarexenus.com', href: 'mailto:info@softwarexenus.com' },
                { icon: <FiPhone />, label: 'Call Us', value: '08139214035', href: 'tel:+2348139214035' },
                { icon: <FiMapPin />, label: 'Visit Us', value: 'Ikeja, Lagos', href: '#' },
              ].map((item, index) => (
                <motion.a
                  key={index}
                  href={item.href}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-6 p-6 rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-blue-500/30 transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">{item.label}</p>
                    <p className="text-slate-200 font-medium">{item.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Contact Form Side */}
          <div className="lg:w-2/3">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-10 md:p-12 rounded-[2.5rem] bg-slate-900/40 border border-slate-800 backdrop-blur-md shadow-2xl"
            >
              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 rounded-2xl bg-green-500/10 border border-green-500/30 flex items-center gap-3"
                >
                  <FiCheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                  <div>
                    <p className="text-green-400 font-bold">Success!</p>
                    <p className="text-green-300/80 text-sm">Your message has been received. We'll get back to you soon.</p>
                  </div>
                </motion.div>
              )}

              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center gap-3"
                >
                  <FiAlertCircle className="w-6 h-6 text-red-400 flex-shrink-0" />
                  <div>
                    <p className="text-red-400 font-bold">Error</p>
                    <p className="text-red-300/80 text-sm">{errorMsg}</p>
                  </div>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Full Name</label>
                    <input 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full px-6 py-4 rounded-2xl bg-slate-950/50 border border-slate-800 focus:border-blue-500/50 outline-none transition-all placeholder:text-slate-700 text-slate-200"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Email Address</label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="w-full px-6 py-4 rounded-2xl bg-slate-950/50 border border-slate-800 focus:border-blue-500/50 outline-none transition-all placeholder:text-slate-700 text-slate-200"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Project Subject</label>
                  <input 
                    type="text" 
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="E.g. Cloud Migration"
                    className="w-full px-6 py-4 rounded-2xl bg-slate-950/50 border border-slate-800 focus:border-blue-500/50 outline-none transition-all placeholder:text-slate-700 text-slate-200"
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Message</label>
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5} 
                    placeholder="Tell us about your project..."
                    className="w-full px-6 py-4 rounded-2xl bg-slate-950/50 border border-slate-800 focus:border-blue-500/50 outline-none transition-all placeholder:text-slate-700 text-slate-200 resize-none"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={loading}
                  type="submit"
                  className="w-full py-5 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-600/50 text-white font-bold rounded-2xl shadow-[0_10px_30px_rgba(37,99,235,0.3)] transition-all flex items-center justify-center gap-3 group disabled:cursor-not-allowed"
                >
                  {loading ? 'Sending...' : 'Send Inquiry'}
                  <FiSend className={`${loading ? '' : 'group-hover:translate-x-1 group-hover:-translate-y-1'} transition-transform`} />
                </motion.button>
              </form>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
