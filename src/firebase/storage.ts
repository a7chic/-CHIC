import { storage } from "./config";

import {

ref,

uploadBytes,

getDownloadURL

} from "firebase/storage";

export async function uploadImage(file:any,path:string){

const imageRef=ref(storage,path);

await uploadBytes(imageRef,file);

return await getDownloadURL(imageRef);

}