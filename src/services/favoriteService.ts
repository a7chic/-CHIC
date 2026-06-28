import {
collection,
addDoc,
deleteDoc,
getDocs,
query,
where,
doc
} from "firebase/firestore";

import { db } from "../firebase/config";

const collectionName="favorites";

export async function addFavorite(data:any){

return await addDoc(

collection(db,collectionName),

data

);

}

export async function getFavorites(userId:string){

const q=query(

collection(db,collectionName),

where("userId","==",userId)

);

const snapshot=await getDocs(q);

return snapshot.docs.map(item=>({

id:item.id,

...item.data()

}));

}

export async function removeFavorite(id:string){

await deleteDoc(

doc(db,collectionName,id)

);

}