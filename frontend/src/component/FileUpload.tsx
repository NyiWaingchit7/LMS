import { FilePond, registerPlugin } from "react-filepond";

import "filepond/dist/filepond.min.css";

import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { useEffect, useState } from "react";
import { config } from "../utils/config";
import { Button } from "@mui/material";

registerPlugin(FilePondPluginImagePreview);

interface Props {
  setImgUrl: (data?: any) => void;
  editImg?: string;
}

export const FileUpload = ({ setImgUrl, editImg }: Props) => {
  const [files, setFiles] = useState<File[]>([]);
  const [edit, setEdit] = useState(false);
  const accessToken = localStorage.getItem("accessToken");

  const server = {
    process: {
      url: `${config.apiUrl}/file-upload`,
      method: "POST",
      timeout: 7000,
      withCredentials: false,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      onload: (data: any) => {
        const res = JSON.parse(data);
        setImgUrl(res.imgUrl);
      },
      revert: () => {
        console.log("delete");
      },
      onerror: (data: any) => console.log(data),
    },
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
          onupdatefiles={setFiles}
          onremovefile={() => {
            return console.log("remove");
          }}
          server={server}
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
