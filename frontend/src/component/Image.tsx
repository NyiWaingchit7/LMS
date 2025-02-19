import { ImageGallery } from "./ImageGallery";

interface Props {
  src: string;
}

export const Image = ({ src }: Props) => {
  return (
    <div className="max-w-20">
      <ImageGallery img={src} />
    </div>
  );
};
