import sgMail from "@sendgrid/mail";

const sendEmail = async (to, message) => {
  try {
    sgMail.setApiKey(
      process.env.SEND_GRID_API_KEY
    );

    const msg = {
      to: to,
      from: process.env.SMTP_USER, 
      subject: "Reset Password",
      html: message,
    };

    sgMail
      .send(msg)
      .then(() => {
        console.log("Email sent successfully");
      })
      .catch((error) => {
        console.error(error);
      });
  } catch (err) {
    throw new Error(err);
  }
};

export default sendEmail;
