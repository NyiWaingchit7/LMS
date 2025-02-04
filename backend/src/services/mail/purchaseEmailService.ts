import { mailSend } from "../../utils/mailer";
import { loadEmailTemplate } from "../../helper/loadEmailTemplate";
interface Props {
  user: string;
  data?: any;
  templateName: string;
}
export const sendpurchaseEmail = ({ user, templateName, data }: Props) => {
  let emailContent = loadEmailTemplate(templateName, data, "purchase");
  if (!emailContent) {
    emailContent = "<b>there is no template</b>";
    return;
  }
  mailSend(user, emailContent, "Purchase Confirmation");
};
