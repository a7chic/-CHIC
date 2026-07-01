import { useEffect, useState } from "react";
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

  const [showOtp, setShowOtp] =
    useState(false);

  const [otpCode, setOtpCode] =
    useState("");

  const [generatedOtp, setGeneratedOtp] =
    useState("");

  const [ownerBanner, setOwnerBanner] =
    useState(false);

  const [backgroundPosition, setBackgroundPosition] =
    useState(0);

  const ownerMessage = `

👑 مرحباً بكم في منصة ANAQA CHIC

نتمنى لكم تجربة تسوق راقية وآمنة.

إذا كان لديكم أي اقتراح أو شكوى
فيرجى التواصل مع إدارة الموقع.

`;

  useEffect(() => {

    const timer = setInterval(() => {

      setBackgroundPosition((v) => v + 1);

    }, 35);

    return () => clearInterval(timer);

  }, []);

  const handleLogin = async (): Promise<void> => {

    if (!email.trim() || !password.trim()) {

      alert("يرجى إدخال البريد الإلكتروني وكلمة المرور.");

      return;

    }

    try {

      setLoading(true);

      const user = await loginUser(

        email.trim(),

        password

      );

      if (!auth.currentUser?.emailVerified) {

        alert("يجب تفعيل البريد الإلكتروني أولاً.");

        return;

      }

      const role = await getUserRole(user.uid);

      if (!role) {

        alert("تعذر العثور على صلاحية الحساب.");

        return;

      }

      if (role !== loginType) {

        alert("ليس لديك صلاحية الدخول لهذا القسم.");

        return;

      }

      const code = Math.floor(

        100000 + Math.random() * 900000

      ).toString();

      setGeneratedOtp(code);

      alert(

        `رمز التحقق الخاص بك: ${code}`

      );

      setShowOtp(true);

    } catch {

      alert(

        "البريد الإلكتروني أو كلمة المرور غير صحيحة."

      );

    } finally {

      setLoading(false);

    }

  };

  const handleVerifyOtp = (): void => {

    if (!otpCode.trim()) {

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

      setOwnerBanner(true);

      setTimeout(() => {

        setOwnerBanner(false);

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

    <>

      {

        ownerBanner && (

          <div

            style={{

              position: "fixed",

              top: 0,

              left: 0,

              right: 0,

              zIndex: 999999,

              overflow: "hidden",

              whiteSpace: "nowrap",

              background:

                "linear-gradient(90deg,#C89D2C,#FFE79D,#C89D2C)",

              color: "#111",

              padding: "10px",

              fontWeight: 700

            }}

          >

            <span

              style={{

                display: "inline-block",

                paddingRight: "100%",

                animation:

                  "ownerBannerMove 18s linear infinite"

              }}

            >

              {ownerMessage}

            </span>

          </div>

        )

      }

      <style>

        {`

          @keyframes ownerBannerMove{

            0%{

              transform:translateX(0);

            }

            100%{

              transform:translateX(-100%);

            }

          }

          @keyframes floatingGlow{

            0%{

              transform:translateY(0px);

            }

            50%{

              transform:translateY(-12px);

            }

            100%{

              transform:translateY(0px);

            }

          }

        `}

      </style>

      <div

        style={{

          minHeight:"100vh",

          width:"100%",

          display:"flex",

          justifyContent:"center",

          alignItems:"center",

          padding:"35px",

          direction:"rtl",

          background:`

          radial-gradient(

          circle at ${backgroundPosition % 100}% 15%,

          rgba(212,175,55,.18),

          transparent 35%

          ),

          linear-gradient(

          160deg,

          #020202,

          #090909,

          #131313,

          #050505

          )

          `,

          transition:"background .2s linear"

        }}

      >

        <div

          style={{

            width:"100%",

            maxWidth:"540px",

            borderRadius:"36px",

            overflow:"hidden",

            border:"1px solid rgba(212,175,55,.35)",

            background:

            "rgba(10,10,10,.92)",

            backdropFilter:"blur(25px)",

            boxShadow:

            "0 30px 80px rgba(0,0,0,.75),0 0 40px rgba(212,175,55,.18)"

          }}

        >

          <div

            style={{

              height:"190px",

              background:`

              linear-gradient(

              135deg,

              #FFEAA6 0%,

              #D4AF37 35%,

              #AE8420 70%,

              #FFEAA6 100%

              )

              `,

              display:"flex",

              flexDirection:"column",

              justifyContent:"center",

              alignItems:"center",

              position:"relative",

              overflow:"hidden"

            }}

          >

            <div

              style={{

                position:"absolute",

                width:"320px",

                height:"320px",

                borderRadius:"50%",

                background:

                "rgba(255,255,255,.10)",

                filter:"blur(50px)",

                animation:

                "floatingGlow 7s ease-in-out infinite"

              }}

            />

            <div

              style={{

                width:"96px",

                height:"96px",

                borderRadius:"50%",

                background:"#fff",

                display:"flex",

                justifyContent:"center",

                alignItems:"center",

                fontSize:"46px",

                boxShadow:

                "0 20px 45px rgba(0,0,0,.25)",

                zIndex:2

              }}

            >

              👑

            </div>

            <h1

              style={{

                marginTop:"18px",

                marginBottom:"6px",

                fontSize:"34px",

                fontWeight:900,

                letterSpacing:"3px",

                color:"#111",

                zIndex:2

              }}

            >

              ANAQA CHIC

            </h1>

            <span

              style={{

                color:"#3A2B00",

                fontWeight:700,

                fontSize:"15px",

                zIndex:2,

                letterSpacing:"2px"

              }}

            >

              Luxury Login Portal

            </span>

          </div>

          <div

            style={{

              padding:"36px"

            }}

          >

          <h2

            style={{

              color:"#ffffff",

              fontSize:"30px",

              fontWeight:800,

              textAlign:"center",

              marginBottom:"8px",

              letterSpacing:"1px"

            }}

          >

            تسجيل الدخول

          </h2>

          <p

            style={{

              color:"#8F8F8F",

              textAlign:"center",

              lineHeight:1.9,

              marginBottom:"34px",

              fontSize:"15px"

            }}

          >

            أهلاً بك في منصة

            <span

              style={{

                color:"#D4AF37",

                fontWeight:700

              }}

            >

              {" "}ANAQA CHIC{" "}

            </span>

            قم بتسجيل الدخول للوصول إلى لوحة التحكم.

          </p>

          {

            !showOtp ? (

              <>

                <input

                  type="email"

                  placeholder="البريد الإلكتروني"

                  value={email}

                  onChange={(e)=>setEmail(e.target.value)}

                  autoComplete="email"

                  style={{

                    width:"100%",

                    height:"60px",

                    background:"#141414",

                    color:"#fff",

                    border:"1px solid rgba(212,175,55,.25)",

                    borderRadius:"18px",

                    padding:"0 22px",

                    fontSize:"15px",

                    outline:"none",

                    marginBottom:"18px",

                    transition:".25s"

                  }}

                />

                <input

                  type="password"

                  placeholder="كلمة المرور"

                  value={password}

                  onChange={(e)=>setPassword(e.target.value)}

                  autoComplete="current-password"

                  style={{

                    width:"100%",

                    height:"60px",

                    background:"#141414",

                    color:"#fff",

                    border:"1px solid rgba(212,175,55,.25)",

                    borderRadius:"18px",

                    padding:"0 22px",

                    fontSize:"15px",

                    outline:"none",

                    marginBottom:"26px",

                    transition:".25s"

                  }}

                />

              </>

            ) : (

              <input

                type="text"

                placeholder="رمز التحقق"

                value={otpCode}

                maxLength={6}

                onChange={(e)=>

                  setOtpCode(

                    e.target.value.replace(/\D/g,"")

                  )

                }

                style={{

                  width:"100%",

                  height:"64px",

                  background:"#141414",

                  color:"#fff",

                  border:"2px solid #D4AF37",

                  borderRadius:"18px",

                  textAlign:"center",

                  letterSpacing:"10px",

                  fontSize:"26px",

                  outline:"none",

                  marginBottom:"26px"

                }}

              />

            )

          }

          <div

            style={{

              display:"grid",

              gap:"15px",

              marginBottom:"28px"

            }}

          >

            <button

              type="button"

              onClick={()=>setLoginType("owner")}

              style={{

                width:"100%",

                height:"66px",

                borderRadius:"20px",

                border:loginType==="owner"

                  ? "2px solid #D4AF37"

                  : "1px solid rgba(255,255,255,.08)",

                background:

                  loginType==="owner"

                  ? "linear-gradient(135deg,#FFE082,#D4AF37,#A77700)"

                  : "#151515",

                color:

                  loginType==="owner"

                  ? "#111"

                  : "#ffffff",

                fontSize:"18px",

                fontWeight:800,

                cursor:"pointer",

                transition:"all .30s",

                boxShadow:

                  loginType==="owner"

                  ? "0 12px 30px rgba(212,175,55,.35)"

                  : "none"

              }}

            >

              👑 صاحب موقع "أناقة CHIC"

            </button>

            <button

              type="button"

              onClick={()=>setLoginType("admin")}

              style={{

                width:"100%",

                height:"66px",

                borderRadius:"20px",

                border:loginType==="admin"

                  ? "2px solid #D4AF37"

                  : "1px solid rgba(255,255,255,.08)",

                background:

                  loginType==="admin"

                  ? "linear-gradient(135deg,#FFE082,#D4AF37,#A77700)"

                  : "#151515",

                color:

                  loginType==="admin"

                  ? "#111"

                  : "#ffffff",

                fontSize:"18px",

                fontWeight:800,

                cursor:"pointer",

                transition:"all .30s",

                boxShadow:

                  loginType==="admin"

                  ? "0 12px 30px rgba(212,175,55,.35)"

                  : "none"

              }}

            >

              🛡️ المشرفين والمراقبين

            </button>

            <button

              type="button"

              onClick={()=>setLoginType("user")}

              style={{

                width:"100%",

                height:"66px",

                borderRadius:"20px",

                border:loginType==="user"

                  ? "2px solid #D4AF37"

                  : "1px solid rgba(255,255,255,.08)",

                background:

                  loginType==="user"

                  ? "linear-gradient(135deg,#FFE082,#D4AF37,#A77700)"

                  : "#151515",

                color:

                  loginType==="user"

                  ? "#111"

                  : "#ffffff",

                fontSize:"18px",

                fontWeight:800,

                cursor:"pointer",

                transition:"all .30s",

                boxShadow:

                  loginType==="user"

                  ? "0 12px 30px rgba(212,175,55,.35)"

                  : "none"

              }}

            >

              👤 المستخدمون والزوار

            </button>

          </div>

          <button

            type="button"

            disabled={loading}

            onClick={

              showOtp

                ? handleVerifyOtp

                : handleLogin

            }

            style={{

              width:"100%",

              height:"68px",

              border:"none",

              borderRadius:"22px",

              cursor:loading

                ? "not-allowed"

                : "pointer",

              background:

                "linear-gradient(135deg,#FFF1B8,#F4D35E,#D4AF37,#A77700)",

              color:"#111",

              fontSize:"19px",

              fontWeight:900,

              letterSpacing:"1px",

              boxShadow:

                "0 18px 40px rgba(212,175,55,.45)",

              transition:"all .30s",

              marginBottom:"24px"

            }}

          >

            {

              loading

                ? "جارٍ التحقق..."

                : showOtp

                ? "🔐 تأكيد رمز التحقق"

                : "🚀 تسجيل الدخول"

            }

          </button>

          <div

            style={{

              display:"flex",

              justifyContent:"space-between",

              alignItems:"center",

              marginBottom:"30px"

            }}

          >

            <Link

              to="/register"

              style={{

                color:"#D4AF37",

                textDecoration:"none",

                fontWeight:700,

                fontSize:"15px"

              }}

            >

              إنشاء حساب جديد

            </Link>

            <Link

              to="/"

              style={{

                color:"#999",

                textDecoration:"none",

                fontSize:"15px"

              }}

            >

              العودة للرئيسية

            </Link>

          </div>

          <div

            style={{

              textAlign:"center",

              color:"#7E7E7E",

              fontSize:"13px",

              lineHeight:2,

              borderTop:"1px solid rgba(255,255,255,.06)",

              paddingTop:"22px"

            }}

          >

            © 2026 ANAQA CHIC

            <br/>

            جميع الحقوق محفوظة

          </div>

        </div>

      </div>

    </>

  );

}