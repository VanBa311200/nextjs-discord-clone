import React from "react";
import path from "path";

import { S3 } from "aws-sdk";
import { s3Bucket } from "@/lib/uploadImageS3";
import { AWS_CONFIG } from "@/lib/configs";

type ReturnProps = {
  process: number;
  uploadURL: string;
  handleUploadImage: (file: File, dir?: string) => Promise<string>;
};

export function useUploadImage(defaultURL: string): ReturnProps {
  const [process, setProcess] = React.useState(0);
  const [uploadURL, setUploadURL] = React.useState("");
  const [upload, setUpload] = React.useState<S3.ManagedUpload>();

  const handleUploadImage: ReturnProps["handleUploadImage"] = async (
    file,
    dir = "",
  ) => {
    const { name, type } = file;
    const fileName = path.join(dir, `${Date.now()}-${name}`);

    const params: S3.PutObjectRequest = {
      Bucket: AWS_CONFIG.bucket as string,
      Key: fileName,
      Body: file,
      ContentType: type,
    };

    const uploadS3 = s3Bucket.upload(params);
    setUpload(uploadS3);

    uploadS3.on("httpUploadProgress", (evt) => {
      setProcess(Math.round((evt.loaded / evt.total) * 100));
    });

    return await uploadS3.promise().then(
      (value) => {
        setUpload(undefined);
        setUploadURL(value.Location);
        return value.Location;
      },
      (reason) => {
        setProcess(0);
        setUpload(undefined);
        console.log("AWSError", reason);
        return "";
      },
    );
  };

  return {
    process,
    uploadURL,
    handleUploadImage,
  };
}
