import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase/config";
import { loginUser } from "../services/authService";

export default function Login() {
  const navigate = useNavigate();

  // حالات الحقول الأساسية
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginType, setLoginType] = useState<"owner" | "admin">("owner");
  const [stealth, setStealth] = useState(false);

  // حالات مرحلة رمز التحقق (OTP)
  const [showOtpStep, setShowOtpStep] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState(""); // لتخزين الرمز السري المرسل للمستخدم

  // الدالة الأولى: التحقق من الإيميل والباسورد وتوليد رمز التحقق
  const handleInitialLogin = async () => {
    if (!email || !password) {
      alert("يرجى إدخال البريد الإلكتروني وكلمة المرور");
      return;
    }

    try {
      setLoading(true);

      // 1. محاولة تسجيل الدخول عبر الخدمة الخاصة بك
      await loginUser(email.trim(), password);

      // 2. التحقق الإجباري من تفعيل البريد الإلكتروني
      if (!auth.currentUser?.emailVerified) {
        alert("يجب تفعيل البريد الإلكتروني أولاً قبل الدخول.");
        return;
      }

      // 3. توليد رمز تحقق عشوائي من 6 أرقام (يمكنك استبدال هذا السطر بربطه بخدمة إرسال إيميل أو SMS)
      const randomOtp = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedOtp(randomOtp);
      
      // تنبيه مؤقت بالرمز (لأغراض الفحص، استبدله بـ كود إرسال حقيقي للايميل)
      alert(`تم إرسال رمز التحقق إلى حسابك: ${randomOtp}`);

      // الانتقال لمرحلة طلب رمز التحقق واختفاء حقول الإيميل
      setShowOtpStep(true);

    } catch (error) {
      alert("البريد الإلكتروني أو كلمة المرور غير صحيحة");
    } finally {
      setLoading(false);
    }
  };

  // الدالة الثانية: فحص رمز التحقق النهائي والتوجيه للموقع
  const handleVerifyOtpAndRedirect = () => {
    if (!otpCode) {
      alert("يرجى إدخال رمز التحقق");
      return;
    }

    setLoading(true);

    // مقارنة الرمز المدخل بالرمز الذي تم توليده وإرساله
    if (otpCode === generatedOtp) {
      // الرمز صحيح -> يتم السماح بالدخول والتوجيه بناء على الرتبة
      if (loginType === "owner") {
        navigate("/admin");
        return;
      }
      navigate("/admin");
    } else {
      alert("رمز التحقق غير صحيح، يرجى المحاولة مرة أخرى.");
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#050505",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "430px",
          background: "linear-gradient(145deg,#111,#050505)",
          border: "2px solid #D4AF37",
          borderRadius: "28px",
          padding: "30px",
          boxShadow: "0 0 35px rgba(212,175,55,.25)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "25px" }}>
          <h1 style={{ margin: 0, color: "#D4AF37", fontSize: "34px" }}>
            👑 ANAQA CHIC
          </h1>
          <p style={{ color: "#aaa", marginTop: "12px" }}>
            {!showOtpStep ? "تسجيل الدخول إلى حسابك" : "التحقق من الهوية والأمان"}
          </p>
        </div>

        {/* المظهر الأول: حقول الإيميل والباسورد */}
        {!showOtpStep ? (
          <>
            <div style={{ display: "grid", gap: "12px", marginBottom: "25px" }}>
              <button
                onClick={() => setLoginType("owner")}
                style={{
                  padding: "15px",
                  borderRadius: "15px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  color: "#fff",
                  background: "#111",
                  border: loginType === "owner" ? "2px solid #D4AF37" : "1px solid #333",
                }}
              >
                👑 صاحب الموقع
                <span style={{ display: "block", fontSize: "12px", color: "#aaa", marginTop: "5px" }}>
                  دخول الإدارة العليا
                </span>
              </button>

              <button
                onClick={() => setLoginType("admin")}
                style={{
                  padding: "15px",
                  borderRadius: "15px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  color: "#fff",
                  background: "#111",
                  border: loginType === "admin" ? "2px solid #D4AF37" : "1px solid #333",
                }}
              >
                🛡️ المشرفون
                <span style={{ display: "block", fontSize: "12px", color: "#aaa", marginTop: "5px" }}>
                  فريق إدارة ANAQA CHIC
                </span>
              </button>
            </div>

            <input
              type="email"
              placeholder="البريد الإلكتروني"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                padding: "15px",
                marginBottom: "15px",
                borderRadius: "12px",
                border: "1px solid #333",
                background: "#1a1a1a",
                color: "#fff",
                boxSizing: "border-box",
              }}
            />

            <input
              type="password"
              placeholder="كلمة المرور"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "15px",
                marginBottom: "20px",
                borderRadius: "12px",
                border: "1px solid #333",
                background: "#1a1a1a",
                color: "#fff",
                boxSizing: "border-box",
              }}
            />

            {loginType === "owner" && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  background: "#111",
                  border: "1px solid #333",
                  padding: "12px",
                  borderRadius: "12px",
                  marginBottom: "20px",
                }}
              >
                <div style={{ color: "#fff", fontSize: "14px" }}>🔴 وضع التخفي</div>
                <input
                  type="checkbox"
                  checked={stealth}
                  onChange={(e) => setStealth(e.target.checked)}
                  style={{ width: "20px", height: "20px", accentColor: "#D4AF37" }}
                />
              </div>
            )}

            <button
              onClick={handleInitialLogin}
              disabled={loading}
              style={{
                width: "100%",
                padding: "16px",
                border: "none",
                borderRadius: "14px",
                background: "#D4AF37",
                color: "#000",
                fontWeight: "bold",
                fontSize: "17px",
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? "جاري التحقق من الحساب..." : "التالي لطلب رمز التحقق"}
            </button>
          </>
        ) : (
          /* المظهر الثاني: حقل إدخال رمز التحقق OTP الإجباري بعد تخطي المرحلة الأولى */
          <>
            <div style={{ textAlign: "center", marginBottom: "20px", color: "#E5C158" }}>
              🔐 يرجى إدخال رمز التحقق المكون من 6 أرقام لإتمام الدخول الآمن.
            </div>

            <input
              type="text"
              maxLength={6}
              placeholder="أدخل رمز التحقق (OTP)"
              value={otpCode}
              onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ""))} // يقبل أرقام فقط
              style={{
                width: "100%",
                padding: "15px",
                marginBottom: "20px",
                borderRadius: "12px",
                border: "2px solid #D4AF37",
                background: "#1a1a1a",
                color: "#fff",
                textAlign: "center",
                fontSize: "20px",
                letterSpacing: "4px",
                boxSizing: "border-box",
              }}
            />

            <button
              onClick={handleVerifyOtpAndRedirect}
              style={{
                width: "100%",
                padding: "16px",
                border: "none",
                borderRadius: "14px",
                background: "#D4AF37",
                color: "#000",
                fontWeight: "bold",
                fontSize: "17px",
                cursor: "pointer",
              }}
            >
              تأكيد الرمز ودخول ANAQA CHIC
            </button>

            <button
              onClick={() => setShowOtpStep(false)}
              style={{
                width: "100%",
                padding: "10px",
                background: "transparent",
                border: "none",
                color: "#aaa",
                marginTop: "10px",
                cursor: "pointer",
                fontSize: "14px",
                textDecoration: "underline",
              }}
            >
              الرجوع لتعديل البيانات
            </button>
          </>
        )}

<div
  style={{
    marginTop: "25px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  }}
>

  <Link
    to="/register"
    style={{
      color: "#D4AF37",
      textDecoration: "none",
    }}
  >
    إنشاء حساب
  </Link>


  <Link
    to="/"
    style={{
      color: "#999",
      textDecoration: "none",
    }}
  >
    العودة
  </Link>

</div>
</div>

</div>


);

}