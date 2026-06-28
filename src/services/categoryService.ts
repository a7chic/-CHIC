import {
collection,
addDoc,
getDocs,
query,
where,
orderBy,
serverTimestamp
} from "firebase/firestore";

import { db } from "../firebase/config";

const notificationsRef=collection(db,"notifications");

export async function sendNotification(data:any){

await addDoc(

notificationsRef,

{

...data,

read:false,

createdAt:serverTimestamp()

}

);

}

export async function getNotifications(userId:string){

const q=query(

notificationsRef,

where("userId","==",userId),

orderBy("createdAt","desc")

);

const snapshot=await getDocs(q);

return snapshot.docs.map(doc=>({

id:doc.id,

...doc.data()

}));

}