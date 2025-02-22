import { ImageGallery } from "./ImageGallery";

interface Props {
  src: string;
}

export const Image = ({ src }: Props) => {
  return (
    <div className="w-20">
      <ImageGallery height="45px" img={src} />
    </div>
  );
};
