import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Chat } from '@google/genai';
import { startNyraChat } from '../services/geminiService';
import { ChatMessage } from '../types';
import { ChatIcon, CloseIcon, SendIcon } from './icons';

const NyraChat: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [chat, setChat] = useState<Chat | null>(null);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen) {
            const newChat = startNyraChat();
            setChat(newChat);
            setMessages([
                { role: 'model', text: "Hey there, stardust! ✨ I'm Nyra. What cosmic look are we creating today?" }
            ]);
        } else {
            setChat(null);
            setMessages([]);
        }
    }, [isOpen]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSendMessage = useCallback(async () => {
        if (!userInput.trim() || !chat || isLoading) return;

        const newUserMessage: ChatMessage = { role: 'user', text: userInput };
        setMessages(prev => [...prev, newUserMessage]);
        setUserInput('');
        setIsLoading(true);

        try {
            const response = await chat.sendMessage({ message: userInput });
            const modelMessage: ChatMessage = { role: 'model', text: response.text };
            setMessages(prev => [...prev, modelMessage]);
        } catch (error) {
            console.error("Failed to send message:", error);
            const errorMessage: ChatMessage = { role: 'model', text: "Oops! My circuits are a bit fuzzy. 😵 Try again?" };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    }, [userInput, chat, isLoading]);

    return (
        <>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 w-16 h-16 bg-pink-600 rounded-full text-white flex items-center justify-center transform transition-transform hover:scale-110 z-50 animate-pulse-glow"
                aria-label="Toggle Nyra Chat"
            >
                {isOpen ? <CloseIcon className="w-8 h-8"/> : <ChatIcon className="w-8 h-8"/>}
            </button>

            {isOpen && (
                <div className="fixed bottom-24 right-6 w-full max-w-sm h-[60vh] bg-[#1a1a1a] border border-pink-500/30 rounded-xl shadow-2xl shadow-pink-900/40 flex flex-col z-50 overflow-hidden animate-slide-up">
                    <div className="flex items-center justify-between p-3 border-b border-pink-500/20">
                        <h3 className="text-lg font-bold text-pink-400 animate-glow">Chat with Nyra</h3>
                    </div>

                    <div className="flex-grow p-4 overflow-y-auto space-y-4">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] p-3 rounded-lg ${msg.role === 'user' ? 'bg-pink-600 text-white' : 'bg-gray-700 text-gray-200'}`}>
                                    <p className="text-sm">{msg.text}</p>
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                               <div className="bg-gray-700 text-gray-200 p-3 rounded-lg">
                                 <div className="flex items-center space-x-1">
                                    <span className="w-2 h-2 bg-pink-400 rounded-full animate-bounce delay-75"></span>
                                    <span className="w-2 h-2 bg-pink-400 rounded-full animate-bounce delay-150"></span>
                                    <span className="w-2 h-2 bg-pink-400 rounded-full animate-bounce delay-300"></span>
                                 </div>
                               </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="p-3 border-t border-pink-500/20">
                        <div className="flex items-center space-x-2">
                            <input
                                type="text"
                                value={userInput}
                                onChange={(e) => setUserInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                placeholder="Ask about style, size..."
                                className="flex-grow bg-black/30 border border-gray-600 rounded-full px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
                            />
                            <button onClick={handleSendMessage} disabled={isLoading} className="bg-pink-600 text-white p-2.5 rounded-full hover:bg-pink-500 disabled:bg-gray-600 transition-colors">
                                <SendIcon className="w-5 h-5"/>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default NyraChat;