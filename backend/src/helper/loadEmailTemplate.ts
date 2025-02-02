import path from "path";
import fs from "fs";
import ejs from "ejs";

export const loadEmailTemplate = (templateName: any, data: any) => {
  try {
    const templatePath = path.join(
      "src",
      "views",
      "purchase",
      `${templateName}.ejs`
    );
    console.log(templatePath);

    const template = fs.readFileSync(templatePath, "utf-8");
    return ejs.render(template, data);
  } catch (error) {
    console.log(error);
    return null;
  }
};
