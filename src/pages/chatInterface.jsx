import React, { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import { Transition } from "@headlessui/react";
import Header from "../components/header";
import axios from "axios";
import SentimentMarkdown from "../components/markdownCoponent";
import { AIChatSession } from "../services/aiMdel";
// const baseURL = "http://localhost:8000"; // Adjust this to your backend URL if needed
const baseURL = "https://fake-news.codeabs.com"; // Adjust this to your backend URL if needed


export default function ChatInterface() {
    const [messages, setMessages] = useState([
        { role: "assistant", content: "Hello 👋 How can I help you today?" },
    ]);
    const inputRef = useRef(null);
    const bottomRef = useRef(null);

    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [model, setModel] = useState("grox");


    let prompt = `Analyze the following sentiment output: {raw_sentiment}
Context: {asked_prompt}
note: LABEL_0 = Negative, LABEL_1 = Neutral, LABEL_2 = Positive

Instructions:
1. Classify the sentiment as **Positive**, **Neutral**, or **Negative**.
2. Provide a **score breakdown** (percentage for each class).
3. Summarize the most likely sentiment in 1-2 sentences.
4. Assess whether the input might contain **misinformation or be harmful** (respond with Yes/No and a brief reason).
5. Estimate a **truth_likelihood** score: High, Medium, or Low.
6. Set **flagged**: true if the input is misleading, dangerous, or needs moderation; otherwise, false.

`


    const geminiAiChatSession = async ({ raw_sentiment, asked_prompt }) => {
        // Initialize the AI chat session here if needed
        const PROMPT = prompt.replace("{raw_sentiment}", raw_sentiment).replace("{asked_prompt}", asked_prompt);

        try {
            const result = await AIChatSession.sendMessage(PROMPT);

            console.log("AI Response:", result);
            // remove message with state "loading"

            setMessages((prev) => [...prev, { role: "assistant", content: <SentimentMarkdown response={JSON.parse(result.response.candidates[0].content.parts[0].text)} /> }]);


        } catch (error) {
            setMessages((prev) => [...prev, { role: "assistant", content: "Sorry, I couldn't process your request at the moment." }]);
            console.error("Error during AI chat session:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSend = () => {
        const text = input.trim();
        if (!text) return;
        setMessages([...messages, { role: "user", content: text }]);
        setInput("");
        if (inputRef.current) {
            inputRef.current.innerText = "";
            inputRef.current.style.height = "auto";
        }

        // Send the message to the backend        // Assuming you have an API endpoint set up to handle chat messages
        // Adjust the URL as necessary for your backend
        setLoading(true);


        axios.post(`${baseURL}/api/messages`, { text: text })
            .then((response) => {
                console.log("Response from backend:", response.data);



                // Assuming the response contains a message field with the assistant's reply
                // setMessages((prev) => [...prev, { role: "assistant", content: <SentimentMarkdown response={assistantMessage} /> }]);
                if (model === "gemini") {
                    setLoading(false);
                    setMessages((prev) => [...prev, { role: "assistant", state: "loading", content: <SentimentMarkdown response={JSON.parse(response.data.sentiment.data)} /> }]);
                } else {
                    // const assistantMessage = JSON.stringify(response.data.sentiment[0]); // Adjust based on your API response structure
                    console.log("Sentiment Data:", response.data.sentiment[0]);
                    geminiAiChatSession({ raw_sentiment: response.data.sentiment[0], asked_prompt: text });
                }
            })
            .catch((error) => {
                console.error("Error sending message:", error);
                setMessages((prev) => [...prev, { role: "assistant", content: "Sorry, something went wrong." }]);
            });


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
