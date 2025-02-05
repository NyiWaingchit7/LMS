import { config } from "@/utils/config";
import { generateToken } from "@/utils/requestOption";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Props {
  onChange: (data?: any) => void;
  label: string;
  value: string;
}

export const SettingAsset = ({ onChange, label, value }: Props) => {
  const [image, setImage] = useState("");
  const accessToken = localStorage.getItem("accessToken");

  const handleImageUpload = async (e: any) => {
    const apitoken = await generateToken();
    const formData = new FormData();
    formData.append("files", e.target.files[0]);
    const response = await fetch(`${config.apiUrl}/file-upload`, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        API_TOKEN: `Bearer ${apitoken}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      data.message && toast.error(data.message);
    } else {
      setImage(data.imgUrl);
      onChange(data.imgUrl);
    }
  };
  useEffect(() => {
    setImage(value);
  }, [value]);
  return (
    <div className="flex items-center justify-between max-w-screen-sm">
      <div className="w-[350px] h-[180px] bg-black/5 flex justify-center items-center rounded-3xl">
        {image ? (
          <div className="p-5 w-auto h-full">
            <img
              src={image}
              className="w-auto h-full object-cover rounded-xl"
              alt="data"
            />
          </div>
        ) : (
          <p className="text-body">!No image selected</p>
        )}
      </div>
      <div className="flex justify-center mt-5">
        <label className="px-4 py-2 border border-primary text-xs sm:text-sm  rounded-3xl cursor-pointer hover:bg-black/5 transition-all duration-300 ease-in">
          <input type="file" className="hidden" onChange={handleImageUpload} />
          {image ? "Change" : "Select"} {label}
        </label>
      </div>
    </div>
  );
};
