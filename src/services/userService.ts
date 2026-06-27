import {
doc,
getDoc,
setDoc,
updateDoc,
serverTimestamp
} from "firebase/firestore";

import { db } from "../firebase/config";

export const createUserProfile = async (
uid:string,
data:any
)=>{

await setDoc(
doc(db,"users",uid),
{
...data,
member:"عادية",
verified:false,
createdAt:serverTimestamp()
}
);

};

export const getUserProfile = async (
uid:string
)=>{

const snapshot=await getDoc(
doc(db,"users",uid)
);

if(!snapshot.exists()) return null;

return{
id:snapshot.id,
...snapshot.data()
};

};

export const updateUserProfile = async(
uid:string,
data:any
)=>{

await updateDoc(
doc(db,"users",uid),
data
);

};

export const verifyUser = async(
uid:string
)=>{

await updateDoc(
doc(db,"users",uid),
{
verified:true
}
);

};

export const upgradeMembership = async(
uid:string,
member:string
)=>{

await updateDoc(
doc(db,"users",uid),
{
member
}
);

};