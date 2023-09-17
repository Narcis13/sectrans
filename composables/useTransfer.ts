import { JSONResponse, TransferFinalizat } from "~~/iam/misc/types";

export default function useTransfer(){
    return {
        executaTransfer
    }
}

async function executaTransfer(t:TransferFinalizat): Promise<JSONResponse>{
    
    const response = await $fetch("/api/iam/exectransfer", {
        method: "POST",
        headers: {
          "client-platform": "browser",
        },
        body: t,
      });
    
      return response;
}