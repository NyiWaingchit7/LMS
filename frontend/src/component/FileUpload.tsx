import { FilePond, registerPlugin } from "react-filepond";

import "filepond/dist/filepond.min.css";

import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { useEffect, useState } from "react";
import { config } from "../utils/config";
import { Button } from "@mui/material";
import { headerOptions } from "../utils/requestOption";
import toast from "react-hot-toast";
import { FilePondFile } from "filepond";

registerPlugin(FilePondPluginImagePreview);

interface Props {
  setImgUrl: (data?: any) => void;
  editImg?: string;
}

export const FileUpload = ({ setImgUrl, editImg }: Props) => {
  const [files, setFiles] = useState<File[]>([]);
  const [edit, setEdit] = useState(false);
  const [fileRev, setFileRev] = useState("");

  const handleUpdateFiles = (fileItems: FilePondFile[]) => {
    const newFiles: File[] = fileItems.map(fileItem => {
      const actualFile = fileItem.file; 
      return new File([actualFile], actualFile.name, {
        type: actualFile.type,
        lastModified: actualFile.lastModified,
      });
    });
    setFiles(newFiles);
  }

  const server = {
    process: {
      url: `${config.apiUrl}/file-upload`,
      method: "POST" as "POST",
      timeout: 7000,
      withCredentials: false,
      headers: headerOptions(),
      onload: (data: any) => {
        const res = JSON.parse(data);

        setImgUrl(res.imgUrl);
        setFileRev(res.imgUrl);
      },
      revert: () => {
        console.log("delete");
      },
      onerror: (data: any) => console.log(data),
    },
  };

  const removeFile = async () => {
    try {
      const response = await fetch(`${config.apiUrl}/file-delete`, {
        method: "DELETE",
        headers: headerOptions(),
        body: JSON.stringify({ image: fileRev }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      toast.success(data.message);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (editImg) {
      console.log(editImg);

      setEdit(true);
    }
  }, [editImg]);

  return (
    <div className="App">
      {!edit && (
        <FilePond
          files={files}
          onupdatefiles={handleUpdateFiles}
          onremovefile={removeFile}
          server={server.process}
          name="files"
          labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
        />
      )}
      {edit && (
        <div className="flex flex-col items-center gap-3">
          <img src={editImg} className="w-20" alt="" />
          <Button
            variant="contained"
            size="small"
            color="secondary"
            onClick={() => {
              setEdit(false);
              setImgUrl(null);
            }}
          >
            Remove
          </Button>
        </div>
      )}
    </div>
  );
};
