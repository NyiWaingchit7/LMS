import path from "path";
import fs from "fs";
import ejs from "ejs";
import { prisma } from "../utils/db";

export const loadEmailTemplate = async (
  templateName: any,
  data: any,
  folder: any
) => {
  try {
    const templatePath = path.join(
      "src",
      "views",
      `${folder}`,
      `${templateName}.ejs`
    );
    const appLogo = await prisma.setting.findFirst({
      where: { key: "app_logo" },
    });
    const template = fs.readFileSync(templatePath, "utf-8");
    return ejs.render(template, { data, appLogo });
  } catch (error) {
    console.log(error);
    return null;
  }
};
