import { NextFunction, Request, Response } from "express";
import * as yup from "yup";

export const schema = yup.object().shape({
  name: yup.string().required("The title field is required."),
  email: yup
    .string()
    .email("Invalid email format.")
    .required("The email field is required."),
  password: yup.string().when("$isUpdate", {
    is: true,
    then: (yup) =>
      yup
        .transform((value) => (value === "" ? null : value))
        .nullable()
        .min(8, "Password must be at least 8 letters")
        .notRequired(),
    otherwise: (yup) =>
      yup
        .transform((value) => (value === "" ? null : value))
        .required("The password field is required.")
        .min(8, "Password must be at least 8 letters"),
  }),
});

export const studentValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const isUpdate = req.method === "PUT" || req.method === "PATCH";
  try {
    await schema.validate(req.body, {
      abortEarly: false,
      context: { isUpdate },
    });
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
