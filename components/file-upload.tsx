import React from "react";

// @hooks
import { useUploadImage } from "@/hooks/useUploadImage";

// @components
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

// @assets
import { AvatarUpload } from "@/assets/svg";

interface Props {
  onChange: (url?: string) => void;
  value?: string;
}

export const FileUpload: React.FC<Props> = ({ onChange, value }) => {
  const { handleUploadImage, process, uploadURL } = useUploadImage(value || "");

  return (
    <div className="relative w-20 h-20 rounded-full ">
      {!uploadURL && (
        <AvatarUpload className="absolute z-0 top-0 left-0 right-0" />
      )}
      <input
        className="absolute top-0 left-0 bottom-0 right-0 z-10 opacity-0 cursor-pointer"
        type="file"
        onChange={async (e) => {
          const url = await handleUploadImage(e.target.files![0]);
          onChange(url);
        }}
      />
      {!!value && (
        <Avatar className="h-full w-full">
          <AvatarImage className="object-cover" src={value} />
          <AvatarFallback>
            <Skeleton className="h-full w-full rounded-full" />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};
