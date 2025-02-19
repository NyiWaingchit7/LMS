import { ImageGallery } from "./ImageGallery";

interface Props {
  src: string;
}

export const Image = ({ src }: Props) => {
  return (
    <div className="w-12">
      <ImageGallery img={src} />
    </div>
  );
};
