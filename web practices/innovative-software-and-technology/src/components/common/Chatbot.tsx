"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { sendMessage } from '@/services/api';

interface Message {
  id: string;
  type: 'bot' | 'user';
  text: string;
  options?: string[];
  form?: boolean;
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      text: "Welcome to Software Xenus. How can I assist you today?",
      options: ["Our Services", "Contact Human Support", "About Us"]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStep, setFormStep] = useState<null | 'name' | 'email' | 'message' | 'complete'>(null);
  const [sessionId] = useState(() => Math.random().toString(36).substr(2, 9));
  
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const addMessage = (msg: Omit<Message, 'id'>) => {
    const newMsg = { ...msg, id: Math.random().toString(36).substr(2, 9) };
    setMessages(prev => [...prev, newMsg]);
  };

  const handleBotResponse = async (text: string) => {
    setIsTyping(true);
    try {
      const response = await sendMessage({
        message: text,
        sessionId,
        name: formData.name,
        email: formData.email
      });
      
      if (response.success) {
        addMessage({ 
          type: 'bot', 
          text: response.data.text, 
          options: response.data.options 
        });
      } else {
        addMessage({ type: 'bot', text: "I'm having some trouble connecting. Please try again later." });
      }
    } catch (error) {
      addMessage({ type: 'bot', text: "Connection error. Please check your internet." });
    } finally {
      setIsTyping(false);
    }
  };

  const handleOptionClick = (option: string) => {
    addMessage({ type: 'user', text: option });

    if (option === "Contact Human Support") {
      addMessage({ type: 'bot', text: "Please provide your details so our team can get in touch with you." });
      setFormStep('name');
    } else if (option === "Exit Chat") {
        setIsOpen(false);
    } else {
      handleBotResponse(option);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    if (formStep === 'name') {
      setFormData({ ...formData, name: inputValue });
      addMessage({ type: 'user', text: inputValue });
      setInputValue('');
      setFormStep('email');
      addMessage({ type: 'bot', text: `Thanks ${inputValue}! Now, what is your email address?` });
    } else if (formStep === 'email') {
      if (!inputValue.includes('@')) {
        addMessage({ type: 'bot', text: "Please enter a valid email address." });
        return;
      }
      setFormData({ ...formData, email: inputValue });
      addMessage({ type: 'user', text: inputValue });
      setInputValue('');
      setFormStep('message');
      addMessage({ type: 'bot', text: "Great. Finally, please describe what you need help with." });
    } else if (formStep === 'message') {
      const finalMessage = inputValue;
      setFormData({ ...formData, message: finalMessage });
      addMessage({ type: 'user', text: finalMessage });
      setInputValue('');
      setFormStep('complete');
      
      setIsTyping(true);
      try {
        await sendMessage({
          message: `FORM_SUBMISSION: ${finalMessage}`,
          sessionId,
          name: formData.name,
          email: formData.email
        });
        addMessage({ 
          type: 'bot', 
          text: "Thank you! Your information has been received. A support representative will contact you shortly.", 
          options: ["Back to Start", "Exit Chat"] 
        });
      } catch (error) {
        addMessage({ type: 'bot', text: "Sent, but I couldn't log it. We'll get back to you anyway!" });
      } finally {
        setIsTyping(false);
      }
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] font-sans">
      {/* Floating Icon */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-colors duration-300",
          isOpen ? "bg-white text-navy-blue" : "bg-electric-blue text-white"
        )}
      >
        {isOpen ? <X size={30} /> : <MessageSquare size={30} />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-20 right-0 w-[350px] md:w-[400px] h-[550px] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-gray-100"
          >
            {/* Header */}
            <div className="bg-navy-blue p-6 text-white flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-electric-blue flex items-center justify-center">
                <MessageCircle size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg leading-none">Support Bot</h3>
                <p className="text-xs text-white/60 mt-1 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  Online | Typically replies instantly
                </p>
              </div>
            </div>

            {/* Messages Area */}
            <div 
              ref={scrollRef}
              className="flex-grow p-6 overflow-y-auto space-y-4 bg-white"
            >
              {messages.map((msg) => (
                <div key={msg.id} className={cn(
                  "flex flex-col",
                  msg.type === 'user' ? "items-end" : "items-start"
                )}>
                  <div className={cn(
                    "max-w-[85%] p-4 rounded-2xl text-[15px] leading-relaxed font-medium",
                    msg.type === 'user' 
                      ? "bg-electric-blue text-white shadow-md rounded-tr-none" 
                      : "bg-slate-100 text-slate-900 shadow-sm border border-slate-200 rounded-tl-none"
                  )}>
                    {msg.text}
                  </div>
                  
                  {/* Options */}
                  {msg.options && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {msg.options.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => handleOptionClick(opt)}
                          className="px-4 py-2 rounded-full border border-electric-blue/30 bg-white text-electric-blue text-xs font-semibold hover:bg-electric-blue hover:text-white transition-all duration-200 shadow-sm"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              {isTyping && (
                <div className="flex items-start">
                  <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-gray-100 flex gap-1">
                    <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-gray-100">
              {formStep && formStep !== 'complete' ? (
                <form onSubmit={handleFormSubmit} className="flex items-center gap-2">
                  <input
                    type={formStep === 'email' ? 'email' : 'text'}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder={`Enter your ${formStep}...`}
                    className="flex-grow px-4 py-3 bg-white border-2 border-slate-200 rounded-xl text-[15px] text-slate-900 font-medium focus:outline-none focus:border-electric-blue transition-colors placeholder:text-slate-400"
                    autoFocus
                  />
                  <button 
                    type="submit"
                    className="p-3 bg-electric-blue text-white rounded-xl hover:bg-navy-blue transition-colors shadow-lg"
                  >
                    <Send size={20} />
                  </button>
                </form>
              ) : (
                <div className="text-center py-2">
                  <p className="text-sm text-slate-600 font-bold tracking-wide">Please select an option above to continue</p>
                </div>
              )}
            </div>
            
            <div className="bg-gray-50 px-6 py-4 text-[11px] text-center text-slate-500 uppercase tracking-[0.2em] font-bold border-t border-gray-200">
              Software Xenus
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Chatbot;
