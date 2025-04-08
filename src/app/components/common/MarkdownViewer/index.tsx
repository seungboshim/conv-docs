'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import { MarkdownViewerProps } from './types';

export const MarkdownViewer: React.FC<MarkdownViewerProps> = ({
  content,
  className = '',
  ...props
}) => {
  return (
    <div className={`markdown-viewer prose prose-gray max-w-none ${className}`} {...props}>
      <ReactMarkdown
        components={{
          h1: props => <h1 className="text-3xl font-bold mt-8 mb-4 text-gray-dark" {...props} />,
          h2: props => (
            <h2
              className="text-2xl font-bold mt-6 mb-3 text-gray-dark border-b pb-1 border-gray-200"
              {...props}
            />
          ),
          h3: props => <h3 className="text-xl font-bold mt-5 mb-2 text-gray-dark" {...props} />,
          h4: props => <h4 className="text-lg font-bold mt-4 mb-2 text-gray-dark" {...props} />,
          p: props => <p className="my-4 text-gray-dark" {...props} />,
          a: props => <a className="text-primary hover:underline" {...props} />,
          ul: props => <ul className="list-disc pl-6 my-4" {...props} />,
          ol: props => <ol className="list-decimal pl-6 my-4" {...props} />,
          li: props => <li className="mb-1" {...props} />,
          blockquote: props => (
            <blockquote
              className="border-l-4 border-primary pl-4 italic my-4 text-gray-light"
              {...props}
            />
          ),
          code: props => {
            const { className, children } = props;
            const isInline = !className || !className.startsWith('language-');
            return isInline ? (
              <code className="bg-bg-light px-1 py-0.5 rounded text-primary">{children}</code>
            ) : (
              <code className="block bg-bg-light p-4 rounded text-gray-dark overflow-x-auto my-4">
                {children}
              </code>
            );
          },
          pre: props => <pre className="bg-bg-light p-0 rounded-md my-4" {...props} />,
          table: props => <table className="table-auto border-collapse my-4 w-full" {...props} />,
          thead: props => <thead className="bg-bg-light" {...props} />,
          tbody: props => <tbody {...props} />,
          tr: props => <tr className="border-b border-gray-200" {...props} />,
          th: props => <th className="px-4 py-2 text-left font-bold" {...props} />,
          td: props => <td className="px-4 py-2 border-gray-200" {...props} />,
          img: props => <img className="max-w-full h-auto my-4" {...props} />,
          hr: props => <hr className="my-6 border-gray-200" {...props} />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

MarkdownViewer.displayName = 'MarkdownViewer';
