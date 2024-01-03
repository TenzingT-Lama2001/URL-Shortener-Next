'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import logo from '../public/gotrim.png';
import Link from 'next/link';
import { ShortenRequest, shorten } from './api/shortener';
import { useMutation } from '@tanstack/react-query';

export default function Home() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');
  const [showBox, setShowBox] = useState(false);

  const { data, mutate: shortenMutation } = useMutation({
    mutationFn: async (data: ShortenRequest) => shorten(data),
    onSuccess: (data) => {
        setShortenedUrl(data.shortURL);
        setShowBox(true);
    },
  });

  const handleShorten = async () => {
    let longURL = originalUrl.trim();
    shortenMutation({ longURL });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortenedUrl);
    alert('Short URL copied to clipboard');
  };

  const handleCloseBox = () => {
    setShowBox(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-500 flex flex-col items-center justify-center p-8">
      <div className="bg-white p-8 rounded shadow-lg max-w-md w-full text-center">
        <div className="flex flex-col items-center mb-8">
          <Link href="/">
            <Image src={logo} alt="Logo" width={200} height={200} />
          </Link>
          <p className="text-gray-600 text-md mt-4">Your URL Shortening Solution</p>
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="originalUrl" className="text-lg font-semibold mb-2 text-gray-800">
            Enter your URL:
          </label>
          <input
            type="text"
            id="originalUrl"
            className="border p-2 rounded focus:outline-none focus:border-blue-500"
            placeholder="https://example.com"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
          />
        </div>

        <button
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none transition ease-in-out duration-300"
          onClick={handleShorten}
        >
          Shorten
        </button>

        {showBox && (
          <div className="mt-6 border p-4 rounded bg-gray-100">
            <p className="w-full text-green-700 font-semibold mb-2 text-center">
              Trimmed Url: 
            </p>
            <p className='w-full text-green-700 font-semibold mb-2 text-center'>
              <Link href={shortenedUrl} target='_blank' >{shortenedUrl}</Link>
            </p>
            <div className='text-center p-1'>
            <button
              className="border border-blue-500 text-blue-500 py-2 px-4 rounded hover:bg-blue-600 hover:text-white focus:outline-none mr-2 transition ease-in-out duration-300"
              onClick={handleCopy}
            >
              Copy
            </button>
            <button
              className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 focus:outline-none transition ease-in-out duration-300"
              onClick={handleCloseBox}
            >
              Close
            </button>

            </div>

          </div>
        )}
      </div>
    </div>
  );
}
