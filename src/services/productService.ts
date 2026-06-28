import {
collection,
addDoc,
getDocs,
getDoc,
doc,
updateDoc,
deleteDoc,
query,
orderBy,
serverTimestamp,
increment
} from "firebase/firestore";

import { db } from "../firebase/config";

const productsRef=collection(db,"products");

export async function addProduct(product:any){

return await addDoc(productsRef,{

...product,

createdAt:serverTimestamp(),

updatedAt:serverTimestamp(),

views:0,

likes:0,

favorites:0,

status:"available"

});

}

export async function getProducts(){

const q=query(

productsRef,

orderBy("createdAt","desc")

);

const snapshot=await getDocs(q);

return snapshot.docs.map(doc=>({

id:doc.id,

...doc.data()

}));

}

export async function getProduct(id:string){

const snapshot=await getDoc(

doc(db,"products",id)

);

if(!snapshot.exists()) return null;

return{

id:snapshot.id,

...snapshot.data()

};

}

export async function updateProduct(id:string,data:any){

await updateDoc(

doc(db,"products",id),

{

...data,

updatedAt:serverTimestamp()

}

);

}

export async function deleteProduct(id:string){

await deleteDoc(

doc(db,"products",id)

);

}

export async function increaseViews(id:string){

await updateDoc(

doc(db,"products",id),

{

views:increment(1)

}

);

}

export async function increaseLikes(id:string){

await updateDoc(

doc(db,"products",id),

{

likes:increment(1)

}

);

}

export async function toggleFeatured(id:string,featured:boolean){

await updateDoc(

doc(db,"products",id),

{

featured

}

);

}

export async function verifyProduct(id:string){

await updateDoc(

doc(db,"products",id),

{

verified:true

}

);

}

export async function markAsSold(id:string){

await updateDoc(

doc(db,"products",id),

{

status:"sold"

}

);

}