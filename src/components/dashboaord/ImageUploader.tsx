"use client";
import { useState } from "react";
import { UploadDropzone } from "@uploadthing/react";
import "@uploadthing/react/styles.css";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import Image from "next/image";

interface ImageObject {
  url: string;
  name: string;
}

interface ImageUploaderProps {
  image: ImageObject[];
  setImage: (images: ImageObject[]) => void;
}

export default function ImageUploader({ image, setImage }: ImageUploaderProps) {
  const [uploadState, setUploadState] = useState<"ready" | "uploading">("ready");

  const handleDelete = async(url: string) => {
    
    try {
      const response = await fetch("/api/uploadthing", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      if (!response.ok) throw new Error("Failed to delete image");
      setImage((image.filter((img) => img.url !== url)));
  
    } catch (error) {
      console.error("Error deleting image:", error);
      alert("Failed to delete image. Please try again.");
    }
  };

  return (
    <div className="max-h-fit flex flex-col items-center justify-center bg-white text-black p-6">
      <UploadDropzone<OurFileRouter, "imageUploader">
        endpoint="imageUploader"
        onClientUploadComplete={async (res) => {
          if (res) {
            setUploadState("uploading");
            const newImages: ImageObject[] = [];
            res.forEach((file) => {
              const { ufsUrl, name } = file;
              newImages.push({ url: ufsUrl, name });
            });
            setImage([...image, ...newImages]);
            setUploadState("ready");
          }
        }}
        onUploadError={(error) => {
          alert(`Upload failed: ${error.message}`);
          setUploadState("ready");
        }}
        className={`w-full max-w-3xl h-80 flex flex-col items-center justify-center border-4 border-dashed rounded-2xl ${uploadState === "uploading" ? "border-gray-400" : "border-gray-300"} bg-gray-100 hover:border-gray-500 transition-all duration-300 shadow-lg cursor-pointer`}
        disabled={uploadState === "uploading"}
      />
      <div className="mt-4 flex flex-wrap">
        {image.length > 0 &&
          image.map((img) => (
            <div key={img.url} className="flex items-center p-2 border rounded m-1 bg-gray-200">
              <Image src={img.url} alt={img.name} width={50} height={50} className="mr-2" />
              <span className="mr-2">{img.name}</span>
              <button onClick={() => handleDelete(img.url)} className="text-red-500">x</button>
            </div>
          ))}
      </div>
    </div>
  );
}