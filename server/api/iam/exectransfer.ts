import { JSONResponse} from "~~/iam/misc/types";

export default defineEventHandler(async (event) => {
    let response = {} as JSONResponse;
    console.log('Efectiv execut transferul',event.node.req)
    
    return response;
  });