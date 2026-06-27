import { addDoc,collection } from "firebase/firestore";

import { db } from "./config";

export async function addNotification(

title:string,

message:string,

color:string="gold"

){

await addDoc(

collection(db,"notifications"),

{

title,

message,

color,

createdAt:Date.now(),

read:false

}

);

}