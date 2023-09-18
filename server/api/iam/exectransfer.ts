import { EmailOptions, JSONResponse,TransferFinalizat} from "~~/iam/misc/types";
import { PrismaClient } from "@prisma/client";
import { H3Error } from "h3";
import nodemailer from "nodemailer";

const prisma = new PrismaClient();


async function emailWithNodemailerSmtp(
  sender: string,
  password: string,
  host: string,
  port: string,
  options: EmailOptions
): Promise<H3Error | true> {
  // Error flag
  let errorFound = null;

  const emailOptions = {
    from: options.from,
    to: options.to,
    subject: options.subject,
    text: options.text,
  };

  // Sending email using nodemailer-service


  if (!host) {
    //console.log("Error: Email host not specified. Aborting email send.");
    return createError({ statusCode: 500, statusMessage: "Server error" });
  }

  // Check for email user
  if (!sender) {
   //console.log("Error: Sender email not specified. Aborting email send.");
    return createError({ statusCode: 500, statusMessage: "Server error" });
  }

  // Check for password
  if (!sender) {
  //  console.log("Error: Sender password not specified. Aborting email send.");
    return createError({ statusCode: 500, statusMessage: "Server error" });
  }

  //console.log("=======NODEMAILER-SMTP EMAIL OPTIONS=============");
  //console.log("host: ", host);
  //console.log("port: ", port);
  //console.log("user: ", sender);
  //onsole.log("=========NODEMAILER-SMTP EMAIL OPTIONS END=================");

  // Create transporter
  const transporter = nodemailer.createTransport({
    host: host,
    port: port,
    pool: true,
    secure: false, // use TLS
    auth: {
      user: sender,
      pass: password,
    },
    tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false,
    },
  });

  // Check if email server is ready to take our messages
  transporter.verify(function (error, success) {
    if (error) {
      //console.log(error);
     // console.log("Email server verify problem");
      errorFound = error;
    } else {
     // console.log("Server is ready to take our messages");
     // console.log("Success: ", success);
    }
  });

  // If transporter verify error, return
  if (errorFound)
    return createError({ statusCode: 500, statusMessage: "Server error" });

  // Attempt to send email
  transporter.sendMail(emailOptions, (err, result) => {
   // console.log(`Attempting to send email to user: ${options.to}`);

    // If error, log error and return
    if (err) {
      //console.log(err);
      errorFound = err;
     // console.log("Send email error");
    } else {
   //   console.log("Email successfully sent");
    // console.log("Email result: ", result);
    }
  });

  // If errorFound, return error
  if (errorFound)
    return createError({ statusCode: 500, statusMessage: "Server error" });

  // Otherwise successful
  return true;
}


export default defineEventHandler(async (event) => {
    let response = {} as JSONResponse;
    const body = await readBody(event);

    const config = useRuntimeConfig();

    //console.log('Efectiv execut transferul',config)

    const smtpHost = config.iamNodemailerSmtpHost;
    const smtpPort = config.iamNodemailerSmtpPort;
    const smtpSender = config.iamNodemailerSmtpSender;
    const smtpPassword = config.iamNodemailerSmtpPassword;

    const options = {
      to: body.adresaemail,
      subject: "Ati primit un fisier de la Spitalul Militar Pitesti",
      text: `
      Hello , teeeeeessst
     
      `,
      html: `
      <p>Hello </p>,
      <p>teeeeeesssst</p> 
      `
    } as EmailOptions;
    
    const smtpOptions = options;
    smtpOptions.from = smtpSender;

    // Attempt to send email
    const errorOrSent = await emailWithNodemailerSmtp(
      smtpSender,
      smtpPassword,
      smtpHost,
      smtpPort,
      smtpOptions
    );

    // If error, return error
    if (errorOrSent instanceof H3Error) return errorOrSent;
    
    let tf={}

    await prisma.transferuri.create({
      data:{
        numefisier:body.numefiser,
        numepacient:body.numepacient,
        adresaemail:body.adresaemail,
        stare:body.stare,
        mesaj:body.mesaj
      }
    }).then(async (response) => {
      tf = response;
    })
    .catch(async (e) => {
      console.error(e);
      
    });

    const newTransfer = tf as TransferFinalizat;
    response.status="success"
    response.data=newTransfer;
    return response;
  });