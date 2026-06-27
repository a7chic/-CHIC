import {

collection,

addDoc,

getDocs

} from "firebase/firestore";

import { db } from "../firebase/config";

export async function addCatalog(data:any){

return await addDoc(collection(db,"catalog"),data);

}

export async function getCatalog(){

return await getDocs(collection(db,"catalog"));

}