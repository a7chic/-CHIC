// src/services/siteService.ts
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/config";

/**
 * broadcastOwnerLogin - يكتب طابعًا زمنيًا في مستند siteEvents/ownerLogin
 * حتى يتمكن جميع العملاء من الاستماع إليه وعرض الشريط وتشغيل الصوت.
 */
export async function broadcastOwnerLogin(actorUid?: string | null) {
  try {
    const ref = doc(db, "siteEvents", "ownerLogin");
    await setDoc(
      ref,
      {
        lastLogin: serverTimestamp(),
        actorUid: actorUid ?? null
      },
      { merge: true }
    );
  } catch (err) {
    // لا نكسر التدفق في حالة فشل التسجيل؛ فقط نطبع تحذيراً.
    // eslint-disable-next-line no-console
    console.warn("broadcastOwnerLogin failed", err);
  }
}
