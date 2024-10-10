import { NextFunction, Request, Response } from "express";
import * as yup from "yup";

export const schema = yup.object().shape({
  title: yup.string().required("The title field is required."),
  lectureId: yup.number().required("The letcture is required."),
  description: yup.string().required("The name field is required."),
});

export const lessonValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await schema.validate(req.body, { abortEarly: false });
    next();
  } catch (err: any) {
    const errors: { [key: string]: string } = {};

    if (err.inner) {
      err.inner.map((error: any) => {
        if (error.path) {
          errors[error.path] = error.message;
        }
      });
    }

    return res.status(400).json({ errors });
  }
};
