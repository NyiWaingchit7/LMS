import { NextFunction, Request, Response } from "express";
import * as yup from "yup";

export const schema = yup.object().shape({
  title: yup.string().required("The title field is required."),
  lectureId: yup.number().required("The lecture field is required."),
});

export const popularLectureValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const isPremium = req.body.isPremium;
    await schema.validate(req.body, {
      abortEarly: false,
      context: { isPremium },
    });
    next();
  } catch (err: any) {
    const errors: { [key: string]: string } = {};

    if (err.inner) {
      err.inner.forEach((error: any) => {
        if (error.path) {
          errors[error.path] = error.message;
        }
      });
    }

    return res.status(400).json({ errors });
  }
};
