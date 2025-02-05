import { mailSend } from "../../utils/mailer";
import { loadEmailTemplate } from "../../helper/loadEmailTemplate";
interface Props {
  user: string;
  code: any;
  templateName?: string;
}
export const sendOtpEmail = async ({
  user,
  templateName = "otpTemplate",
  code,
}: Props) => {
  let emailContent = await loadEmailTemplate(templateName, code, "otp");
  if (!emailContent) {
    emailContent = "<b>there is no template</b>";
    return;
  }
  mailSend(user, emailContent, "OTP");
};
