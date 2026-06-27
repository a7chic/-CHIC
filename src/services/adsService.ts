import {

collection,

addDoc,

getDocs,

deleteDoc,

doc

} from "firebase/firestore";

import { db } from "../firebase/config";

export async function addAd(data:any){

return await addDoc(collection(db,"ads"),data);

}

export async function getAds(){

return await getDocs(collection(db,"ads"));

}

export async function deleteAd(id:string){

return await deleteDoc(doc(db,"ads",id));

}