'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { Search, Globe } from 'lucide-react';
import { Country } from '@/lib/types';
import { countryService } from '@/lib/api';
import CountryCard from '@/components/country/countrycard';
import Popup from '@/components/country/popup';
import LoadingSpinner from '@/components/loadingspinner';
import ErrorDisplay from '@/components/errordisplay';

const CountriesExplorer: React.FC = () => {
   //array of Country objects to keep information about multiple countries.
  const [countries, setCountries] = useState<Country[]>([]); 
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [searchBy, setSearchBy] = useState('all');
  const [error, setError] = useState('');
  //For PopUp
  const [showPopup, setShowPopup] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [countryDetails, setCountryDetails] = useState<Country | null>(null); // to display information like independence status

  const fetchCountries = useCallback(async (searchText: string = '', searchType: string = 'all') => {
    setLoading(true);
    setError('');
    
    try { /*fetch the data through lib/api*/
      const data = searchText.trim() 
        ? await countryService.searchCountries(searchText, searchType)
        : await countryService.fetchAllCountries();
      
      setCountries(data);
    } catch {
      setError('Something went wrong');
      setCountries([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSearch = useCallback(() => {
    if (!searchText.trim()) {
      fetchCountries();
      return;
    }
    fetchCountries(searchText, searchBy);
  }, [searchText, searchBy, fetchCountries]);

  const handleSearchTypeChange = useCallback((type: string) => {
    setSearchBy(type);
    const shouldFetchSpecial = type === 'independent' || type === 'all';
    if (shouldFetchSpecial) {
      fetchCountries('', type);
    }
  }, [fetchCountries]);

  const showDetails = useCallback(async (country: Country) => {
    setSelectedCountry(country);
    setShowPopup(true);
    setCountryDetails(null);
    
    try {
      const details = await countryService.getCountryDetails(country.name.common);
      setCountryDetails(details);
    } catch {
      setCountryDetails(null);
    }
  }, []);

  const closePopup = useCallback(() => {
    setShowPopup(false);
    setSelectedCountry(null);
    setCountryDetails(null);
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchCountries();
  }, [fetchCountries]);

  // Search debounce
  useEffect(() => {
    if (!searchText.trim()) {
      fetchCountries();
      return;
    }
    
    const timer = setTimeout(handleSearch, 500);
    return () => clearTimeout(timer);
  }, [searchText, searchBy, handleSearch, fetchCountries]);

  const hasResults = countries.length > 0;
  const showNoResults = !loading && !hasResults && !error;

  return (
    <>
      <nav className="bg-gray-800 shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Globe className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-sm font-bold text-white md:text-[20px]">Countries Explorer</h1>
            </div>
            <div className="text-[10px] md:text-[15px] text-gray-300">
              Created through REST Countries API
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 py-8 lg:w-[93%]">
        <div className="bg-white rounded-lg p-6 mb-8 [box-shadow:0px_0px_7px_1.5px_rgba(0,0,0,0.5)]">
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search Countries
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-black" />
                  <input
                    type="text"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    placeholder="Type to search..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md placeholder-black text-black"
                  />
                </div>
              </div>

              <div className="sm:w-48">
                <label className="block text-sm font-medium text-gray-700 mb-2">Search By</label>
                <select 
                  value={searchBy} 
                  onChange={(e) => handleSearchTypeChange(e.target.value)} 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-black cursor-pointer"
                >
                  <option value="all">All Countries</option>
                  <option value="name">Name</option>
                  <option value="capital">Capital</option>
                  <option value="currency">Currency</option>
                  <option value="language">Language</option>
                  <option value="region">Region</option>
                </select>
              </div>

              <div className="sm:w-32 flex items-end">
                <button 
                  onClick={handleSearch} 
                  disabled={!searchText.trim() || loading} 
                  className="w-full bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-black cursor-pointer"
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>

        {error && <ErrorDisplay message={error} />}

        {loading ? (
          <LoadingSpinner /> // If data is still loading, show the spinner
        ) : (
         // If not loading, check if there are results
         <>  
            {hasResults ? (
               // If there are countries to show
              <>
                <div className="mb-4 text-sm text-gray-600">
                  Found {countries.length} {countries.length === 1 ? 'country' : 'countries'}
                </div>
                  {/* Display the list of countries*/}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                  {countries.map((country) => (
                    <CountryCard 
                      key={country.cca3} 
                      country={country} 
                      onShowDetails={showDetails}
                    />
                  ))}
                </div>
              </>
            ) : (
               // If no results, and the "no results" message should be shown
              showNoResults && (
                <div className="text-center py-12 text-gray-500">
                  No countries found. Try a different search term.
                </div>
              )
            )}
          </>
        )}
      </div>

      <Popup 
        isOpen={showPopup}
        country={selectedCountry}
        countryDetails={countryDetails}
        onClose={closePopup}
      />
    </>
  );
};

export default CountriesExplorer;