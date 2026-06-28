import {
collection,
getDocs,
query,
where
} from "firebase/firestore";

import {db} from "../firebase/config";

export async function getAllUsers(){

const snapshot=await getDocs(

collection(db,"users")

);

return snapshot.docs.map(doc=>({

id:doc.id,

...doc.data()

}));

}

export async function getAdmins(){

const q=query(

collection(db,"users"),

where("role","==","admin")

);

const snapshot=await getDocs(q);

return snapshot.docs.map(doc=>({

id:doc.id,

...doc.data()

}));

}