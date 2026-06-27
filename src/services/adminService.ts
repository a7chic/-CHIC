import {
  collection,
  getDocs,
  query,
  where
} from "firebase/firestore";

import { db } from "../firebase/config";


// جلب المستخدمين
export const getAllUsers = async () => {

  const snapshot = await getDocs(
    collection(db,"users")
  );


  return snapshot.docs.map(
    item=>({
      id:item.id,
      ...item.data()
    })
  );

};



// جلب المشرفين
export const getAdmins = async () => {

  const q = query(
    collection(db,"users"),
    where("role","==","admin")
  );


  const snapshot = await getDocs(q);


  return snapshot.docs.map(
    item=>({
      id:item.id,
      ...item.data()
    })
  );

};