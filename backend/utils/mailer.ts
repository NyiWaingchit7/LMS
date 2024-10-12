import { MailtrapClient } from "mailtrap";

const TOKEN = process.env.MAIL_TOKEN as string;

export const send = () => {
  const client = new MailtrapClient({
    token: TOKEN,
  });

  const sender = {
    email: "hello@demomailtrap.com",
    name: "nyi waing chit",
  };
  const recipients = [
    {
      email: "nyiwaingchit5@gmail.com",
    },
  ];

  client
    .send({
      from: sender,
      to: recipients,
      subject: "confirmation!",
      text: "I am testing mail sending!",
    })
    .then(console.log, console.error);
};

// import nodemailer from "nodemailer";
// import SMTPTransport from "nodemailer/lib/smtp-transport";

// // const transporter = nodemailer.createTransport({
// //   service: "gmail",
// //   auth: {
// //     user: process.env.MAIL_USERNAME,
// //     pass: process.env.MAIL_PASSWORD,
// //   },
// // } as SMTPTransport.Options);
// const transporter = nodemailer.createTransport({
//   host: process.env.MAIL_HOST,
//   port: process.env.MAIL_PORT,
//   secure: false,
//   auth: {
//     user: process.env.MAIL_USERNAME,
//     pass: process.env.MAIL_PASSWORD,
//   },
// } as SMTPTransport.Options);

// const mailOptions = {
//   from: process.env.SENDER_EMAIL,
//   to: "nyiwaingchit5@gmail.com",
//   subject: "Confirmation mail",
//   text: "I am testint email",
// };

// export const send = () => {
//   console.log("hello");
//   try {
//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         console.log(error);
//       } else {
//         console.log(info.response);
//       }
//     });
//   } catch (error) {
//     return error;
//   }
// };
