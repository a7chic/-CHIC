import Layout from "../components/Layout";

export default function Admin() {
  return (
    <Layout title="غرفة صاحب الموقع">

      <h1
        style={{
          color:"#D4AF37",
          marginBottom:"25px"
        }}
      >
        👑 غرفة صاحب الموقع
      </h1>

      <div
        style={{
          display:"grid",
          gridTemplateColumns:"repeat(auto-fit,minmax(230px,1fr))",
          gap:"20px"
        }}
      >

        {[
          "إدارة الإعلانات",
          "إدارة الكتالوجات",
          "إدارة المستخدمين",
          "إدارة التعليقات",
          "الصلاحيات",
          "لوحة المشرفين",
          "الإحصائيات",
          "سجل العمليات",
          "الإشعارات",
          "الذكاء الصناعي"
        ].map((item)=>(
          <div
            key={item}
            style={{
              background:"#111",
              border:"1px solid #D4AF37",
              borderRadius:"16px",
              padding:"25px",
              textAlign:"center",
              fontWeight:"bold",
              cursor:"pointer"
            }}
          >
            {item}
          </div>
        ))}

      </div>

    </Layout>
  );
}