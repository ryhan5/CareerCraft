'use client';

import { useState, useRef, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { createCareerPrompt, promptTypes } from '../utils/prompts';
import Header from '../dashboard/Header';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { 
  PaperAirplaneIcon, 
  ArrowPathIcon,
  LightBulbIcon,
  ChatBubbleLeftRightIcon,
  SparklesIcon,
  AcademicCapIcon,
  UserGroupIcon,
  BookmarkIcon,
  ShareIcon,
  DocumentDuplicateIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

// Action Buttons Component
const ActionButtons = ({ message }) => {
  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      showToastMessage('Copied to clipboard!');
    } catch (err) {
      showToastMessage('Failed to copy text');
    }
  };

  return (
    <>
      <button
        onClick={() => copyToClipboard(message.content)}
        className="p-1 hover:bg-gray-100 rounded transition-colors"
        title="Copy to clipboard"
      >
        <DocumentDuplicateIcon className="w-4 h-4 text-gray-500" />
      </button>
      <button
        onClick={() => saveResponse(message)}
        className="p-1 hover:bg-gray-100 rounded transition-colors"
        title="Save response"
      >
        <BookmarkIcon className="w-4 h-4 text-gray-500" />
      </button>
      <button
        onClick={() => shareResponse(message.content)}
        className="p-1 hover:bg-gray-100 rounded transition-colors"
        title="Share"
      >
        <ShareIcon className="w-4 h-4 text-gray-500" />
      </button>
    </>
  );
};

export default function CareerInsights() {
  const { data: session } = useSession();
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [savedResponses, setSavedResponses] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const chatEndRef = useRef(null);
  const textareaRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  const categories = [
    { id: 'all', name: 'All Topics', icon: SparklesIcon },
    { id: 'skills', name: 'Skills & Learning', icon: AcademicCapIcon },
    { id: 'career', name: 'Career Growth', icon: UserGroupIcon },
    { id: 'interview', name: 'Interviews', icon: ChatBubbleLeftRightIcon },
    { id: 'saved', name: 'Saved', icon: BookmarkIcon },
  ];

  // Add the new helper functions
  const determineQuestionType = (input) => {
    const keywords = {
      skills: ['skill', 'learn', 'master', 'expertise'],
      salary: ['salary', 'compensation', 'negotiate', 'pay'],
      interview: ['interview', 'hiring', 'question', 'prepare']
    };

    for (const [type, words] of Object.entries(keywords)) {
      if (words.some(word => input.toLowerCase().includes(word))) {
        return type;
      }
    }
    return 'general';
  };

  const formatResponse = (text) => {
    return text.split('###').map(section => {
      const [title, ...content] = section.trim().split('\n');
      return {
        title: title.trim(),
        content: content.join('\n').trim()
      };
    }).filter(section => section.title && section.content);
  };

  // Update the generateResponse function
  const generateResponse = async () => {
    if (!prompt.trim()) return;

    setIsLoading(true);
    try {
      const userMessage = {
        id: Date.now(),
        role: 'user',
        content: prompt,
        timestamp: new Date().toISOString()
      };
      setChatHistory(prev => [...prev, userMessage]);

      const questionType = determineQuestionType(prompt);
      let finalPrompt = questionType === 'general' 
        ? createCareerPrompt(prompt)
        : promptTypes[questionType](prompt);

      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(finalPrompt);
      const response = await result.response;
      const text = response.text();

      const aiMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: text,
        timestamp: new Date().toISOString()
      };
      setChatHistory(prev => [...prev, aiMessage]);
      
      setPrompt('');
    } catch (error) {
      console.error('Error:', error);
      setChatHistory(prev => [...prev, {
        id: Date.now() + 1,
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date().toISOString()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const suggestedPrompts = {
    all: [
      "What are the most in-demand tech skills for 2024?",
      "How to create a strong tech portfolio?",
    ],
    skills: [
      "What learning path should I follow to become a full-stack developer?",
      "Which cloud certifications are most valuable?",
    ],
    career: [
      "How to transition from development to tech leadership?",
      "Tips for negotiating a tech salary?",
    ],
    interview: [
      "Common system design interview questions",
      "How to prepare for tech behavioral interviews?",
    ]
  };

  // Update the ChatMessage component
  const ChatMessage = ({ message }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
    >
      <div className={`max-w-[80%] rounded-xl p-4 ${
        message.role === 'user'
          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
          : 'bg-white text-gray-800 border border-gray-200 shadow-md'
      }`}>
        {message.role === 'assistant' ? (
          <div className="space-y-4">
            {formatResponse(message.content).map((section, index) => (
              <div key={index} className="space-y-2">
                <h3 className="font-bold text-lg">{section.title}</h3>
                <ReactMarkdown 
                  className="prose prose-sm max-w-none"
                  components={{
                    p: ({node, ...props}) => <p className="mb-2" {...props} />,
                    ul: ({node, ...props}) => <ul className="list-disc ml-4 mb-2" {...props} />,
                    li: ({node, ...props}) => <li className="mb-1" {...props} />
                  }}
                >
                  {section.content}
                </ReactMarkdown>
              </div>
            ))}
          </div>
        ) : (
          <p>{message.content}</p>
        )}
        
        <div className="flex items-center justify-between mt-4 pt-2 border-t border-gray-200/10">
          <span className={`text-xs ${message.role === 'user' ? 'text-blue-100' : 'text-gray-400'}`}>
            {new Date(message.timestamp).toLocaleTimeString()}
          </span>
          
          {message.role === 'assistant' && (
            <div className="flex space-x-2">
              <ActionButtons message={message} />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-purple-50">
      <Header />
      
      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-20 right-4 bg-gray-800 text-white px-6 py-3 rounded-lg shadow-lg z-50"
          >
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        {/* Enhanced Header Section */}
        <div className="text-center mb-12">
          <div className="inline-block">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              AI Career Advisor
            </h1>
            <div className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
          </div>
          <p className="text-xl text-blue-800 max-w-2xl mx-auto mt-4">
            Get personalized career guidance powered by advanced AI
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chat Section */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl p-6 h-[600px] flex flex-col border border-gray-100">
            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto mb-4 space-y-4 scroll-smooth">
              {chatHistory.length === 0 ? (
                <div className="text-center py-12">
                  <div className="bg-blue-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <ChatBubbleLeftRightIcon className="w-8 h-8 text-blue-500" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Start Your Career Journey</h3>
                  <p className="text-gray-600">Ask anything about your career path or skills</p>
                </div>
              ) : (
                chatHistory.map((message) => (
                  <ChatMessage key={message.id} message={message} />
                ))
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Enhanced Input Area */}
            <div className="border-t pt-4">
              <div className="relative bg-white rounded-xl shadow-sm">
                <textarea
                  ref={textareaRef}
                  value={prompt}
                  onChange={(e) => {
                    setPrompt(e.target.value);
                    // Auto-resize
                    e.target.style.height = 'inherit';
                    e.target.style.height = `${e.target.scrollHeight}px`;
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      generateResponse();
                    }
                  }}
                  placeholder="Type your career question... (Press Enter to send, Shift + Enter for new line)"
                  className="w-full p-4 pr-24 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 resize-none min-h-[80px] max-h-[200px] text-gray-800 placeholder-gray-400"
                  style={{ overflow: 'hidden' }}
                />
                
                {/* Character count */}
                <div className="absolute bottom-2 left-4 text-xs text-gray-400">
                  {prompt.length} / 1000
                </div>

                {/* Enhanced Button Area */}
                <div className="absolute bottom-2 right-2 flex items-center space-x-2">
                  {prompt.trim().length > 0 && (
                    <button
                      onClick={() => setPrompt('')}
                      className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                      title="Clear message"
                    >
                      <XMarkIcon className="w-5 h-5" />
                    </button>
                  )}
                  
                  <button
                    onClick={generateResponse}
                    disabled={isLoading || !prompt.trim()}
                    className={`p-2 rounded-lg flex items-center space-x-2 ${
                      isLoading || !prompt.trim()
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    } transition-colors`}
                    title={isLoading ? 'Processing...' : 'Send message'}
                  >
                    {isLoading ? (
                      <>
                        <ArrowPathIcon className="w-5 h-5 animate-spin" />
                        <span className="text-sm">Processing...</span>
                      </>
                    ) : (
                      <>
                        <PaperAirplaneIcon className="w-5 h-5" />
                        <span className="text-sm">Send</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Typing Indicator */}
                {isLoading && (
                  <div className="absolute -top-8 left-4 flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                      <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                      <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                    </div>
                    <span className="text-sm text-blue-600">AI is thinking...</span>
                  </div>
                )}
              </div>

              {/* Helper Text */}
              <div className="mt-2 flex items-center justify-between text-xs text-gray-400">
                <span>Shift + Enter for new line</span>
                <span>{isLoading ? 'Processing your request...' : 'Enter to send'}</span>
              </div>
            </div>
          </div>

          {/* Enhanced Sidebar */}
          <div className="space-y-6">
            {/* Category Selector */}
            <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-100">
              <div className="grid grid-cols-3 gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`py-2 px-3 rounded-lg text-sm font-medium transition-all flex flex-col items-center ${
                      selectedCategory === category.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <category.icon className="w-4 h-4 mb-1" />
                    <span>{category.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Suggested Prompts */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
                <LightBulbIcon className="w-5 h-5 mr-2 text-blue-600" />
                Suggested Questions
              </h3>
              <div className="space-y-3">
                {(suggestedPrompts[selectedCategory] || []).map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => setPrompt(suggestion)}
                    className="w-full text-left p-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-800 transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>

            {/* Pro Tips Section */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg p-6 text-white">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <SparklesIcon className="w-5 h-5 mr-2" />
                Pro Tips
              </h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                  Be specific about your goals and experience
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                  Ask about specific technologies or roles
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                  Include your target companies or industries
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

