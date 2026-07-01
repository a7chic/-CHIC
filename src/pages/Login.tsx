import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/config";
import { loginUser } from "../services/authService";

type LoginType = "owner" | "admin" | "user";

export default function Login(): JSX.Element {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [loginType, setLoginType] = useState<LoginType>("owner");

  const [showOtpStep, setShowOtpStep] = useState<boolean>(false);
  const [otpCode, setOtpCode] = useState<string>("");
  const [generatedOtp, setGeneratedOtp] = useState<string>("");

  const [showOwnerMarquee, setShowOwnerMarquee] = useState<boolean>(false);

  const ownerMarqueeText =
    'تم تسجيل دخول صاحب موقع "أناقة CHIC" ويُرحّب بكم جميعًا ويتمنى لكم تجربة تسوق ممتعة ترضي ذائقتكم الرفيعة. ' +
    'يُذكّركم بأن من لديه اقتراح أو ملاحظة أو شكوى على أحد موظفي الموقع أو على أي شخص بسبب النصب أو الاحتيال، ' +
    'يتوجه إلى غرفة صاحب موقع "أناقة CHIC" ويتقدم برسالة مفصلة. ' +
    "وفي حال كانت الشكوى جسيمة فسيتم اتخاذ الإجراءات اللازمة فورًا، سواء من قبل صاحب الموقع أو بإحالة الموضوع إلى الجهات الأمنية المختصة بشكل عاجل، " +
    "حفاظًا على حقوقكم وسلامة تعاملاتكم.";

  const handleInitialLogin = async (): Promise<void> => {
    if (!email || !password) {
      alert("يرجى إدخال البريد الإلكتروني وكلمة المرور.");
      return;
    }

    try {
      setLoading(true);
      await loginUser(email.trim(), password);

      if (!auth.currentUser?.emailVerified) {
        alert("يجب تفعيل البريد الإلكتروني أولاً قبل الدخول.");
        return;
      }

      const randomOtp = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedOtp(randomOtp);

      alert(`تم إرسال رمز التحقق إلى حسابك: ${randomOtp}`);
      setShowOtpStep(true);
    } catch {
      alert("البريد الإلكتروني أو كلمة المرور غير صحيحة.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtpAndRedirect = (): void => {
    if (!otpCode) {
      alert("يرجى إدخال رمز التحقق.");
      return;
    }

    setLoading(true);

    if (otpCode === generatedOtp) {
      if (loginType === "owner") {
        try {
          const audio = new Audio("/sounds/owner-login-alert.mp3");
          audio.volume = 0.9;
          audio.play().catch(() => {});
        } catch {}

        setShowOwnerMarquee(true);
        setTimeout(() => setShowOwnerMarquee(false), 20000);

        setLoading(false);
        navigate("/admin");
        return;
      }

      if (loginType === "admin") {
        setLoading(false);
        navigate("/admin");
        return;
      }

      if (loginType === "user") {
        setLoading(false);
        navigate("/");
        return;
      }
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
        direction: "rtl",
        fontFamily:
          "system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
      }}
    >
      {showOwnerMarquee && (
        <div
          style={{
            position: "fixed",
            top: 0,
            right: 0,
            left: 0,
            zIndex: 9999,
            background:
              "linear-gradient(90deg, rgba(212,175,55,0.2), rgba(212,175,55,0.9), rgba(212,175,55,0.2))",
            padding: "8px 0",
            whiteSpace: "nowrap",
            overflow: "hidden",
          }}
          aria-live="polite"
          role="status"
        >
          <span
            style={{
              display: "inline-block",
              paddingRight: "100%",
              animation: "marqueeOwner 20s linear infinite",
              color: "#000",
              fontWeight: 700,
              fontSize: "14px",
              textAlign: "right",
              letterSpacing: "2px",
            }}
          >
            {ownerMarqueeText}
          </span>
          <style>
            {`
              @keyframes marqueeOwner {
                0% { transform: translateX(0); }
                100% { transform: translateX(-100%); }
              }
            `}
          </style>
        </div>
      )}

      <div
        style={{
          width: "100%",
          maxWidth: "480px",
          background: "linear-gradient(145deg,#111,#050505)",
          border: "2px solid #D4AF37",
          borderRadius: "28px",
          padding: "26px 22px 22px",
          boxShadow: "0 0 35px rgba(212,175,55,.25)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {!showOtpStep ? (
          <>
            <input
              type="email"
              placeholder="البريد الإلكتروني"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              inputMode="email"
              style={{
                width: "100%",
                padding: "14px",
                borderRadius: "12px",
                cursor: "text",
                fontWeight: "bold",
                color: "#fff",
                background: "#111",
                border:
                  loginType === "owner" ? "2px solid #D4AF37" : "1px solid #333",
                marginTop: "14px",
                textAlign: "center",
                letterSpacing: "1px",
                outline: "none",
              }}
            />
            <input
              type="password"
              placeholder="كلمة المرور"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              style={{
                width: "100%",
                padding: "14px",
                borderRadius: "16px",
                cursor: "text",
                fontWeight: "bold",
                color: "#fff",
                background: "#111",
                border: "1px solid #333",
                marginTop: "14px",
                textAlign: "center",
                letterSpacing: "1px",
                outline: "none",
              }}
            />
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="أدخل رمز التحقق المرسل"
              value={otpCode}
              onChange={(e) => setOtpCode(e.target.value)}
              inputMode="numeric"
              autoComplete="one-time-code"
              style={{
                width: "100%",
                padding: "14px",
                borderRadius: "16px",
                cursor: "text",
                fontWeight: "bold",
                color: "#fff",
                background: "#111",
                border: "1px solid #333",
                marginTop: "14px",
                textAlign: "center",
                letterSpacing: "2px",
                outline: "none",
              }}
            />
          </>
        )}

        <button
          type="button"
          disabled={loading}
          onClick={() => setLoginType("owner")}
          style={{
            padding: "14px",
            borderRadius: "16px",
            cursor: "pointer",
            fontWeight: "bold",
            color: loginType === "owner" ? "#fff" : "#aaa",
            background: loginType === "owner" ? "#111" : "transparent",
            border:
              loginType === "owner" ? "2px solid #D4AF37" : "1px solid #333",
            marginTop: "10px",
            width: "100%",
          }}
          aria-pressed={loginType === "owner"}
        >
          صاحب الموقع
        </button>

        <button
          type="button"
          disabled={loading}
          onClick={() => setLoginType("admin")}
          style={{
            padding: "14px",
            borderRadius: "16px",
            cursor: "pointer",
            fontWeight: "bold",
            color: loginType === "admin" ? "#fff" : "#aaa",
            background: loginType === "admin" ? "#111" : "transparent",
            border:
              loginType === "admin" ? "2px solid #D4AF37" : "1px solid #333",
            marginTop: "10px",
            width: "100%",
          }}
          aria-pressed={loginType === "admin"}
        >
          المشرفين والمراقبين
        </button>

        <button
          type="button"
          disabled={loading}
          onClick={() => setLoginType("user")}
          style={{
            padding: "14px",
            borderRadius: "16px",
            cursor: "pointer",
            fontWeight: "bold",
            color: loginType === "user" ? "#fff" : "#aaa",
            background: loginType === "user" ? "#111" : "transparent",
            border:
              loginType === "user" ? "2px solid #D4AF37" : "1px solid #333",
            marginTop: "10px",
            width: "100%",
          }}
          aria-pressed={loginType === "user"}
        >
          المستخدمين والزوار
        </button>

        <button
          type="button"
          onClick={showOtpStep ? handleVerifyOtpAndRedirect : handleInitialLogin}
          disabled={loading}
          style={{
            width: "100%",
            padding: "16px",
            marginTop: "22px",
            background: "#D4AF37",
            borderRadius: "16px",
            fontWeight: "bold",
            color: "#111",
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.8 : 1,
            border: "none",
          }}
          aria-busy={loading}
        >
          {loading
            ? "جارٍ التحقق..."
            : showOtpStep
            ? "تأكيد الرمز ودخول أناقة CHIC"
            : "دخول أناقة CHIC"}
        </button>

        <h2
          style={{
            color: "#f5f5f5",
            marginTop: "12px",
            fontSize: "14px",
            lineHeight: 1.7,
            textAlign: "center",
            fontWeight: 600,
          }}
        >
          أهلاً بكم في موقعنا
          <br />
          "أناقة CHIC" 👑
          <br />
          نورتونا وألف هلا بكم
        </h2>
      </div>
    </div>
  );
}