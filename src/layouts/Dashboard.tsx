import { Outlet, NavLink } from "react-router-dom";

const menu = [
  { title: "الرئيسية", icon: "🏠", path: "/home" },
  { title: "الحراج", icon: "🛒", path: "/haraj" },
  { title: "الكتالوجات", icon: "👜", path: "/catalog" },
  { title: "المفضلة", icon: "❤️", path: "/favorites" },
  { title: "الإشعارات", icon: "🔔", path: "/notifications" },
  { title: "الرسائل", icon: "💬", path: "/messages" },
  { title: "حسابي", icon: "👤", path: "/profile" },
];

export default function Dashboard() {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#050505",
        color: "#fff",
      }}
    >
      <aside
        style={{
          width: 260,
          background: "#101010",
          borderLeft: "2px solid #D4AF37",
          padding: 20,
        }}
      >
        <h2
          style={{
            color: "#D4AF37",
            marginBottom: 30,
            textAlign: "center",
          }}
        >
          👑 ANAQA CHIC
        </h2>

        {menu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            style={({ isActive }) => ({
              display: "block",
              padding: "15px",
              marginBottom: "10px",
              textDecoration: "none",
              borderRadius: "14px",
              background: isActive ? "#D4AF37" : "#1A1A1A",
              color: isActive ? "#000" : "#FFF",
              fontWeight: "bold",
              transition: ".3s",
            })}
          >
            {item.icon} {item.title}
          </NavLink>
        ))}
      </aside>

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <header
          style={{
            height: 70,
            background: "#111",
            borderBottom: "2px solid #D4AF37",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 25px",
          }}
        >
          <h3 style={{ color: "#D4AF37" }}>
            منصة أناقة CHIC الملكية
          </h3>

          <div
            style={{
              display: "flex",
              gap: 18,
              fontSize: 22,
            }}
          >
            🔔
            💬
            👤
          </div>
        </header>

        <div
          style={{
            background: "#D4AF37",
            color: "#000",
            padding: "10px",
            fontWeight: "bold",
            whiteSpace: "nowrap",
            overflow: "hidden",
          }}
        >
          <marquee>
            ✨ أهلاً بك في منصة أناقة CHIC • جميع العمليات مراقبة • جميع الحقوق محفوظة • رؤية سعودية بتصميم ملكي
          </marquee>
        </div>

        <main
          style={{
            flex: 1,
            padding: 25,
            overflow: "auto",
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}