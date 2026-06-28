import {
collection,
addDoc,
getDocs,
query,
where,
orderBy,
serverTimestamp
} from "firebase/firestore";

import {db} from "../firebase/config";

export async function sendMessage(

chatId:string,

senderId:string,

text:string

){

await addDoc(

collection(db,"messages"),

{

chatId,

senderId,

text,

createdAt:serverTimestamp()

}

);

}

export async function getMessages(

chatId:string

){

const q=query(

collection(db,"messages"),

where("chatId","==",chatId),

orderBy("createdAt","asc")

);

const snapshot=await getDocs(q);

return snapshot.docs.map(doc=>({

id:doc.id,

...doc.data()

}));

}