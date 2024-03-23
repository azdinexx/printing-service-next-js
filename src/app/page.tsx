import Link from 'next/link';
import React from 'react';

export type UploadType = {
  Key: string;
  LastModified: string;
  Etag: string;
  Size: number;
  StorageClass: string;
  Owner: {
    DisplayName: string;
    ID: string;
  };
};
export const dynamic = 'force-dynamic';

async function page() {
  const uploads = await fetch(`http:localhost:3000/api/upload`).then((res) =>
    res.json()
  );
  console.log(uploads);
  return (
    <div className='container p-4'>
      <h1 className='text-xl my-4'>Uploaded Files</h1>
      <div className='overflow-x-auto'>
        <table className='table'>
          {/* head */}
          <thead>
            <tr>
              <th>
                <label>
                  <input type='checkbox' className='checkbox' />
                </label>
              </th>
              <th>Name</th>
              <th>Owner</th>
              <th>Size</th>
              <th>Created At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {uploads.map((upload: UploadType) => (
              <tr key={upload.Etag + upload.Etag}>
                <td>
                  <label>
                    <input type='checkbox' className='checkbox' />
                  </label>
                </td>
                <td>
                  <Link
                    href={`https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${upload.Key}`}
                  >
                    {upload.Key}
                  </Link>
                </td>
                <td>{upload.Owner.DisplayName}</td>
                <td>
                  {Math.round(upload.Size / 1024) > 1024
                    ? `${Math.round(upload.Size / 1024 / 1024)} MB`
                    : `${Math.round(upload.Size / 1024)} KB`}
                </td>
                <td>
                  <button className='btn glass btn-xs text-xs'>
                    {Math.round(
                      (new Date().getTime() -
                        new Date(upload.LastModified).getTime()) /
                        (1000 * 60 * 60 * 24)
                    )}{' '}
                    Days Ago
                  </button>
                </td>
                <td>
                  <button className='btn btn-danger'>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
          {/* foot */}
          <tfoot>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Owner</th>
              <th>Size</th>
              <th>Created At</th>
              <th>Action</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

export default page;
