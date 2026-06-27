import {
collection,
addDoc,
getDocs,
deleteDoc,
doc,
updateDoc,
query,
orderBy,
increment,
where
} from "firebase/firestore";

import {db} from "../firebase/config";

export const addProduct=async(data:any)=>{

await addDoc(

collection(db,"products"),

{
...data,
likes:0,
views:0,
sold:false,
featured:false,
verified:false,
createdAt:new Date()
}

);

};

export const getProducts=async()=>{

const q=query(

collection(db,"products"),

orderBy("createdAt","desc")

);

const snapshot=await getDocs(q);

return snapshot.docs.map(doc=>({

id:doc.id,

...doc.data()

}));

};

export const getFeaturedProducts=async()=>{

const q=query(

collection(db,"products"),

where("featured","==",true)

);

const snapshot=await getDocs(q);

return snapshot.docs.map(doc=>({

id:doc.id,

...doc.data()

}));

};

export const getVerifiedProducts=async()=>{

const q=query(

collection(db,"products"),

where("verified","==",true)

);

const snapshot=await getDocs(q);

return snapshot.docs.map(doc=>({

id:doc.id,

...doc.data()

}));

};

export const updateProduct=async(id:string,data:any)=>{

await updateDoc(

doc(db,"products",id),

data

);

};

export const deleteProduct=async(id:string)=>{

await deleteDoc(

doc(db,"products",id)

);

};

export const increaseViews=async(id:string)=>{

await updateDoc(

doc(db,"products",id),

{

views:increment(1)

}

);

};

export const increaseLikes=async(id:string)=>{

await updateDoc(

doc(db,"products",id),

{

likes:increment(1)

}

);

};

export const markAsSold=async(id:string)=>{

await updateDoc(

doc(db,"products",id),

{

sold:true

}

);

};

export const featureProduct=async(id:string)=>{

await updateDoc(

doc(db,"products",id),

{

featured:true

}

);

};

export const verifyProduct=async(id:string)=>{

await updateDoc(

doc(db,"products",id),

{

verified:true

}

);

};