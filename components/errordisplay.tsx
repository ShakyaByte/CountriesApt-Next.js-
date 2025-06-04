import React from 'react';

interface ErrorDisplayProps {
  message: string;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message }) => (
  <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
    <div className="text-red-700">
      <strong>Error:</strong> {message}
    </div>
  </div>
);

export default ErrorDisplay;