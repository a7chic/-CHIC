import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  where
} from "firebase/firestore";

import { db } from "../firebase/config";


// إضافة للمفضلة
export const addFavorite = async (
  userId:string,
  productId:string
) => {

  await addDoc(
    collection(db,"favorites"),
    {
      userId,
      productId,
      createdAt:new Date()
    }
  );

};



// جلب المفضلة
export const getFavorites = async (
  userId:string
) => {

  const q = query(
    collection(db,"favorites"),
    where("userId","==",userId)
  );


  const snapshot = await getDocs(q);


  return snapshot.docs.map(
    item=>({
      id:item.id,
      ...item.data()
    })
  );

};



// حذف من المفضلة
export const removeFavorite = async (
  id:string
) => {

  await deleteDoc(
    doc(db,"favorites",id)
  );

};