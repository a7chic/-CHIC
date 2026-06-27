import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy
} from "firebase/firestore";

import { db } from "../firebase/config";


// إنشاء إشعار
export const createNotification = async (
  userId:string,
  message:string
) => {

  await addDoc(
    collection(db,"notifications"),
    {
      userId,
      message,
      read:false,
      createdAt:new Date()
    }
  );

};



// جلب إشعارات المستخدم
export const getNotifications = async (
  userId:string
) => {

  const q = query(
    collection(db,"notifications"),
    where("userId","==",userId),
    orderBy("createdAt","desc")
  );


  const snapshot = await getDocs(q);


  return snapshot.docs.map(
    item=>({
      id:item.id,
      ...item.data()
    })
  );

};