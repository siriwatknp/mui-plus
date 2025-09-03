"use client";

import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "./ai-conversation";

export default function AIConversationDemo() {
  return (
    <div className="w-full h-[400px] border rounded-lg overflow-hidden">
      <Conversation>
        <ConversationContent>
          <div className="space-y-4">
            {/* Simulated conversation messages */}
            <div className="p-3 bg-secondary rounded-lg max-w-[80%]">
              <p className="text-sm">Hello! How can I help you today?</p>
            </div>

            <div className="p-3 bg-primary text-primary-foreground rounded-lg max-w-[80%] ml-auto">
              <p className="text-sm">I need help with React components.</p>
            </div>

            <div className="p-3 bg-secondary rounded-lg max-w-[80%]">
              <p className="text-sm">
                I'd be happy to help you with React components! What specific
                aspect would you like to explore?
              </p>
            </div>

            <div className="p-3 bg-primary text-primary-foreground rounded-lg max-w-[80%] ml-auto">
              <p className="text-sm">
                How do I manage state in functional components?
              </p>
            </div>

            <div className="p-3 bg-secondary rounded-lg max-w-[80%]">
              <p className="text-sm mb-2">
                In functional React components, you can manage state using
                hooks:
              </p>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>useState for local component state</li>
                <li>useReducer for complex state logic</li>
                <li>useContext for global state sharing</li>
              </ul>
            </div>

            {/* Add more messages to demonstrate scrolling */}
            {Array.from({ length: 10 }, (_, i) => (
              <div
                key={i}
                className={`p-3 rounded-lg max-w-[80%] ${
                  i % 2 === 0
                    ? "bg-secondary"
                    : "bg-primary text-primary-foreground ml-auto"
                }`}
              >
                <p className="text-sm">Message {i + 6}</p>
              </div>
            ))}
          </div>
        </ConversationContent>

        <ConversationScrollButton />
      </Conversation>
    </div>
  );
}
