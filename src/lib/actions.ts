'use server';

// lib/s3.js
import AWS from 'aws-sdk';

// Configure AWS SDK with your AWS credentials
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

export const uploadFileToS3 = async (file, key) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
    Body: file,
  };

  try {
    const data = await s3.upload(params).promise();
    return data.Location;
  } catch (err) {
    console.error('Error uploading file:', err);
    throw err;
  }
};
