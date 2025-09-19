import nodemailer from 'nodemailer'; import dotenv from 'dotenv'; dotenv.config();
const transporter = nodemailer.createTransport({ host: process.env.SMTP_HOST||'smtp.gmail.com', port: process.env.SMTP_PORT?Number(process.env.SMTP_PORT):587, secure:false, auth:{ user:process.env.GMAIL_USER, pass:process.env.GMAIL_PASS }});
export async function sendOtpEmail(to, otp){ try{ await transporter.sendMail({ from:process.env.GMAIL_USER, to, subject:'Your OTP', text:`Your OTP is ${otp}` }); return true; }catch(e){ console.error('mail error', e); return false; } }
