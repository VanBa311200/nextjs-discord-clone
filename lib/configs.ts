export const AWS_CONFIG = {
  region: process.env.NEXT_PUBLIC_AWS_BUCKET_REGION as string,
  accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY as string,
  secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_KEY as string,
  bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME as string,
};
