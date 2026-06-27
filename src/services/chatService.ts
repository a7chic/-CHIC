import {
collection,
addDoc,
query,
orderBy,
onSnapshot,
serverTimestamp
} from "firebase/firestore";

import { db } from "../firebase/config";

export const sendMessage = async(

chatId:string,

sender:string,

text:string

)=>{

await addDoc(

collection(db,"chats",chatId,"messages"),

{

sender,

text,

createdAt:serverTimestamp()

}

);

};

export const subscribeMessages=(

chatId:string,

callback:any

)=>{

const q=query(

collection(db,"chats",chatId,"messages"),

orderBy("createdAt","asc")

);

return onSnapshot(q,(snapshot)=>{

callback(

snapshot.docs.map(doc=>({

id:doc.id,

...doc.data()

}))

);

});

};