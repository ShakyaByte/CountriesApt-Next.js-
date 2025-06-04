'use client';
import React from 'react';
import { X } from 'lucide-react';
import { Country } from '@/lib/types';

interface PopupProps {
  isOpen: boolean;
  country: Country | null;
  countryDetails: Country | null;
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ isOpen, country, countryDetails, onClose }) => {
  if (!isOpen || !country) return null;

  const detailsData = countryDetails ? [
    { 
      label: 'Independence Status', 
      value: countryDetails.independent ? 'Independent' : 'Not Independent', 
      color: countryDetails.independent ? 'green' : 'red' 
    },
    { 
      label: 'UN Member', 
      value: countryDetails.unMember ? 'Yes' : 'No', 
      color: countryDetails.unMember ? 'blue' : 'gray', 
      show: countryDetails.independent 
    },
    { 
      label: 'Status', 
      value: countryDetails.status || 'N/A', 
      color: 'gray', 
      isText: true 
    }
  ].filter(item => item.show !== false) : [];

  return (
    <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
        <div className="bg-blue-500 text-white p-4 rounded-t-lg flex justify-between items-center">
          <h2 className="text-lg font-bold">{country.name.common} Details</h2>
          <button onClick={onClose} className="text-white hover:text-gray-200">
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="p-4">
          {!countryDetails ? (
            <div className="text-center py-4">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mx-auto mb-2"></div>
              <p>Loading...</p>
            </div>
          ) : (
            <div className="space-y-3">
              {detailsData.map(({ label, value, color, isText }) => (
                <div key={label}>
                  <strong className='text-black'>{label}:</strong>
                  {isText ? (
                    <span className="ml-2 text-gray-700">{value}</span>
                  ) : (
                    <span className={`ml-2 px-2 py-1 rounded text-sm bg-${color}-100 text-${color}-800`}>
                      {value}
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
          <button 
            onClick={onClose} 
            className="mt-4 w-full bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;