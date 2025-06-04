import axios from 'axios';
import { Country } from './types';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_COUNTRIES_API_BASE_URL,
  timeout: 10000,
});

// Function to generate a search URL based on input text and type
const getSearchUrl = (text: string, type: string): string => {
  const clean = encodeURIComponent(text);
  // Create URL paths for different search types
  const endpoints: Record<string, string> = {
    name: `/name/${clean}`,
    capital: `/capital/${clean}`,
    currency: `/currency/${clean}`,
    language: `/lang/${clean}`,
    region: `/region/${clean}`,
  };
  return endpoints[type] || endpoints.name;
};

export const countryService = {
  async fetchAllCountries(): Promise<Country[]> {
    const response = await api.get('/all');
    return response.data;
  },

  async searchCountries(text: string, type: string): Promise<Country[]> { //promise will give array of country 
    if (type === 'independent') {
      const response = await api.get('/independent?status=true');
      return response.data;
    }
    
    if (type === 'all') {
      return this.fetchAllCountries();
    }

    const response = await api.get(getSearchUrl(text, type));
    return Array.isArray(response.data) ? response.data : [response.data];
  },

  async getCountryDetails(countryName: string): Promise<Country> {
    const response = await api.get(`/name/${countryName}?fullText=true`);
    return response.data[0];
  },
};