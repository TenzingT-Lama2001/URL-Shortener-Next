import axios from '../lib/axios';

export type ShortenRequest = {
  longURL: string;
};

export type ShortenResponse = {
    shortURL: string;
};


export const shorten = async (payload:ShortenRequest ) => {
    const { data } = await axios.post<ShortenResponse>(`/shorten`, payload);
    console.log({data})
  return data;
};


export const redirectToPage = async (shortURL: string) => {
  try {
    // Set maxRedirects to a higher value if needed
    const { data } = await axios.get(`/${shortURL}`, { maxRedirects: 10 });
    // Do something with the response if needed
    return data;
  } catch (error) {
    console.error('Error redirecting:', error);
    throw error; // Rethrow the error if needed
  }
};
