import nodemailer from "nodemailer";

const emailManager = async (to, text, html, subject) => {
    //Mailtrap, a service used for testing emails in development (they never actually go to a real inbox).
    var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: { 
            user: "58aed70ce221af",
            pass: "e5ddaa45b5890a"
        }
    });

    await transport.sendMail({
        to: to,
        from: "Info@expensetracker.com",
        text: text,
        subject: subject
    });

}
export default emailManager;