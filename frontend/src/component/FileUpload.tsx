import { FilePond, registerPlugin } from "react-filepond";

import "filepond/dist/filepond.min.css";

import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { useEffect, useState } from "react";
import { config } from "../utils/config";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
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
  const [open, setopen] = useState(false);

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
      } else {
        toast.success(data.message);
      }
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
    <div>
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
            <div className="bg-black/5 w-full flex justify-center p-5 rounded-lg">
              <img
                src={editImg}
                className="w-50 h-auto max-h-[300px] object-cover rounded-lg"
                alt=""
              />
            </div>
            <Button
              variant="contained"
              size="small"
              color="secondary"
              onClick={() => {
                setopen(true);
              }}
            >
              Remove
            </Button>
          </div>
        )}
      </div>
      <Dialog open={open} className=" mx-auto">
        <DialogTitle className="text-green !font-bold !text-xl">
          Confirmation
        </DialogTitle>
        <DialogContent className="w-[350px]">
          Are you sure to remove this photo?
        </DialogContent>
        <DialogActions>
          <Button
            color="error"
            variant="contained"
            onClick={() => {
              setopen(false);
            }}
          >
            No
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              setEdit(false);
              setImgUrl(null);
              setopen(false);
            }}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
