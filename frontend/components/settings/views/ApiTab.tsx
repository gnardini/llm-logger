import React from 'react';

export const ApiTab: React.FC = () => {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">API Setup</h3>
      <p className="mb-4">To log data using the API directly, make a POST request to:</p>
      <pre className="bg-gray-800 p-4 rounded-md mb-4">
        <code>https://llmlogger.com/api/logs/create</code>
      </pre>
      <p className="mb-4">Include your API key in the Authorization header:</p>
      <pre className="bg-gray-800 p-4 rounded-md mb-4">
        <code>Authorization: Bearer your-api-key-here</code>
      </pre>
      <p className="mb-4">The request body should include:</p>
      <pre className="bg-gray-800 p-4 rounded-md overflow-x-auto">
        <code>{`
{
  "model": string,
  "input_tokens": number,
  "output_tokens": number,
  "stop_reason": string | null,
  "input": string | null,
  "output": string | null,
  "tags": string[],
  "user": string | null,
  "error": string | null
}
        `}</code>
      </pre>
    </div>
  );
};