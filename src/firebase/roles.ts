import { doc,getDoc } from "firebase/firestore";

import { db } from "./config";

export async function getUserRole(uid:string){

const ref=doc(db,"users",uid);

const snap=await getDoc(ref);

if(!snap.exists()){

return "visitor";

}

return snap.data().role;

}