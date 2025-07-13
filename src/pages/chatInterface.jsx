import React, { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import { Transition } from "@headlessui/react";
import Header from "../components/header";

export default function ChatInterface() {
    const [messages, setMessages] = useState([
        { role: "assistant", content: "Hello 👋 How can I help you today?" },
    ]);
    const inputRef = useRef(null);
    const bottomRef = useRef(null);

    const [input, setInput] = useState("");

    const handleSend = () => {
        const text = input.trim();
        if (!text) return;
        setMessages([...messages, { role: "user", content: text }]);
        setInput("");
        if (inputRef.current) {
            inputRef.current.innerText = "";
            inputRef.current.style.height = "auto";
        }
    };

    // Auto scroll to bottom when messages change
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleInput = (e) => {
        setInput(e.target.innerText);

        // Limit height to ~6 lines
        if (inputRef.current) {
            inputRef.current.style.height = "auto";
            inputRef.current.style.overflowY = "hidden";
            inputRef.current.style.height = `${Math.min(
                inputRef.current.scrollHeight,
                6 * 24
            )}px`;
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="flex flex-col h-screen bg-white text-gray-900">

            <Header />
            {/* Messages */}
            <main className="flex-1 overflow-y-auto px-6 py-6 space-y-4 ">
                <div className="lg:w-10/12 mx-auto">
                    {messages.map((msg, idx) => (
                        <Transition
                            key={idx}
                            appear={true}
                            show={true}
                            enter="transition-opacity duration-200"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                        >
                            <div
                                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"
                                    } `}
                            >
                                <div
                                    className={`max-w-lg px-4 py-3 rounded-2xl shadow  mb-10 ${msg.role === "user"
                                        ? "bg-blue-50 text-gray-800"
                                        : "bg-gray-100 text-gray-900"
                                        }`}
                                >
                                    {msg.content}
                                </div>
                            </div>
                        </Transition>
                    ))}
                </div>
                <div ref={bottomRef} />
            </main>

            {/* Input */}
            <div className=" px-6 py-4 flex items-end gap-2 bg-white">
                <div className="lg:w-7/12 w-full mx-auto flex justify-center items-center gap-x-5" >
                    <div
                        ref={inputRef}
                        contentEditable
                        role="textbox"
                        placeholder="Type your message..."
                        onInput={handleInput}
                        onKeyDown={handleKeyDown}
                        className="flex-1 min-h-[40px] lg:min-h-[80px] max-h-[200px] overflow-y-auto bg-gray-100 text-gray-900 p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></div>
                    <button
                        onClick={handleSend}
                        className="p-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                    >
                        <Send className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}
