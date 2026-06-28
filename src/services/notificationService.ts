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

export async function addNotification(data:any){

await addDoc(
collection(db,"notifications"),
{
...data,
read:false,
createdAt:serverTimestamp()
}
);

}

export async function getNotifications(userId:string){

const q=query(
collection(db,"notifications"),
where("userId","==",userId),
orderBy("createdAt","desc")
);

const snapshot=await getDocs(q);

return snapshot.docs.map(doc=>({
id:doc.id,
...doc.data()
}));

}