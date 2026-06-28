import {
collection,
addDoc,
deleteDoc,
doc,
getDocs,
query,
where
} from "firebase/firestore";

import { db } from "../firebase/config";

export async function addFavorite(data:any){

return await addDoc(
collection(db,"favorites"),
data
);

}

export async function getFavorites(userId:string){

const q=query(
collection(db,"favorites"),
where("userId","==",userId)
);

const snapshot=await getDocs(q);

return snapshot.docs.map(doc=>({
id:doc.id,
...doc.data()
}));

}

export async function removeFavorite(id:string){

await deleteDoc(
doc(db,"favorites",id)
);

}