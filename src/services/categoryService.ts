import {
collection,
getDocs
} from "firebase/firestore";

import { db } from "../firebase/config";



export const getCategories = async()=>{


const snapshot =
await getDocs(
collection(db,"categories")
);



return snapshot.docs.map(
item=>({
id:item.id,
...item.data()
})
);


};