import {
doc,
setDoc,
getDoc,
updateDoc
} from "firebase/firestore";

import { db } from "../firebase/config";

export async function createUser(uid:string,data:any){

return await setDoc(doc(db,"users",uid),data);

}

export async function getUser(uid:string){

return await getDoc(doc(db,"users",uid));

}

export async function updateUser(uid:string,data:any){

return await updateDoc(doc(db,"users",uid),data);

}