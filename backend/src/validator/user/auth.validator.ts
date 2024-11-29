import { NextFunction, Request, Response } from "express";
import * as yup from "yup";

export const schema = yup.object().shape({
  name: yup.string().required("The title field is required."),
  email: yup.string().email().required("The email field is required."),
  password: yup
    .string()
    .min(8, "The password must be at least 8.")
    .required("The name field is required."),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password")], "Password must match")
    .required("Confirm password is required."),
});

export const registerValidation = async (
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
