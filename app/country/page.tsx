'use client'
import React, { useState, useEffect } from 'react';
import { Search, Globe, Users, MapPin, DollarSign, MessageSquare, X } from 'lucide-react';

interface Country { //data structure for country API
  name: { common: string };
  capital?: string[];
  population: number;
  region: string;
  currencies?: { [key: string]: { name: string } };
  languages?: { [key: string]: string };
  flags: { svg?: string; png?: string };
  cca3: string;
}

const CountriesExplorer = () => {
  //array of Country objects to keep information about multiple countries.
  const [countries, setCountries] = useState<Country[]>([]); 
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [searchBy, setSearchBy] = useState('all');
  const [error, setError] = useState('');
  //For Popup
  const [showPopup, setShowPopup] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [countryDetails, setCountryDetails] = useState<any>(null); // to display information like independence status,

  useEffect(() => {
    fetchCountries('https://restcountries.com/v3.1/all');
  }, []);

  useEffect(() => {
    if (!searchText.trim()) {
      fetchCountries('https://restcountries.com/v3.1/all');
      return;
    }
    const timer = setTimeout(() => search(), 500);
    return () => clearTimeout(timer);
  }, [searchText, searchBy]); //renders when value changes 

  const fetchCountries = async (url: string) => { //takes url as information to function 
    setLoading(true);
    setError('');
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      setCountries(Array.isArray(data) ? data : [data]);
    } catch {
      setError('Something went wrong');
      setCountries([]);
    } finally {
      setLoading(false);
    }
  };

  const getSearchUrl = (text: string, type: string) => { //creates URL for the country API based on your search text 
    const clean = encodeURIComponent(text);
    const urls: { [key: string]: string } = {
      name: `https://restcountries.com/v3.1/name/${clean}`,
      capital: `https://restcountries.com/v3.1/capital/${clean}`,
      currency: `https://restcountries.com/v3.1/currency/${clean}`,
      language: `https://restcountries.com/v3.1/lang/${clean}`,
      region: `https://restcountries.com/v3.1/region/${clean}`
    };
    return urls[type] || urls.name;
  };

  const search = () => {
    if (!searchText.trim()) return;
    fetchCountries(getSearchUrl(searchText, searchBy));
  };

  const handleSearchTypeChange = (type: string) => { // fetches data when swithcing from name to region
    setSearchBy(type);
    if (type === 'independent') {
      fetchCountries('https://restcountries.com/v3.1/independent?status=true');
    } else if (type === 'all') {
      fetchCountries('https://restcountries.com/v3.1/all');
    }
  };

  const showDetails = async (country: Country) => { //show the details on popup inital value null
    setSelectedCountry(country);
    setShowPopup(true);
    try {
      const response = await fetch(`https://restcountries.com/v3.1/name/${country.name.common}?fullText=true`);
      const data = await response.json();
      setCountryDetails(data[0]);
    } catch {
      setCountryDetails(null);
    }
  };

  const closePopup = () => { //After closing the popup state
    setShowPopup(false);
    setSelectedCountry(null);
    setCountryDetails(null);
  };

    const CountryCard = ({ country }: { country: Country }) => {  //if empty value return N/A
    const getValue = (value: any, fallback: string = 'N/A') => value || fallback; 
    const currencies = country.currencies ? Object.values(country.currencies).map(c => c.name).join(', ') : 'N/A';
    const languages = country.languages ? Object.values(country.languages).join(', ') : 'N/A';

    return (
        //CountryCard
      <div className="bg-white rounded-lg shadow-md transition-shadow duration-300 overflow-hidden 
      hover:[box-shadow:0px_0px_10px_1.2px_rgba(0,0,0,0.7)] cursor-pointer">
        <div className="h-32 bg-gray-100 flex items-center justify-center">
          {country.flags?.svg || country.flags?.png ? (
            <img src={country.flags.svg || country.flags.png} alt={`${country.name.common} flag`} 
            className="w-full object-contain h-full rounded-2xl" />
          ) : (
            <Globe className="h-16 w-16 text-gray-400" /> //Flag empty then use Globe Icon
          )}
        </div>
        <div className="p-4">
          <h3 className="text-xl font-bold text-gray-800 mb-3">{country.name.common}</h3>
          <div className="space-y-2 text-sm text-gray-600">
            {[
              { icon: MapPin, label: 'Capital', value: getValue(country.capital?.[0]), color: 'blue' },
              { icon: Users, label: 'Population', value: country.population?.toLocaleString() || 'N/A', color: 'green' },
              { icon: Globe, label: 'Region', value: getValue(country.region), color: 'purple' },
              { icon: DollarSign, label: 'Currency', value: currencies, color: 'yellow' },
              { icon: MessageSquare, label: 'Languages', value: languages, color: 'red' }
            ].map(({ icon: Icon, label, value, color }) => (
              <div key={label} className="flex items-center">
                <Icon className={`h-4 w-4 mr-2 text-${color}-500 flex-shrink-0`} />
                <span><strong>{label}:</strong> {value}</span>
              </div>
            ))}
            <button onClick={() => showDetails(country)} className="mt-3 w-full bg-gray-700 hover:bg-gray-800
             text-white px-4 py-2 rounded transition-colors cursor-pointer">
              Details
            </button>
          </div>
        </div>
      </div>
    );
  };
    //For PopUp
  const Popup = () => {
    if (!showPopup) return null;
    return (
      <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
          <div className="bg-blue-500 text-white p-4 rounded-t-lg flex justify-between items-center">
            <h2 className="text-lg font-bold">{selectedCountry?.name.common} Details</h2>
            <button onClick={closePopup} className="text-white hover:text-gray-200">
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
                {[
                  { label: 'Independence Status', value: countryDetails.independent ? 'Independent' : 'Not Independent', 
                    color: countryDetails.independent ? 'green' : 'red' },
                  { label: 'UN Member', value: countryDetails.unMember ? 'Yes' : 'No', 
                    color: countryDetails.unMember ? 'blue' : 'gray', show: countryDetails.independent },
                  { label: 'Status', value: countryDetails.status || 'N/A', color: 'gray', isText: true }
                 
                  //show if they are meant to be shown
                ].filter(item => item.show !== false).map(({ label, value, color, isText }) => (
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
            <button onClick={closePopup} className="mt-4 w-full bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded">
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-200"> {/*Backround Page*/}
      <nav className="bg-gray-800 shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Globe className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-sm font-bold text-white md:text-[20px]">Countries Explorer</h1>
            </div>
            <div className="text-[10px] md:text-[15px] text-gray-300">Created through REST Countries API</div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 py-8 lg:w-[93%]"> {/*content section*/}
        <div className="bg-white rounded-lg p-6 mb-8 [box-shadow:0px_0px_7px_1.5px_rgba(0,0,0,0.5)]">
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">Search Countries</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-black" />
                  <input
                    type="text"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}  //  Updates the text as the user types.
                    onKeyPress={(e) => e.key === 'Enter' && search()} //	Updates what is typed into the search box
                    placeholder="Type to search..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md placeholder-black text-black"
                  />
                </div>
              </div>

          {/* Dropdown to choose search type */}
              <div className="sm:w-48">
                <label className="block text-sm font-medium text-gray-700 mb-2">Search By</label>
                <select value={searchBy} onChange={(e) => handleSearchTypeChange(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md text-black cursor-pointer">
                  <option value="all">All Countries</option>
                  <option value="name">Name</option>
                  <option value="capital">Capital</option>
                  <option value="currency">Currency</option>
                  <option value="language">Language</option>
                  <option value="region">Region</option>
                </select>
              </div>

                 {/* Search Button */}
              <div className="sm:w-32 flex items-end">
                <button onClick={search} disabled={!searchText.trim() || loading} className="w-full bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-black cursor-pointer">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
            <div className="text-red-700"><strong>Error:</strong> {error}</div>
          </div>
        )}

          {/*  Loading Spinner */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-flex items-center px-4 py-2 text-gray-600">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mr-3"></div>
              Loading countries...
            </div>
          </div>
        )}

         {/* Show results when not loading */}
        {!loading && (
          <>
            {countries.length > 0 ? (
              <>
                <div className="mb-4 text-sm text-gray-600">
                  Found {countries.length} {countries.length === 1 ? 'country' : 'countries'}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                  {/* Loop through countries and creates a CountryCard for each one */}
                  {countries.map((country) => (
                    <CountryCard key={country.cca3} country={country} />
                  ))}
                </div>
              </>
            ) : (
              !error && (
                <div className="text-center py-12 text-gray-500">
                  No countries found. Try a different search term.
                </div>
              )
            )}
          </>
        )}
      </div>

      <Popup />
    </div>
  );
};

export default CountriesExplorer;