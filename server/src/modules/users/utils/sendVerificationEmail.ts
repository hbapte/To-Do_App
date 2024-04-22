const nodemailer = require('nodemailer');
const dontenv = require('dotenv');


dontenv.config();

const port = process.env.PORT;

const sendVerificationEmail = async (email:string, verificationToken:string, names: string) => {
  
    // Calculate expiration time (24 hours from now)
  const expirationTime = new Date();
  expirationTime.setHours(expirationTime.getHours() + 24);

  // Generate URL with token and expiration time
  const verificationUrl = `http://localhost:${port}/verify?token=${verificationToken}&expires=${expirationTime.getTime()}`;

  const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          user: process.env.USER,
          pass: process.env.APP,
      },
  });
  

  const mailOptions = {
      from: 'ijbapte@gmail.com',
      to: email,
      subject: 'Email Verification',
      html: `
          <p>Hello, ${names}</p>
          <p>Thanks for getting started with our My brand!</p>
          <p>We need a little more information to complete your registration, including a confirmation of your email address.</p>
          <p>Please click on the following link to verify your email address:</p>
          <p><a href="${verificationUrl}">Verify Email</a></p>
          <p>If that doesn't work, copy and paste the following link in your browser:</p>
          <p>${verificationUrl}</p>
          <p>This link will expire in 24 hours.</p>
         
         
          <p>Thank you!</p> 
          <p>My brand Team</p>


      `,
  };

  try {
      await transporter.sendMail(mailOptions);
      console.log('Verification email sent successfully.');
  } catch (error) {
      console.error('Error sending verification email:', error);
      throw error;
  }
};

export default sendVerificationEmail;

