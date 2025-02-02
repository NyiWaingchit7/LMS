import { mailSend } from "../../utils/mailer";
import { loadEmailTemplate } from "../../helper/loadEmailTemplate";
interface Props {
  receiver: string;
  data?: any;
  templateName: string;
}
export const sendpurchaseEmail = ({ receiver, templateName }: Props) => {
  let emailContent = loadEmailTemplate(templateName, "");
  if (!emailContent) {
    emailContent = "<b>there is no template</b>";
    return;
  }
  mailSend(receiver, emailContent);
};
