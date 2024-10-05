import { FilePond, registerPlugin } from "react-filepond";

import "filepond/dist/filepond.min.css";

import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { useEffect, useState } from "react";
import { config } from "../utils/config";

registerPlugin(FilePondPluginImagePreview);

interface Props {
  setImgUrl: (data?: any) => void;
}

export const FileUpload = ({ setImgUrl }: Props) => {
  const [files, setFiles] = useState<File[]>([]);
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

  return (
    <div className="App">
      <FilePond
        files={files}
        onupdatefiles={setFiles}
        onremovefile={() => {
          console.log("remove");
        }}
        server={server}
        name="files"
        labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
      />
    </div>
  );
};
