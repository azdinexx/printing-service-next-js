'use client';
import { uploadFileToS3 } from '@/lib/actions';
import Image from 'next/image';
import { ChangeEvent, FormEvent, useState } from 'react';

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [uploadedFileURL, setUploadedFileURL] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    console.log('selectedFile:', selectedFile);
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    try {
      const url = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      }).then((res) => res.json());
      setUploadedFileURL(url);
      setLoading(false);
    } catch (err) {
      console.error('Error uploading file:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className='flex bg-gray-50 h-screen'>
      <div className='border rounded-xl p-4 mx-auto mt-20 bg-white h-fit m-4'>
        <h1>Uplaod Your Documents</h1>
        <form onSubmit={submit}>
          <input type='file' onChange={handleFileChange} />
          <button
            type='submit'
            className='border  border-black px-2 py-1 rounded-md bg-gray-200 hover:bg-gray-300'
          >
            {loading ? 'Uploading...' : 'Upload'}
          </button>
        </form>
      </div>
    </main>
  );
}
