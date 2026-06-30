import { doc, getDoc } from "firebase/firestore";
import { db } from "./config";

export async function getUserRole(uid: string): Promise<string> {
  try {
    const ref = doc(db, "users", uid);
    const snap = await getDoc(ref);

    if (!snap.exists()) {
      return "visitor";
    }

    const data = snap.data();

    return data.role ?? "user";
  } catch (error) {
    console.error("خطأ أثناء جلب صلاحية المستخدم:", error);
    return "visitor";
  }
}

export async function isOwner(uid: string): Promise<boolean> {
  const role = await getUserRole(uid);
  return role === "owner";
}

export async function isAdmin(uid: string): Promise<boolean> {
  const role = await getUserRole(uid);
  return role === "admin" || role === "owner";
}