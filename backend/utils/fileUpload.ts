import { Request, Response } from "express";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "./firebaseConfig";
import { v4 } from "uuid";
export const fileUpload = async (req: Request, res: Response) => {
  try {
    const file = req.file as Express.Multer.File;

    const imgRef = ref(storage, `image/${file.originalname + "" + v4()}`);

    const imagMetaData = {
      contentType: file.mimetype,
    };
    const imgSnapShop = await uploadBytesResumable(
      imgRef,
      file.buffer,
      imagMetaData
    );
    const imgUrl = await getDownloadURL(imgSnapShop.ref);
    return res.status(200).json({ imgUrl });
  } catch (error) {
    return res.status(500).json({ message: "error" });
  }
};
