import { FilePond, registerPlugin } from "react-filepond";

import "filepond/dist/filepond.min.css";

import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { useEffect, useState } from "react";
import { config } from "../utils/config";
import { Button } from "@mui/material";
import { generateToken, headerOptions } from "../utils/requestOption";
import toast from "react-hot-toast";

registerPlugin(FilePondPluginImagePreview);

interface Props {
  setImgUrl: (data?: any) => void;
  editImg?: string;
}

export const FileUpload = ({ setImgUrl, editImg }: Props) => {
  const [files, setFiles] = useState<File[]>([]);
  const [edit, setEdit] = useState(false);
  const [fileRev, setFileRev] = useState("");
  const accessToken = localStorage.getItem("accessToken");
  const [apitoken, setApiToken] = useState("");

  const server = {
    process: {
      url: `${config.apiUrl}/file-upload`,
      method: "POST",
      timeout: 7000,
      withCredentials: false,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        API_TOKEN: `Bearer ${apitoken}`,
      },
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
        headers: await headerOptions(),
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
  useEffect(() => {
    const getToken = async () => {
      const data = await generateToken();
      setApiToken(data);
    };
    getToken();
  }, []);
  return (
    <div className="App">
      {!edit && (
        // @ts-ignore

        <FilePond
          files={files}
          onupdatefiles={setFiles}
          onremovefile={removeFile}
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
