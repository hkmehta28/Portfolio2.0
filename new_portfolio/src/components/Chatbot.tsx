"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "init",
      sender: "bot",
      text: "Hi there! I'm the AI assistant for Harshit's portfolio. I can answer any questions you have about his skills, projects, and experience as a Generative AI Engineer. How can I help you today?",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const isUserScrolledUp = useRef(false);

  // New UX States
  const [showTooltip, setShowTooltip] = useState(false);
  const [availableChips, setAvailableChips] = useState([
    "What are his AI skills?",
    "Tell me about his projects",
    "Why should I hire him?"
  ]);
  const [hasOpenedOnce, setHasOpenedOnce] = useState(false);
  const [displayedInitText, setDisplayedInitText] = useState("");

  const handleScroll = () => {
    if (!messagesContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
    // If user scrolls up more than 50px from the bottom, pause auto-scroll
    isUserScrolledUp.current = scrollHeight - scrollTop - clientHeight > 50;
  };

  const scrollToBottom = () => {
    if (!isUserScrolledUp.current) {
      messagesEndRef.current?.scrollIntoView({ behavior: "auto" }); // Changed to 'auto' to prevent animation stuttering during fast streams
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [isTyping, isOpen, displayedInitText]); // Removed 'messages' to prevent jumping during streaming

  // Auto-focus input when chat opens or when bot finishes typing
  useEffect(() => {
    if (isOpen && !isTyping) {
      // Small timeout to ensure the element is enabled and animation has settled
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen, isTyping]);

  // Tooltip Appearance Timer
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasOpenedOnce && !isOpen) setShowTooltip(true);
    }, 2500);
    return () => clearTimeout(timer);
  }, [hasOpenedOnce, isOpen]);

  const hasStartedTyping = useRef(false);

  // Typewriter effect for the first message
  useEffect(() => {
    if (isOpen && !hasStartedTyping.current) {
      hasStartedTyping.current = true;
      setHasOpenedOnce(true);
      setShowTooltip(false);
      
      const fullText = messages[0].text;
      let currentIndex = 0;
      
      const typingInterval = setInterval(() => {
        if (currentIndex <= fullText.length) {
          setDisplayedInitText(fullText.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(typingInterval);
        }
      }, 30);
      
      return () => clearInterval(typingInterval);
    }
  }, [isOpen]); // Only depend on isOpen to avoid clearing the interval on other state changes

  const sendMessage = async (userText: string) => {
    if (!userText.trim()) return;
    
    setAvailableChips((prev) => prev.filter((chip) => chip !== userText.replace("✨ ", "")));
    
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: userText,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    try {
      const response = await fetch("https://portfolio2-0-q4d6.onrender.com/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: userText }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      if (!response.body) throw new Error("ReadableStream not supported in this browser.");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let text = "";

      const botMessageId = (Date.now() + 1).toString();
      let isFirstChunk = true;

      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;
        if (value) {
          const chunkValue = decoder.decode(value, { stream: true });
          text += chunkValue;
          
          if (isFirstChunk) {
            setIsTyping(false); 
            setMessages((prev) => [
              ...prev,
              { id: botMessageId, sender: "bot", text: text },
            ]);
            isFirstChunk = false;
          } else {
            setMessages((prev) => 
              prev.map((msg) => 
                msg.id === botMessageId ? { ...msg, text: text } : msg
              )
            );
          }
        }
      }

      if (isFirstChunk && done) {
        throw new Error("Empty response from server");
      }
    } catch (error) {
      console.error("Chatbot API Error:", error);
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: "I'm having trouble connecting to my brain right now. Please try again later.",
      };
      setMessages((prev) => [...prev, errorResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    await sendMessage(inputValue);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9, transformOrigin: "bottom right" }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9, transition: { duration: 0.2 } }}
            className="fixed bottom-24 right-6 w-80 md:w-96 h-[500px] max-h-[80vh] bg-[#121212]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] flex flex-col z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/50">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-emerald-400">
                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-2.625 6c-.54 0-.828.419-.936.634a1.96 1.96 0 00-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634.54 0 .828-.419.936-.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634zm4.314.634c.108-.215.395-.634.936-.634.54 0 .828.419.936.634.13.26.189.568.189.866 0 .298-.059.605-.189.866-.108.215-.395.634-.936.634-.54 0-.828-.419-.936-.634a1.96 1.96 0 01-.189-.866c0-.298.059-.605.189-.866zM12 17.25c-2.336 0-4.36-1.556-5.06-3.771a.75.75 0 011.442-.416c.496 1.71 2.053 2.687 3.618 2.687s3.122-.977 3.618-2.687a.75.75 0 011.442.416c-.7 2.215-2.724 3.771-5.06 3.771z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm">Portfolio Assistant</h3>
                  <p className="text-emerald-400 text-xs flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    Online
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Messages Area */}
            <div 
              ref={messagesContainerRef}
              onScroll={handleScroll}
              className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar"
            >
              {messages.map((msg) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={msg.id}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                      msg.sender === "user"
                        ? "bg-emerald-500 text-white rounded-br-none"
                        : "bg-white/10 text-gray-200 border border-white/5 rounded-bl-none"
                    }`}
                  >
                    {msg.id === "init" ? (displayedInitText || " ") : msg.text}
                  </div>
                </motion.div>
              ))}

              {/* Suggestions */}
              {availableChips.length > 0 && displayedInitText === messages[0].text && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-col gap-2 mt-2 items-start"
                >
                  {availableChips.map((chip, index) => (
                    <motion.button
                      key={chip}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      onClick={() => sendMessage(chip)}
                      className="text-xs bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full px-3 py-2 transition-colors text-left"
                    >
                      ✨ {chip}
                    </motion.button>
                  ))}
                </motion.div>
              )}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-white/10 border border-white/5 text-gray-400 p-3 rounded-2xl rounded-bl-none flex gap-1.5 items-center">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 border-t border-white/10 bg-black/20">
              <form onSubmit={handleSendMessage} className="relative flex items-center">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask me anything..."
                  disabled={isTyping}
                  className="w-full bg-white/5 border border-white/10 rounded-full py-2.5 pl-4 pr-12 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-emerald-500/50 transition-colors disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isTyping}
                  className="absolute right-1 w-8 h-8 flex items-center justify-center bg-emerald-500 hover:bg-emerald-400 text-white rounded-full transition-colors disabled:opacity-50 disabled:hover:bg-emerald-500"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 -mr-0.5">
                    <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                  </svg>
                </button>
              </form>
              <div className="text-center mt-2">
                 <span className="text-[10px] text-emerald-600/80 font-medium">Powered by AI & RAG</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button & Tooltip Container */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-4">
        {/* Animated Tooltip */}
        <AnimatePresence>
          {showTooltip && !isOpen && (
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 10, scale: 0.9, transition: { duration: 0.2 } }}
              className="bg-emerald-500 text-white text-sm font-medium px-4 py-2.5 rounded-xl shadow-[0_0_25px_rgba(16,185,129,0.8)] relative flex items-center justify-center cursor-pointer hover:bg-emerald-400 transition-colors border border-emerald-400"
              onClick={() => setIsOpen(true)}
            >
              <span className="relative z-10 whitespace-nowrap font-bold drop-shadow-md">
                ✨ Chat with Harshit's AI!
              </span>
              {/* Tooltip pointer */}
              <div className="absolute right-[-5px] top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-emerald-500 border-t border-r border-emerald-400 rotate-45 rounded-sm z-0"></div>
              {/* Strong glow behind tooltip */}
              <div className="absolute inset-0 rounded-xl bg-emerald-400 blur ring-1 ring-emerald-300 opacity-40 animate-pulse"></div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* FAB */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => { setIsOpen(!isOpen); setShowTooltip(false); }}
          className="w-14 h-14 bg-emerald-500 hover:bg-emerald-400 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.4)] text-white border border-emerald-400/50 transition-colors group relative"
        >
          <div className="absolute inset-0 rounded-full bg-emerald-400 blur ring-1 ring-emerald-300 opacity-0 group-hover:opacity-40 transition-opacity" />
          {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6 relative z-10 transition-transform rotate-90 duration-300">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 relative z-10 transition-transform duration-300">
              <path fillRule="evenodd" d="M4.804 21.644A6.707 6.707 0 006 21.75a6.721 6.721 0 003.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 01-.814 1.686.75.75 0 00.44 1.223zM8.25 10.875a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25zM10.875 12a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875-1.125a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25z" clipRule="evenodd" />
            </svg>
          )}
        </motion.button>
      </div>
    </>
  );
}
