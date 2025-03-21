"use client";

import { useState } from "react";
import { UploadDropzone } from "@/utils/uploadthing";
import { toast } from "react-hot-toast";

export default function UploadPage() {
  const [files, setFiles] = useState<{ name: string }[]>([]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-6">
      <h1 className="text-2xl font-semibold mb-4">Upload Houseboat Images</h1>
      <UploadDropzone
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          if (res) {
            setFiles(res);
            toast.success("Upload successful!");
          }
        }}
        onUploadError={(error) => {
          toast.error("Upload failed: " + error.message);
        }}
        className="border-2 border-dashed border-primary p-10 rounded-lg bg-secondary w-full max-w-lg"
      />
      {files.length > 0 && (
        <div className="mt-4">
          <h2 className="text-lg font-medium">Uploaded Files</h2>
          <ul>
            {files.map((file, index) => (
              <li key={index} className="text-sm text-gray-600">
                {file.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
