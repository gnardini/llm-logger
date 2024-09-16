import { FullLog } from '@type/log';
import { useState } from 'react';

interface LogViewProps {
  logDetails: FullLog;
  width: number;
}

type TabType = 'input' | 'output';

export function LogView({ logDetails, width }: LogViewProps) {
  const [activeTab, setActiveTab] = useState<TabType>('input');

  const tabClass = (tab: TabType) =>
    `px-4 py-2 font-semibold ${
      activeTab === tab ? 'bg-gray-700 text-white' : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
    } cursor-pointer rounded-t-lg`;

  const parseAndFormatJSON = (jsonString: string) => {
    const parsedJSON = JSON.parse(jsonString);
    return JSON.stringify(parsedJSON, null, 2).replace(/\\n/g, '\n');
  };

  const syntaxHighlight = (json: string) => {
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(
      /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
      (match) => {
        let cls = 'text-purple-300';
        if (/^"/.test(match)) {
          if (/:$/.test(match)) {
            cls = 'text-blue-300';
          } else {
            cls = 'text-green-300';
          }
        } else if (/true|false/.test(match)) {
          cls = 'text-yellow-300';
        } else if (/null/.test(match)) {
          cls = 'text-red-300';
        }
        return `<span class="${cls}">${match}</span>`;
      },
    );
  };

  const renderContent = () => {
    const currentContent = (activeTab === 'input' ? logDetails.input : logDetails.output) ?? '';

    let formattedContent = currentContent;
    if (activeTab === 'output') {
      try {
        formattedContent = parseAndFormatJSON(currentContent);
      } catch (error) {
        try {
          const lines = currentContent.split('\n').filter((line) => line.trim() !== '');
          const formattedLines = lines.map((line) => parseAndFormatJSON(line));
          formattedContent = formattedLines.join('\n\n');
        } catch (error) {
          formattedContent = currentContent;
        }
      }
    }

    return (
      <div className="bg-gray-700 p-4 rounded-b-lg rounded-tr-lg overflow-auto max-h-[600px]">
        <pre
          className="whitespace-pre-wrap"
          dangerouslySetInnerHTML={{ __html: syntaxHighlight(formattedContent) }}
        />
      </div>
    );
  };

  return (
    <div className="w-full" style={{ maxWidth: `${width}px` }}>
      <div className="flex flex-wrap">
        <div className={tabClass('input')} onClick={() => setActiveTab('input')}>
          Input
        </div>
        <div className={tabClass('output')} onClick={() => setActiveTab('output')}>
          Output
        </div>
      </div>
      {renderContent()}
    </div>
  );
}
