import { config } from "./config";

export const fileUpload = async (image: any) => {
  const accessToken = localStorage.getItem("accessToken");
  const formData = new FormData();
  formData.append("file", image);

  const response = await fetch(`${config.apiUrl}/file-upload`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: formData,
  });
  const data = await response.json();
  console.log(data);

  return data;
};
