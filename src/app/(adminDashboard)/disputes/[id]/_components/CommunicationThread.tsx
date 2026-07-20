"use client";
import { useState } from "react";
import { MessageSquare, Send } from "lucide-react";

type TMessage = {
  key: number;
  sender: string;
  time: string;
  message: string;
  dotColor: string;
  bubbleBg: string;
  align: "left" | "right";
};

const messages: TMessage[] = [
  {
    key: 1,
    sender: "James Mitchell",
    time: "24 Jun, 09:14",
    message:
      "I worked an additional 8 hours on the 18th and 19th. The site supervisor confirmed this verbally but the timesheet only shows my standard hours.",
    dotColor: "bg-blue-500",
    bubbleBg: "bg-blue-50",
    align: "left",
  },
  {
    key: 2,
    sender: "Harrington Build Ltd",
    time: "24 Jun, 11:32",
    message:
      "We only approved the hours submitted in the original timesheet. There was no formal overtime authorisation in place.",
    dotColor: "bg-purple-500",
    bubbleBg: "bg-purple-50",
    align: "left",
  },
  {
    key: 3,
    sender: "Admin (Sarah Chen)",
    time: "25 Jun, 08:55",
    message:
      "Thank you both. We have reviewed the submitted files. We are requesting the site log from the contractor and any written confirmation from the supervisor.",
    dotColor: "bg-orange-500",
    bubbleBg: "bg-orange-50",
    align: "right",
  },
];

const recipients = ["Both parties", "James", "Harrington"];

const CommunicationThread = () => {
  const [selectedRecipient, setSelectedRecipient] = useState("Both parties");
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim()) return;
    console.log({ to: selectedRecipient, message: text });
    setText("");
  };

  return (
    <div className="bg-white border border-gray-100 rounded-3xl">
      <div className="flex items-center gap-x-2 px-6 py-4 border-b border-gray-100">
        <MessageSquare size={18} className="text-gray-500" />
        <h2 className="font-semibold text-gray-900">Communication Thread</h2>
      </div>

      <div className="px-6 py-5 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.key}
            className={`flex ${
              msg.align === "right" ? "justify-end" : "justify-start"
            }`}
          >
            <div className={`${msg.bubbleBg} rounded-2xl p-4 max-w-[70%]`}>
              <div className="flex items-center justify-between gap-x-4 mb-1">
                <div className="flex items-center gap-x-1.5">
                  <span className={`w-2 h-2 rounded-full ${msg.dotColor}`} />
                  <p className="text-sm font-semibold text-gray-800">
                    {msg.sender}
                  </p>
                </div>
                <p className="text-xs text-gray-400 whitespace-nowrap">
                  {msg.time}
                </p>
              </div>
              <p className="text-gray-800 leading-relaxed">{msg.message}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-100 px-6 py-4">
        <div className="flex items-center gap-x-2 mb-3">
          <span className="text-sm text-gray-500">Send to:</span>
          {recipients.map((r) => (
            <button
              key={r}
              onClick={() => setSelectedRecipient(r)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium cursor-pointer transition-colors ${
                selectedRecipient === r
                  ? "bg-orange-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-x-3">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type a message to the parties..."
            className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-gray-300"
          />
          <button
            onClick={handleSend}
            className="w-11 h-11 flex items-center justify-center bg-orange-600 hover:bg-orange-700 text-white rounded-xl cursor-pointer shrink-0"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommunicationThread;