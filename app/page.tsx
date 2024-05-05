'use client';
import { getFrameMetadata } from '@coinbase/onchainkit/frame';
import type { Metadata } from 'next';
import { NEXT_PUBLIC_URL } from './config';

import React, { useEffect, useState } from 'react';

const Page = () => {
  const [memeData, setMemeData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMeme = async () => {
      try {
        const response = await fetch('https://meme-api.com/gimme/wholesomememes');
        if (!response.ok) {
          throw new Error('Failed to fetch meme');
        }
        const memeData = await response.json();
        setMemeData(memeData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching meme:', error);
      }
    };

    fetchMeme();
  }, []);

  const frameMetadata = getFrameMetadata({
    buttons: [
      {
        label: 'Add Action',
      },
      {
        action: 'tx',
        label: 'Pay for coffee',
        target: `${NEXT_PUBLIC_URL}/api/tx`,
        postUrl: `${NEXT_PUBLIC_URL}/api/tx-success`,
      },
    ],
    image: {
      src: `${NEXT_PUBLIC_URL}/park-3.png`, // Use meme URL if available, else default image
      aspectRatio: '1:1',
    },
    postUrl: `${NEXT_PUBLIC_URL}/api/frame`,
  });

  const metadata: Metadata = {
    title: 'zizzamia.xyz',
    description: 'LFG',
    openGraph: {
      title: 'zizzamia.xyz',
      description: 'LFG',
      images: [`${NEXT_PUBLIC_URL}/park-1.png`],
    },
    other: {
      ...frameMetadata,
    },
  };

  return (
    <>
      <div>
        <h1>The Frame to get memes</h1>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            <img width="500" src={memeData.url} alt={memeData.title} />
          </>
        )}
      </div>
    </>
  );
};

export default Page;
