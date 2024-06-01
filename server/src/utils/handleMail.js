import nodemailer from "nodemailer";

export const mailRegistration = async (data) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER_MAIL,
      pass: process.env.PASSWORD_MAIL,
    },
  });
  const info = await transporter.sendMail({
    from: `"ChessResultsAPI ♟️" <${process.env.USER_MAIL}`, // sender address
    to: `${data.user.email}`, // list of receivers
    subject: "Verify email", // Subject line
    text: `Please, go to the following link to verify your email account localhost:3000/api/auth/validate/${data.token}`, // plain text body
    // html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
};
