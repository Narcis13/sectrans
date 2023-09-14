import { JSONResponse, Transfer } from "~~/iam/misc/types";

export default function useTransfer(){
    return {
        executaTransfer
    }
}

async function executaTransfer(t:Transfer): Promise<JSONResponse>{
    
    const response = await $fetch("/api/iam/exectransfer", {
        method: "POST",
        headers: {
          "client-platform": "browser",
        },
        body: t,
      });
    
      return response;
}