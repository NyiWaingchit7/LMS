import { Request, Response } from "express";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { storage } from "./firebaseConfig";
import { v4 } from "uuid";
import { Multer } from "multer";
export const fileUpload = async (req: Request, res: Response) => {
  try {
    const files = req.files as Express.Multer.File[];

    const imgRef = ref(storage, `image/${files[0].originalname + "" + v4()}`);

    const imagMetaData = {
      contentType: files[0].mimetype,
    };
    const imgSnapShop = await uploadBytesResumable(
      imgRef,
      files[0].buffer,
      imagMetaData
    );
    const imgUrl = await getDownloadURL(imgSnapShop.ref);
    return res.status(200).json({ imgUrl });
  } catch (error) {
    return res.status(500).json({ message: "error" });
  }
};

export const fileDelete = async (req: Request, res: Response) => {
  const { image } = req.body;
  try {
    if (!image)
      return res.status(400).json({ message: "The image is required." });
    const imgRef = ref(storage, image);
    await deleteObject(imgRef);
    return res
      .status(200)
      .json({ message: "The image is deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
export const fileRemove = async (image: string) => {
  const imagRef = ref(storage, image);
  await deleteObject(imagRef);
};
