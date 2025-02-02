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
      host: "box.cloudenv.cc",
      port: 587,
      secure: false,
      auth: {
        user: "services@cloudenv.io",
        pass: "microbiology2",
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
