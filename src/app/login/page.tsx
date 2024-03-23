'use client';
import React, { useState } from 'react';

function Page() {
  const [secretKey, setSecretKey] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/login`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          secretKey,
        }),
      }
    );

    const data = await response.json();
    if (data.error) {
      setError(data.error);
    }
    setLoading(false);
  };
  return (
    <main className='w-screen h-screen flex justify-center items-center'>
      <form onSubmit={handleSubmit} className='card gap-3'>
        {error && <div className='alert alert-error'>{error}</div>}
        <input
          type='text'
          name='secretKey'
          value={secretKey}
          onChange={(e) => {
            setSecretKey(e.target.value);
            if (error) setError('');
          }}
          placeholder='Enter your secret key here...'
          className='border border-gray-300 p-2 rounded-lg'
        />

        <button type='submit' className='btn btn-primary '>
          {loading && <span className='loading loading-dots'></span>}
          Login
        </button>
      </form>
    </main>
  );
}

export default Page;
