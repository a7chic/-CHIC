import {
collection,
addDoc,
getDocs,
query,
where
} from "firebase/firestore";

import { db } from "../firebase/config";


// إضافة تقييم
export const addReview = async(
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
createdAt:new Date()
}
);

};



// جلب تقييمات المنتج
export const getReviews = async(
productId:string
)=>{


const q=query(
collection(db,"reviews"),
where(
"productId",
"==",
productId
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