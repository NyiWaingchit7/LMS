import LightGallery from "lightgallery/react";
//@ts-nocheck
//@ts-ignore
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-thumbnail.css";
import "lightgallery/css/lg-zoom.css";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";

interface Props {
  img: string;
}

export const ImageGallery = ({ img }: Props) => {
  const onInit = () => {
    console.log("lightGallery has been initialized");
  };
  return (
    <LightGallery onInit={onInit} speed={500} plugins={[lgThumbnail, lgZoom]}>
      <a href={img}>
        <img
          src={img}
          alt="img"
          className="w-full h-auto max-h-[300px] object-cover rounded-lg"
        />
      </a>
    </LightGallery>
  );
};
