import path from "path";
import { S3 } from "aws-sdk";

import { AWS_CONFIG } from "./configs";

export const s3Bucket = new S3({
  region: AWS_CONFIG.region,
  credentials: {
    accessKeyId: AWS_CONFIG.accessKeyId,
    secretAccessKey: AWS_CONFIG.secretAccessKey,
  },
  signatureVersion: "v4",
  s3ForcePathStyle: true,
});

export const uploadImage = async (file: File, dir: string = "") => {
  const { name, type } = file;
  const fileName = path.join(dir, `${Date.now()}-${name}`);

  const params: S3.PutObjectRequest = {
    Bucket: AWS_CONFIG.bucket as string,
    Key: fileName,
    Body: file,
    ContentType: type,
  };

  return s3Bucket.upload(params);
};
