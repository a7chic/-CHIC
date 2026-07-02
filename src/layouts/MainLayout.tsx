// src/layouts/MainLayout.tsx
import React, { useEffect, useRef, useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";

import { logoutUser } from "../services/authService";
import Footer from "../components/Footer";
import OwnerMarquee from "../pages/OwnerMarquee";
import { doc, onSnapshot, Timestamp } from "firebase/firestore";
import { db } from "../firebase/config";

export default function MainLayout(){

  const navigate = useNavigate();

  const logout = async()=>{
    await logoutUser();
    navigate("/login");
  };

  const menu=[
    ["🏠","/home","الرئيسية"],
    ["🛒","/haraj","الحراج"],
    ["👗","/catalog","الكتالوج"],
    ["❤️","/favorites","المفضلة"],
    ["🔔","/notifications","الإشعارات"],
    ["👤","/profile","حسابي"]
  ];

  // Global marquee state triggered by site-wide owner-login events
  const [showGlobalMarquee, setShowGlobalMarquee] = useState(false);
  const marqueeTimerRef = useRef<number | null>(null);
  const lastSeenTsRef = useRef<number | null>(null);

  useEffect(() => {
    const ref = doc(db, "siteEvents", "ownerLogin");
    const unsub = onSnapshot(ref, (snap) => {
      if (!snap.exists()) return;
      const data = snap.data() as { lastLogin?: any; actorUid?: string | null };
      const tsField = data.lastLogin;
      if (!tsField) return;

      // Firestore Timestamp -> millis
      let millis = 0;
      if (tsField instanceof Timestamp) {
        millis = tsField.toMillis();
      } else if (typeof tsField === "object" && (tsField as any).seconds) {
        millis = (tsField as any).seconds * 1000 + ((tsField as any).nanoseconds ? (tsField as any).nanoseconds / 1e6 : 0);
      } else {
        millis = new Date(tsField).getTime();
      }

      const now = Date.now();
      const delta = now - millis;

      // Only trigger if event recent (<= 25s) to avoid showing very old events on new page loads.
      if (delta <= 25000) {
        // avoid retriggering for same timestamp multiple times
        if (lastSeenTsRef.current && lastSeenTsRef.current === millis) return;
        lastSeenTsRef.current = millis;

        // show marquee
        setShowGlobalMarquee(true);
        if (marqueeTimerRef.current) window.clearTimeout(marqueeTimerRef.current);
        marqueeTimerRef.current = window.setTimeout(() => setShowGlobalMarquee(false), 20000);

        // Play sound using the exact snippet requested
        try {
          const sound = new Audio("/sounds/owner-login-alert.mp3");
          sound.volume = 0.8;
          sound.play().catch(() => {});
        } catch {
          // swallow
        }
      }
    });

    return () => {
      unsub();
      if (marqueeTimerRef.current) {
        window.clearTimeout(marqueeTimerRef.current);
      }
    };
  }, []);

  return(

  <div
  style={{
  background:"#050505",
  minHeight:"100vh",
  color:"#fff",
  direction:"rtl"
  }}
  >

    {/* Global Owner Marquee shown when owner-login event occurs */}
    <OwnerMarquee visible={showGlobalMarquee} onClose={() => setShowGlobalMarquee(false)} />

    <header
    style={{
    background:"linear-gradient(145deg,#111,#050505)",
    borderBottom:"2px solid #D4AF37",
    padding:"18px 20px",
    display:"flex",
    justifyContent:"space-between",
    alignItems:"center",
    flexWrap:"wrap",
    gap:"15px",
    boxShadow:"0 5px 25px rgba(212,175,55,.15)"
    }}
    >

    <h2
    style={{
    margin:0,
    color:"#D4AF37",
    fontSize:"26px"
    }}
    >

    👑 ANAQA CHIC

    </h2>

    <nav
    style={{
    display:"flex",
    gap:"10px",
    flexWrap:"wrap",
    justifyContent:"center"
    }}
    >

    {
    menu.map(item=>
    <NavLink
    key={item[1]}
    to={item[1]}
    style={({isActive})=>({
    padding:"10px 14px",
    borderRadius:"12px",
    textDecoration:"none",
    background:isActive
    ?
    "#D4AF37"
    :
    "transparent",
    color:isActive
    ?
    "#000"
    :
    "#fff",
    fontWeight:"bold",
    border:"1px solid #333"
    })}
    >
    {item[0]} {item[2]}
    </NavLink>
    )
    }
    </nav>

    <button
    onClick={logout}
    style={{
    background:"#D4AF37",
    border:"none",
    padding:"12px 20px",
    borderRadius:"12px",
    fontWeight:"bold",
    cursor:"pointer"
    }}
    >
    تسجيل الخروج
    </button>

    </header>

    <main
    style={{
    padding:"20px",
    maxWidth:"1450px",
    margin:"0 auto"
    }}
    >

    <Outlet/>

    </main>

    <Footer/>

  </div>

  );

}
