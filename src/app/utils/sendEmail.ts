
import nodemailer from 'nodemailer'
import config from '../config';


export const sendEmail = async ( to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com.',
    port: 587,
    secure: config.node_env === 'production',
    auth: {
      user: 'mdshohed170@gmail.com',
      pass: "ilmo kjeo qncq zhda",
    },
  });

  const ok = await transporter.sendMail({
    from: 'mdshohed170@gmail.com', 
    to,
    subject: 'Reset your password within 10 mins!',
    text: '', 
    html, // html body
  });
  
};
