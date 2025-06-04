'use client';
import React from 'react';
import { Globe, Users, MapPin, DollarSign, MessageSquare } from 'lucide-react';
import { Country } from '@/lib/types';

interface CountryCardProps {
  country: Country;
  onShowDetails: (country: Country) => void;
}

const CountryCard: React.FC<CountryCardProps> = ({ country, onShowDetails }) => {
  const getValue = (value: any, fallback: string = 'N/A') => value || fallback;
  const currencies = country.currencies 
    ? Object.values(country.currencies).map(c => c.name).join(', ') 
    : 'N/A';
  const languages = country.languages 
    ? Object.values(country.languages).join(', ') 
    : 'N/A';

  const cardData = [
    { icon: MapPin, label: 'Capital', value: getValue(country.capital?.[0]), color: 'blue' },
    { icon: Users, label: 'Population', value: country.population?.toLocaleString() || 'N/A', color: 'green' },
    { icon: Globe, label: 'Region', value: getValue(country.region), color: 'purple' },
    { icon: DollarSign, label: 'Currency', value: currencies, color: 'yellow' },
    { icon: MessageSquare, label: 'Languages', value: languages, color: 'red' }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md transition-shadow duration-300 overflow-hidden 
      hover:[box-shadow:0px_0px_10px_1.2px_rgba(0,0,0,0.7)] cursor-pointer">
      <div className="h-32 bg-gray-100 flex items-center justify-center">
        {country.flags?.svg || country.flags?.png ? (
          <img 
            src={country.flags.svg || country.flags.png} 
            alt={`${country.name.common} flag`} 
            className="w-full object-contain h-full rounded-2xl" 
          />
        ) : (
          <Globe className="h-16 w-16 text-gray-400" />
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800 mb-3">{country.name.common}</h3>
        <div className="space-y-2 text-sm text-gray-600">
          {cardData.map(({ icon: Icon, label, value, color }) => (
            <div key={label} className="flex items-center">
              <Icon className={`h-4 w-4 mr-2 text-${color}-500 flex-shrink-0`} />
              <span><strong>{label}:</strong> {value}</span>
            </div>
          ))}
          <button 
            onClick={() => onShowDetails(country)} 
            className="mt-3 w-full bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded transition-colors cursor-pointer"
          >
            Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default CountryCard;