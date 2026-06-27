import {
collection,
addDoc,
getDocs,
query,
where,
orderBy
} from "firebase/firestore";

import { db } from "../firebase/config";


// إرسال رسالة
export const sendMessage = async(
conversationId:string,
senderId:string,
text:string
)=>{

await addDoc(
collection(db,"messages"),
{
conversationId,
senderId,
text,
createdAt:new Date()
}
);

};



// جلب الرسائل
export const getMessages = async(
conversationId:string
)=>{


const q=query(
collection(db,"messages"),
where(
"conversationId",
"==",
conversationId
),
orderBy(
"createdAt",
"asc"
)
);


const snapshot=await getDocs(q);



return snapshot.docs.map(
item=>({
id:item.id,
...item.data()
})
);


};