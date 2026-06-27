import {

collection,

addDoc,

getDocs,

deleteDoc,

doc

} from "firebase/firestore";

import { db } from "../firebase/config";

export async function addComment(data:any){

return await addDoc(collection(db,"comments"),data);

}

export async function getComments(){

return await getDocs(collection(db,"comments"));

}

export async function deleteComment(id:string){

return await deleteDoc(doc(db,"comments",id));

}