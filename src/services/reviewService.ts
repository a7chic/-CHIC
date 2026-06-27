import {
collection,
addDoc,
query,
where,
getDocs,
serverTimestamp
} from "firebase/firestore";

import { db } from "../firebase/config";

export const addReview=async(

productId:string,

userId:string,

rating:number,

comment:string

)=>{

await addDoc(

collection(db,"reviews"),

{

productId,

userId,

rating,

comment,

createdAt:serverTimestamp()

}

);

};

export const getReviews=async(

productId:string

)=>{

const q=query(

collection(db,"reviews"),

where("productId","==",productId)

);

const snapshot=await getDocs(q);

return snapshot.docs.map(doc=>({

id:doc.id,

...doc.data()

}));

};