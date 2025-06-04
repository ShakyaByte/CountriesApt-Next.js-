import React from 'react';

// React unctional Component for spinner
const LoadingSpinner: React.FC = () => (
  <div className="text-center py-12">
    <div className="inline-flex items-center px-4 py-2 text-gray-600">
      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mr-3"></div>
      Loading countries...
    </div>
  </div>
);

export default LoadingSpinner;