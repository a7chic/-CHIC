import { db } from "./config";

import {

collection,

addDoc,

getDocs,

doc,

updateDoc,

deleteDoc

} from "firebase/firestore";

export async function addData(path:string,data:any){

return await addDoc(collection(db,path),data);

}

export async function getData(path:string){

return await getDocs(collection(db,path));

}

export async function updateData(path:string,id:string,data:any){

return await updateDoc(doc(db,path,id),data);

}

export async function deleteData(path:string,id:string){

return await deleteDoc(doc(db,path,id));

}