"use client";

import { Message, MessageContent, MessageAvatar } from "./ai-message";

export default function AIMessageDemo() {
  return (
    <div className="w-full max-w-3xl mx-auto space-y-8 p-8">
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground">
          Message Types
        </h3>
        <div className="space-y-4">
          {/* User Message */}
          <Message from="user">
            <MessageAvatar src="" name="User" />
            <MessageContent>
              <p>How do I create a custom hook in React?</p>
            </MessageContent>
          </Message>

          {/* Assistant Message */}
          <Message from="assistant">
            <MessageAvatar src="" name="AI" />
            <MessageContent>
              <p>To create a custom hook in React, follow these steps:</p>
              <ol className="list-decimal list-inside mt-2 space-y-1">
                <li>Start the function name with &quot;use&quot;</li>
                <li>Call other hooks inside if needed</li>
                <li>Return necessary values</li>
              </ol>
            </MessageContent>
          </Message>

          {/* User Message with longer content */}
          <Message from="user">
            <MessageAvatar src="" name="User" />
            <MessageContent>
              <p>Can you show me an example?</p>
            </MessageContent>
          </Message>

          {/* Assistant Message with code */}
          <Message from="assistant">
            <MessageAvatar src="" name="AI" />
            <MessageContent>
              <p>Here&apos;s a simple example of a custom hook:</p>
              <pre className="mt-2 p-2 bg-background/50 rounded text-xs overflow-x-auto">
                <code>{`function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  
  const increment = () => setCount(prev => prev + 1);
  const decrement = () => setCount(prev => prev - 1);
  
  return { count, increment, decrement };
}`}</code>
              </pre>
            </MessageContent>
          </Message>
        </div>
      </div>
    </div>
  );
}
