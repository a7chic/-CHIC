import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged,
  sendEmailVerification
} from "firebase/auth";

import {
  doc,
  setDoc,
  getDoc,
  serverTimestamp
} from "firebase/firestore";

import {
  auth,
  db
} from "../firebase/config";

export async function registerUser(
  name: string,
  email: string,
  password: string
) {

  const result =
    await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

  await updateProfile(result.user, {
    displayName: name
  });

  await setDoc(
    doc(db, "users", result.user.uid),
    {
      uid: result.user.uid,
      name,
      email,
      role: "user",
      createdAt: serverTimestamp()
    }
  );

  // إرسال رسالة تفعيل البريد الإلكتروني
  await sendEmailVerification(result.user);

  return result.user;

}

export async function loginUser(
  email: string,
  password: string
) {

  const result =
    await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

  return result.user;

}

export async function logoutUser() {

  await signOut(auth);

}

export function authListener(callback: any) {

  return onAuthStateChanged(
    auth,
    callback
  );

}

// جلب صلاحية المستخدم (owner / admin / user)
export async function getUserRole(uid: string) {

  const snap = await getDoc(
    doc(db, "users", uid)
  );

  if (!snap.exists()) {
    return null;
  }

  return snap.data().role;

}