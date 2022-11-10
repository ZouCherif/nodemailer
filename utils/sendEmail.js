const nodemailer = require("nodemailer");
const { GMAIL_USER, GMAIL_PASS } = require("../config");
const path = require("path");

let mailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_PASS,
  },
});


const sendEmail = (user) => {
  let emailContent = {
    from: GMAIL_USER,
    to: user.email,
    subject: "Signup succeeded",
    html: htmlContent(user),
    attachments: [
      {
        filename: `${user.email}.png`,
        path: path.join(__dirname, "..", "data", "images", `${user.email}.png`),
      },
    ],
  };
  mailTransporter.sendMail(emailContent, (err) => {
    if (err) {
      console.log("Sending Email error:", err);
    } else {
      console.log(`successfully send email to ${userEmail}`);
    }
  });
};


//* put the template here and
//* the user is json {name,email,...}
let htmlContent = (user) => {
  return `<p style= "color : red">Welcome in our family ${user.name}</p>`;
};
module.exports = { sendEmail };
