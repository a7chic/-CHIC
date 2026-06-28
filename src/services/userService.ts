import {
doc,
getDoc,
updateDoc,
collection,
getDocs
} from "firebase/firestore";

import { db } from "../firebase/config";

export async function getUser(uid:string){

const snapshot=await getDoc(doc(db,"users",uid));

if(!snapshot.exists()) return null;

return{
id:snapshot.id,
...snapshot.data()
};

}

export async function updateUser(uid:string,data:any){

await updateDoc(
doc(db,"users",uid),
data
);

}

export async function getUsers(){

const snapshot=await getDocs(
collection(db,"users")
);

return snapshot.docs.map(doc=>({
id:doc.id,
...doc.data()
}));

}