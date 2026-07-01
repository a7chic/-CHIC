import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { auth } from "../firebase/config";

import {
  loginUser,
  getUserRole,
} from "../services/authService";

type LoginType = "owner" | "admin" | "user";

export default function Login(): JSX.Element {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [loginType, setLoginType] =
    useState<LoginType>("user");

  const [showOtpStep, setShowOtpStep] =
    useState(false);

  const [otpCode, setOtpCode] =
    useState("");

  const [generatedOtp, setGeneratedOtp] =
    useState("");

  const [showOwnerMarquee, setShowOwnerMarquee] =
    useState(false);

  const [stealthMode, setStealthMode] =
    useState(false);

  const [backgroundMove, setBackgroundMove] =
    useState(0);

  const ownerMarqueeText = `
👑 يرحب بكم صاحب موقع ANAQA CHIC
ويتمنى لكم تجربة تسوق فاخرة وآمنة.

في حال وجود شكوى أو اقتراح
يرجى التواصل مع إدارة الموقع.
`;

  useEffect(() => {

    const timer = setInterval(() => {

      setBackgroundMove((v) => v + 1);

    }, 40);

    return () => clearInterval(timer);

  }, []);

  const handleInitialLogin = async (): Promise<void> => {

    if (!email || !password) {

      alert("يرجى إدخال البريد الإلكتروني وكلمة المرور.");

      return;

    }

    try {

      setLoading(true);

      await loginUser(
        email.trim(),
        password
      );

      if (!auth.currentUser) {

        alert("تعذر تسجيل الدخول.");

        return;

      }

      if (!auth.currentUser.emailVerified) {

        alert("يجب تفعيل البريد الإلكتروني أولاً.");

        return;

      }

      const role =
        await getUserRole(auth.currentUser.uid);

      if (!role) {

        alert("لم يتم العثور على صلاحية الحساب.");

        return;

      }

      if (role !== loginType) {

        alert("هذا الحساب لا يملك صلاحية هذا القسم.");

        return;

      }

      const code =
        Math.floor(
          100000 + Math.random() * 900000
        ).toString();

      setGeneratedOtp(code);

      alert(
        `رمز التحقق: ${code}`
      );

      setShowOtpStep(true);

    } catch {

      alert(
        "البريد الإلكتروني أو كلمة المرور غير صحيحة."
      );

    } finally {

      setLoading(false);

    }

  };

  const handleVerifyOtpAndRedirect = (): void => {

    if (!otpCode) {

      alert("يرجى إدخال رمز التحقق.");

      return;

    }

    if (otpCode !== generatedOtp) {

      alert("رمز التحقق غير صحيح.");

      return;

    }

    if (loginType === "owner") {

      try {

        const audio = new Audio(
          "/sounds/owner-login-alert.mp3"
        );

        audio.volume = 0.9;

        audio.play().catch(() => {});

      } catch {}

      setShowOwnerMarquee(true);

      setTimeout(() => {

        setShowOwnerMarquee(false);

      }, 20000);

      navigate("/admin");

      return;

    }

    if (loginType === "admin") {

      navigate("/admin");

      return;

    }

    navigate("/");

  };

  return (

    <div

      style={{

        minHeight: "100vh",

        width: "100%",

        display: "flex",

        justifyContent: "center",

        alignItems: "center",

        padding: "30px",

        direction: "rtl",

        overflow: "hidden",

        background: `

        radial-gradient(

        circle at ${backgroundMove % 100}% 10%,

        rgba(212,175,55,.18),

        transparent 30%

        ),

        linear-gradient(

        160deg,

        #020202,

        #080808,

        #111111,

        #020202

        )

        `

      }}

    >

      {showOwnerMarquee && (

        <div

          style={{

            position: "fixed",

            top: 0,

            left: 0,

            right: 0,

            zIndex: 99999,

            overflow: "hidden",

            whiteSpace: "nowrap",

            background:

              "linear-gradient(90deg,#D4AF37,#FFE9A0,#D4AF37)",

            color: "#000",

            padding: "10px 0",

            fontWeight: 700,

            boxShadow: "0 8px 25px rgba(212,175,55,.35)"

          }}

        >

          <span

            style={{

              display: "inline-block",

              paddingRight: "100%",

              animation: "ownerMarquee 18s linear infinite"

            }}

          >

            {ownerMarqueeText}

          </span>

          <style>

            {`

            @keyframes ownerMarquee{

              from{

                transform:translateX(0);

              }

              to{

                transform:translateX(-100%);

              }

            }

            `}

          </style>

        </div>

      )}

      <div

        style={{

          width: "100%",

          maxWidth: "520px",

          background:

            "linear-gradient(180deg,#171717,#090909)",

          borderRadius: "34px",

          border: "1px solid rgba(212,175,55,.45)",

          boxShadow:

            "0 25px 70px rgba(0,0,0,.75),0 0 35px rgba(212,175,55,.18)",

          overflow: "hidden",

          backdropFilter: "blur(18px)",

          position: "relative"

        }}

      >

        <div

          style={{

            height: "160px",

            background:

              "linear-gradient(135deg,#F6D365,#D4AF37,#8F6B12)",

            display: "flex",

            flexDirection: "column",

            justifyContent: "center",

            alignItems: "center",

            color: "#111",

            position: "relative"

          }}

        >

          <div

            style={{

              width: "88px",

              height: "88px",

              borderRadius: "50%",

              background: "#fff",

              display: "flex",

              justifyContent: "center",

              alignItems: "center",

              fontSize: "42px",

              boxShadow:

                "0 15px 35px rgba(0,0,0,.25)"

            }}

          >

            👑

          </div>

          <h1

            style={{

              marginTop: "16px",

              marginBottom: 0,

              fontSize: "30px",

              fontWeight: 800,

              letterSpacing: "2px"

            }}

          >

            ANAQA CHIC

          </h1>

        </div>

        <div

          style={{

            padding: "34px"

          }}

        >

      {showOwnerMarquee && (

        <div

          style={{

            position: "fixed",

            top: 0,

            left: 0,

            right: 0,

            zIndex: 99999,

            overflow: "hidden",

            whiteSpace: "nowrap",

            background:

              "linear-gradient(90deg,#D4AF37,#FFE9A0,#D4AF37)",

            color: "#000",

            padding: "10px 0",

            fontWeight: 700,

            boxShadow: "0 8px 25px rgba(212,175,55,.35)"

          }}

        >

          <span

            style={{

              display: "inline-block",

              paddingRight: "100%",

              animation: "ownerMarquee 18s linear infinite"

            }}

          >

            {ownerMarqueeText}

          </span>

          <style>

            {`

            @keyframes ownerMarquee{

              from{

                transform:translateX(0);

              }

              to{

                transform:translateX(-100%);

              }

            }

            `}

          </style>

        </div>

      )}

      <div

        style={{

          width: "100%",

          maxWidth: "520px",

          background:

            "linear-gradient(180deg,#171717,#090909)",

          borderRadius: "34px",

          border: "1px solid rgba(212,175,55,.45)",

          boxShadow:

            "0 25px 70px rgba(0,0,0,.75),0 0 35px rgba(212,175,55,.18)",

          overflow: "hidden",

          backdropFilter: "blur(18px)",

          position: "relative"

        }}

      >

        <div

          style={{

            height: "160px",

            background:

              "linear-gradient(135deg,#F6D365,#D4AF37,#8F6B12)",

            display: "flex",

            flexDirection: "column",

            justifyContent: "center",

            alignItems: "center",

            color: "#111",

            position: "relative"

          }}

        >

          <div

            style={{

              width: "88px",

              height: "88px",

              borderRadius: "50%",

              background: "#fff",

              display: "flex",

              justifyContent: "center",

              alignItems: "center",

              fontSize: "42px",

              boxShadow:

                "0 15px 35px rgba(0,0,0,.25)"

            }}

          >

            👑

          </div>

          <h1

            style={{

              marginTop: "16px",

              marginBottom: 0,

              fontSize: "30px",

              fontWeight: 800,

              letterSpacing: "2px"

            }}

          >

            ANAQA CHIC

          </h1>

        </div>

        <div

          style={{

            padding: "34px"

          }}

        >

      {showOwnerMarquee && (

        <div

          style={{

            position: "fixed",

            top: 0,

            left: 0,

            right: 0,

            zIndex: 99999,

            overflow: "hidden",

            whiteSpace: "nowrap",

            background:

              "linear-gradient(90deg,#D4AF37,#FFE9A0,#D4AF37)",

            color: "#000",

            padding: "10px 0",

            fontWeight: 700,

            boxShadow: "0 8px 25px rgba(212,175,55,.35)"

          }}

        >

          <span

            style={{

              display: "inline-block",

              paddingRight: "100%",

              animation: "ownerMarquee 18s linear infinite"

            }}

          >

            {ownerMarqueeText}

          </span>

          <style>

            {`

            @keyframes ownerMarquee{

              from{

                transform:translateX(0);

              }

              to{

                transform:translateX(-100%);

              }

            }

            `}

          </style>

        </div>

      )}

      <div

        style={{

          width: "100%",

          maxWidth: "520px",

          background:

            "linear-gradient(180deg,#171717,#090909)",

          borderRadius: "34px",

          border: "1px solid rgba(212,175,55,.45)",

          boxShadow:

            "0 25px 70px rgba(0,0,0,.75),0 0 35px rgba(212,175,55,.18)",

          overflow: "hidden",

          backdropFilter: "blur(18px)",

          position: "relative"

        }}

      >

        <div

          style={{

            height: "160px",

            background:

              "linear-gradient(135deg,#F6D365,#D4AF37,#8F6B12)",

            display: "flex",

            flexDirection: "column",

            justifyContent: "center",

            alignItems: "center",

            color: "#111",

            position: "relative"

          }}

        >

          <div

            style={{

              width: "88px",

              height: "88px",

              borderRadius: "50%",

              background: "#fff",

              display: "flex",

              justifyContent: "center",

              alignItems: "center",

              fontSize: "42px",

              boxShadow:

                "0 15px 35px rgba(0,0,0,.25)"

            }}

          >

            👑

          </div>

          <h1

            style={{

              marginTop: "16px",

              marginBottom: 0,

              fontSize: "30px",

              fontWeight: 800,

              letterSpacing: "2px"

            }}

          >

            ANAQA CHIC

          </h1>

        </div>

        <div

          style={{

            padding: "34px"

          }}

        >

          <button

            type="button"

            disabled={loading}

            onClick={
              showOtpStep
                ? handleVerifyOtpAndRedirect
                : handleInitialLogin
            }

            style={{

              width:"100%",

              height:"62px",

              border:"none",

              borderRadius:"18px",

              background:

                "linear-gradient(135deg,#FFE082,#D4AF37,#8C6A00)",

              color:"#111",

              fontWeight:900,

              fontSize:"18px",

              cursor:loading

                ? "not-allowed"

                : "pointer",

              boxShadow:

                "0 12px 35px rgba(212,175,55,.45)",

              transition:"all .25s"

            }}

          >

            {

              loading

                ? "جارٍ التحقق..."

                : showOtpStep

                ? "تأكيد رمز التحقق"

                : "تسجيل الدخول"

            }

          </button>

          <div

            style={{

              marginTop:"28px",

              display:"flex",

              justifyContent:"space-between",

              alignItems:"center"

            }}

          >

            <Link

              to="/register"

              style={{

                color:"#D4AF37",

                textDecoration:"none",

                fontWeight:700

              }}

            >

              إنشاء حساب

            </Link>

            <Link

              to="/"

              style={{

                color:"#999",

                textDecoration:"none"

              }}

            >

              العودة

            </Link>

          </div>

        </div>

      </div>

    </div>

  );

}