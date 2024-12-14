import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import { prisma } from "../../../utils/db";
import jwt from "jsonwebtoken";
import { config } from "../../../utils/config";
import NodeCache from "node-cache";
import { getUserFromToken } from "../../../utils/auth";

const cache = new NodeCache({ stdTTL: 660 });

export const register = async (req: Request, res: Response) => {
  const { name, email, password, phone, assetUrl } = req.body;
  try {
    const isvalid = name && email && password;
    if (!isvalid)
      return res.status(400).json({ message: "All fields are required!" });

    const code = generateRandomCode();
    cache.set(email, code);

    return res.status(200).json({ code });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const isvalid = email && password;
    if (!isvalid)
      return res.status(400).json({ message: "All fields are required" });
    const student = await prisma.student.findFirst({ where: { email } });
    if (!student)
      return res
        .status(404)
        .json({ message: "There is no user with this email" });

    const passwordValidate = await bcrypt.compare(password, student.password);

    if (!passwordValidate) {
      return res.status(400).json({ message: "Wrong password" });
    }

    const token = jwt.sign(student, config.jwtStudentSecret);

    return res.status(200).json({ token, student });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const verify = async (req: Request, res: Response) => {
  try {
    const { name, email, password, phone, assetUrl, code } = req.body;
    const valid = name && email && password && code;
    if (!valid)
      return res.status(400).json({ message: "Email and code are requierd" });
    const cacheCode = cache.get(email);
    if (!cacheCode) res.status(400).json({ message: "Your code is invalids" });
    if (code === cacheCode) {
      const hasPassword = await bcrypt.hash(password, 10);
      const student = await prisma.student.create({
        data: { name, email, password: hasPassword, phone, assetUrl },
      });

      const token = jwt.sign(student, config.jwtStudentSecret);
      cache.del(email);
      return res.status(200).json({ student, token });
    } else {
      return res.status(400).json({ message: "Verification fail." });
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const myProfile = async (req: Request, res: Response) => {
  try {
    const user = getUserFromToken(req, res);
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const profileDelete = async (req: Request, res: Response) => {
  try {
    const user = getUserFromToken(req, res) as any;
    const id = Number(user?.id);
    await prisma.student.delete({ where: { id } });
    return res.status(200).json({ message: "Deleted Account Successfully." });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const forgetPassword = async (req: Request, res: Response) => {
  try {
    //need validation
    const { email } = req.body;
    const isExist = await prisma.user.findFirst({ where: { email } });
    if (!isExist)
      return res
        .status(404)
        .json({ message: "There is no user with this Email." });
    const code = generateRandomCode();
    cache.set(email, code);

    return res.status(200).json({ code });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
export const forgetVerify = async (req: Request, res: Response) => {
  try {
    const { email, code } = req.body;
    const cacheCode = cache.get(email);
    if (!cacheCode) res.status(400).json({ message: "Your code is invalids" });
    if (code === cacheCode) {
      cache.del(email);
      return res.status(200).json({ message: "Otp verify successfully." });
    } else {
      res.status(400).json({ message: "Your code is invalids" });
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const forgetPasswordChange = async (req: Request, res: Response) => {
  try {
    const { new_password, confirm_password } = req.body;
    const user = getUserFromToken(req, res) as any;

    const data = await prisma.student.update({
      where: { id: user.id },
      data: { password: new_password },
    });

    return res.status(200).json({ message: "Password Changed Successfully." });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const changePassword = async (req: Request, res: Response) => {
  //need validation
  try {
    const { old_password, new_password, confirm_password } = req.body;
    const user = getUserFromToken(req, res) as any;

    const hash = user?.password as string;
    const isOldPassword = await bcrypt.compare(old_password, hash);
    if (!isOldPassword)
      return res
        .status(400)
        .json({ message: "Your old password is not correct" });
    const data = await prisma.student.update({
      where: { id: user.id },
      data: { password: new_password },
    });
    return res.status(200).json({ message: "Password Changed Successfully." });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
export const generateRandomCode = (length = 6) => {
  const min = Math.pow(10, length - 1);
  const max = Math.pow(10, length) - 1;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
