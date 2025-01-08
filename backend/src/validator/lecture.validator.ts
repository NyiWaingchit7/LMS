import { NextFunction, Request, Response } from "express";
import * as yup from "yup";

export const schema = yup.object().shape({
  title: yup.string().required("The title field is required."),
  assetUrl: yup.string().required("The image field is required."),

  categories: yup.array().min(1, "The category field is required."),
  description: yup.string().required("The description field is required."),
  discount_price: yup
    .number()
    .min(0, "The discount price must be a positive number."),
  price: yup.number().when("$isPremium", {
    is: true,
    then: (yup) =>
      yup
        .required("The price field is required for premium lectures.")
        .min(0, "The price must be a positive number.")
        .test(
          "is-greater-than-discount",
          "The price must be greater than the discount price.",
          function (value) {
            return value > this.parent.discount_price;
          }
        ),
    otherwise: (yup) => yup.nullable().notRequired(),
  }),
});

export const lectureValidation = async (
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
