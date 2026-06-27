import {
collection,
addDoc,
query,
where,
getDocs,
serverTimestamp
} from "firebase/firestore";

import { db } from "../firebase/config";

export const sendNotification=async(

uid:string,

title:string,

message:string

)=>{

await addDoc(

collection(db,"notifications"),

{

uid,

title,

message,

read:false,

createdAt:serverTimestamp()

}

);

};

export const getNotifications=async(

uid:string

)=>{

const q=query(

collection(db,"notifications"),

where("uid","==",uid)

);

const snapshot=await getDocs(q);

return snapshot.docs.map(doc=>({

id:doc.id,

...doc.data()

}));

};