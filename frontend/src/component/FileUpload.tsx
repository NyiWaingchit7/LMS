import { FilePond, registerPlugin } from "react-filepond";

import "filepond/dist/filepond.min.css";

import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { useState } from "react";
import { config } from "../utils/config";

// Register the plugins
registerPlugin(FilePondPluginImagePreview);
export const FileUpload = () => {
  const [files, setFiles] = useState<File[]>([]);
  const accessToken = localStorage.getItem("accessToken");
  const formData = new FormData();
  formData.append("file", files[0]);
  console.log(formData);

  const server = {
    process: {
      url: `${config.apiUrl}/file-upload`,
      method: "POST",
      timeout: 7000,
      withCredentials: false,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  };
  return (
    <div className="App">
      <FilePond
        files={files}
        onupdatefiles={setFiles}
        server={server}
        name="files"
        labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
      />
    </div>
  );
};
