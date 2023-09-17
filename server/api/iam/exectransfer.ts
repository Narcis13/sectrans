import { JSONResponse,TransferFinalizat} from "~~/iam/misc/types";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    let response = {} as JSONResponse;
    const body = await readBody(event);
    console.log('Efectiv execut transferul',body)
    
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