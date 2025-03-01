"use server";
import nodemailer from "nodemailer";

export async function SubmitForm(FormData: FormData) {
  const name = FormData.get("name");
  const email = FormData.get("email");
  const message = FormData.get("message");

  if (!name || !email) {
    return;
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: { name: "CloudEnv", address: "services@cloudenv.io" },
      to: "gaspergvj@gmail.com",
      subject: "New message from your website",
      text: `You have a new message from ${name} with email ${email}

      ${message}`,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("Message sent: %s", info.response);
  } catch (error) {
    console.error(error);
  }
}
