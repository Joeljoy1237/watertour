'use client'
import { UploadButton } from "@/utils/uploadthing";
import { useState } from 'react';
import Image from "next/image";
import { UploadDropzone } from "@uploadthing/react";

const ImageUpload = () => {
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    return (
        <div>
            <UploadButton
            appearance={{
                container:{
                    border: "1px dotted #ccc",
                    width: "400px",
                    height: "200px",
                    color: "primary",
                },
            }}
      endpoint="imageUploader"
      onClientUploadComplete={(res) => {
        // Do something with the response
        console.log("Files: ", res);
        alert("Upload Completed");
      }}
      onUploadError={(error: Error) => {
        // Do something with the error.
        alert(`ERROR! ${error.message}`);
      }}
            />
          
            {imageUrl ? (
                <div>
                    <Image src={imageUrl} alt="Uploaded Image" width={500} height={300} />
                </div>
            ) : null}
        </div>
    );
};

export default ImageUpload;

