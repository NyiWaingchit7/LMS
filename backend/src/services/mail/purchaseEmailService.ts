import { mailSend } from "../../utils/mailer";
import { loadEmailTemplate } from "../../helper/loadEmailTemplate";
import { getTemplateSubject } from "../../utils/getTemplateSubject";
interface Props {
  user: string;
  data?: any;
  templateName: string;
}
export const sendpurchaseEmail = async ({
  user,
  templateName,
  data,
}: Props) => {
  let emailContent = await loadEmailTemplate(templateName, data, "purchase");
  if (!emailContent) {
    emailContent = "<b>there is no template</b>";
    return;
  }
  mailSend(user, emailContent, getTemplateSubject(templateName));
};
