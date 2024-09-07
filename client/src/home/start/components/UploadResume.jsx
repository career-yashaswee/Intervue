import { useDropzone } from "react-dropzone";
import { uploadResume, listResume, downloadResume } from "@/helpers/resumeAPI";
import { toast } from "sonner";
import { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";

import { DownloadIcon, Loader2 } from "lucide-react";
// import * as z from "zod";
// import { Info } from "lucide-react";

function UploadResume() {
  const [objects, setObjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [genNum, setGenNum] = useState(null);

  const handleUpload = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      try {
        await uploadResume(file)
          .then((response) => {
            toast.success("File Uploaded Successfully");
            setGenNum(response.data.bytes);
          })
          .catch((error) => {
            toast.error("Something went Wrong", error);
          });
      } catch (error) {
        console.log(error);
        toast.error("Something went Wrong");
      }
    }
  };

  const onDrop = useCallback((acceptedFiles) => {
    handleUpload(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    accept: {
      "application/pdf": [".pdf"],
    },
    onDrop,
  });

  let userId = localStorage.getItem("_id");
  useEffect(() => {
    const fetchObjects = async () => {
      setLoading(true);
      try {
        const response = await listResume(userId);
        setObjects(response.data.array);
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setObjects([]);
        } else {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchObjects();
  }, [genNum, userId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen flex-col gap-2">
        <Loader2 className="h-5 w-5 animate-spin" />
        <p className="text-sm">Loading</p>
      </div>
    );
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm gap-1 text-center pb-8 pt-8">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} name="file" />
        <p className="text-sm text-muted-foreground">
          Click or Drag here your resume to upload{" "}
        </p>
      </div>
    </div>
  );
}

export default UploadResume;
