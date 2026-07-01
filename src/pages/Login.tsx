
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase/config";
import { loginUser } from "../services/authService";

type LoginType =
  | "owner"
  | "admin"
  | "user";

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

  const [stealthMode, setStealthMode] =
    useState(false);

  const [showOwnerMarquee, setShowOwnerMarquee] =
    useState(false);

  const ownerMessage =

    'تم تسجيل دخول صاحب موقع "أناقة CHIC" 👑، نرحب بكم ونتمنى لكم تجربة تسوق استثنائية، وفي حال وجود أي شكوى أو ملاحظة يرجى التواصل مع صاحب الموقع مباشرة.';

  async function handleLogin() {

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

      if (!auth.currentUser?.emailVerified) {

        alert("يجب تفعيل البريد الإلكتروني أولاً.");

        setLoading(false);

        return;

      }

      const code = Math.floor(

        100000 +

        Math.random() * 900000

      ).toString();

      setGeneratedOtp(code);

      alert(

        `رمز التحقق هو : ${code}`

      );

      setShowOtp(true);

    }

    catch {

      alert(

        "البريد الإلكتروني أو كلمة المرور غير صحيحة."

      );

    }

    finally {

      setLoading(false);

    }

  }

  function handleVerifyOtp() {

    if (otpCode !== generatedOtp) {

      alert("رمز التحقق غير صحيح.");

      return;

    }

    if (loginType === "owner") {

      try {

        new Audio(

          "/sounds/owner-login-alert.mp3"

        ).play();

      }

      catch {}

      setShowOwnerMarquee(true);

      setTimeout(() => {

        setShowOwnerMarquee(false);

      }, 20000);

    }

    if (

      loginType === "owner" ||

      loginType === "admin"

    ) {

      navigate("/admin");

      return;

    }

    navigate("/");

  }

  return (

    <>

      <div
        style={{
          minHeight: "100vh",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background:
            "radial-gradient(circle at top,#3a2a10 0%,#080808 45%,#000 100%)",
          padding: "25px",
          boxSizing: "border-box",
          direction: "rtl",
          fontFamily:
            "Tahoma, Arial, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >

        {/* الخلفية الذهبية المتحركة */}

        <div
          style={{
            position:"absolute",
            inset:0,
            background:
              "linear-gradient(120deg,transparent,rgba(212,175,55,.08),transparent)",
            animation:
              "goldMove 8s infinite linear",
          }}
        />

        {/* رسالة دخول صاحب الموقع */}

        {showOwnerMarquee && (

          <div
            style={{
              position:"fixed",
              top:0,
              left:0,
              right:0,
              zIndex:9999,
              background:
                "linear-gradient(90deg,#111,#D4AF37,#111)",
              color:"#000",
              padding:"12px",
              overflow:"hidden",
              whiteSpace:"nowrap",
              fontWeight:900,
            }}
          >

            <span
              style={{
                display:"inline-block",
                animation:
                  "marquee 18s linear infinite",
              }}
            >
              {ownerMessage}
            </span>

          </div>

        )}


        <div
          style={{
            width:"100%",
            maxWidth:"1250px",
            position:"relative",
            zIndex:2,
          }}
        >


          {/* الشعار العلوي */}

          <div
            style={{
              textAlign:"center",
              marginBottom:"45px",
            }}
          >

            <div
              style={{
                fontSize:"55px",
                color:"#D4AF37",
                textShadow:
                  "0 0 30px rgba(212,175,55,.7)",
              }}
            >
              ♛
            </div>


            <h1
              style={{
                margin:0,
                color:"#D4AF37",
                fontSize:"55px",
                letterSpacing:"3px",
                fontFamily:"Georgia,serif",
              }}
            >
              ANAQA CHIC
            </h1>


            <p
              style={{
                color:"#d9b45b",
                fontSize:"18px",
                marginTop:"10px",
              }}
            >
              أناقة تفوق الخيال
            </p>

          </div>


          {/* الحاوية الرئيسية */}

          <div
            style={{
              display:"grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(300px,1fr))",
              gap:"28px",
              alignItems:"stretch",
            }}
          >

            {/* بطاقة صاحب موقع "أناقة CHIC" */}

            <div
              style={{
                background:
                  "linear-gradient(145deg,#111,#050505)",
                border:
                  loginType === "owner"
                    ? "2px solid #D4AF37"
                    : "1px solid rgba(212,175,55,.25)",
                borderRadius:"30px",
                padding:"30px",
                textAlign:"center",
                boxShadow:
                  "0 20px 50px rgba(0,0,0,.6)",
                transition:"all .3s ease",
              }}

              onClick={() =>
                setLoginType("owner")
              }

            >

              <div
                style={{
                  width:"85px",
                  height:"85px",
                  margin:"0 auto 20px",
                  borderRadius:"50%",
                  display:"flex",
                  alignItems:"center",
                  justifyContent:"center",
                  background:
                    "linear-gradient(135deg,#FFE082,#D4AF37)",
                  fontSize:"40px",
                  boxShadow:
                    "0 0 35px rgba(212,175,55,.5)",
                }}
              >
                👑
              </div>


              <h2
                style={{
                  color:"#D4AF37",
                  fontSize:"23px",
                  marginBottom:"12px",
                }}
              >
                صاحب موقع "أناقة CHIC"
              </h2>


              <p
                style={{
                  color:"#aaa",
                  lineHeight:"1.8",
                  fontSize:"14px",
                }}
              >
                الإدارة العليا والتحكم الكامل
                <br />
                بصلاحيات الموقع
              </p>


              <button
                type="button"
                style={{
                  width:"100%",
                  marginTop:"20px",
                  padding:"15px",
                  borderRadius:"18px",
                  border:"none",
                  background:"#D4AF37",
                  color:"#111",
                  fontWeight:"900",
                  cursor:"pointer",
                }}
              >
                دخول الإدارة العليا
              </button>


            </div>



            {/* بطاقة المشرفين والمراقبين */}


            <div
              style={{
                background:
                  "linear-gradient(145deg,#111,#050505)",
                border:
                  loginType === "admin"
                    ? "2px solid #D4AF37"
                    : "1px solid rgba(212,175,55,.25)",
                borderRadius:"30px",
                padding:"30px",
                textAlign:"center",
                boxShadow:
                  "0 20px 50px rgba(0,0,0,.6)",
                transition:"all .3s ease",
              }}

              onClick={() =>
                setLoginType("admin")
              }

            >

              <div
                style={{
                  width:"85px",
                  height:"85px",
                  margin:"0 auto 20px",
                  borderRadius:"50%",
                  display:"flex",
                  alignItems:"center",
                  justifyContent:"center",
                  background:
                    "linear-gradient(135deg,#FFE082,#D4AF37)",
                  fontSize:"40px",
                }}
              >
                🛡️
              </div>


              <h2
                style={{
                  color:"#D4AF37",
                  fontSize:"23px",
                  marginBottom:"12px",
                }}
              >
                المشرفين والمراقبين
              </h2>


              <p
                style={{
                  color:"#aaa",
                  lineHeight:"1.8",
                }}
              >
                متابعة وإدارة أقسام الموقع
                <br />
                حسب الصلاحيات
              </p>


              <button
                type="button"
                style={{
                  width:"100%",
                  marginTop:"20px",
                  padding:"15px",
                  borderRadius:"18px",
                  border:"none",
                  background:"#D4AF37",
                  color:"#111",
                  fontWeight:"900",
                  cursor:"pointer",
                }}
              >
                دخول المشرفين
              </button>


            </div>

            {/* بطاقة المستخدمين والزوار */}

            <div
              style={{
                background:
                  "linear-gradient(145deg,#111,#050505)",
                border:
                  loginType === "user"
                    ? "2px solid #D4AF37"
                    : "1px solid rgba(212,175,55,.25)",
                borderRadius:"30px",
                padding:"30px",
                textAlign:"center",
                boxShadow:
                  "0 20px 50px rgba(0,0,0,.6)",
              }}

              onClick={() =>
                setLoginType("user")
              }

            >

              <div
                style={{
                  width:"85px",
                  height:"85px",
                  margin:"0 auto 20px",
                  borderRadius:"50%",
                  display:"flex",
                  alignItems:"center",
                  justifyContent:"center",
                  background:
                    "linear-gradient(135deg,#FFE082,#D4AF37)",
                  fontSize:"40px",
                }}
              >
                👤
              </div>


              <h2
                style={{
                  color:"#D4AF37",
                  fontSize:"23px",
                  marginBottom:"12px",
                }}
              >
                المستخدمين والزوار
              </h2>


              <p
                style={{
                  color:"#aaa",
                  lineHeight:"1.8",
                }}
              >
                التسوق والاستفادة من خدمات
                <br />
                أناقة CHIC
              </p>


              <button
                type="button"
                style={{
                  width:"100%",
                  marginTop:"20px",
                  padding:"15px",
                  borderRadius:"18px",
                  border:"none",
                  background:"#D4AF37",
                  color:"#111",
                  fontWeight:"900",
                  cursor:"pointer",
                }}
              >
                دخول المستخدمين
              </button>


            </div>


          </div>



          {/* صندوق تسجيل الدخول */}


          <div
            style={{
              marginTop:"40px",
              maxWidth:"500px",
              marginLeft:"auto",
              marginRight:"auto",
              background:
                "rgba(15,15,15,.95)",
              border:
                "1px solid rgba(212,175,55,.3)",
              borderRadius:"30px",
              padding:"35px",
              boxShadow:
                "0 25px 70px rgba(0,0,0,.7)",
            }}
          >


            <h2
              style={{
                color:"#fff",
                textAlign:"center",
                marginBottom:"30px",
                fontSize:"28px",
              }}
            >
              تسجيل الدخول
            </h2>


            {!showOtp ? (

              <>

                <input
                  type="email"
                  placeholder="البريد الإلكتروني"
                  value={email}
                  onChange={(e)=>
                    setEmail(e.target.value)
                  }

                  style={{
                    width:"100%",
                    padding:"17px",
                    borderRadius:"18px",
                    background:"#080808",
                    color:"#fff",
                    border:
                    "1px solid #333",
                    marginBottom:"18px",
                    boxSizing:"border-box",
                    outline:"none",
                  }}
                />


                <input
                  type="password"
                  placeholder="كلمة المرور"
                  value={password}
                  onChange={(e)=>
                    setPassword(e.target.value)
                  }

                  style={{
                    width:"100%",
                    padding:"17px",
                    borderRadius:"18px",
                    background:"#080808",
                    color:"#fff",
                    border:
                    "1px solid #333",
                    marginBottom:"18px",
                    boxSizing:"border-box",
                    outline:"none",
                  }}
                />


              </>

            ) : (

              <input
                type="text"
                placeholder="رمز التحقق OTP"
                value={otpCode}
                maxLength={6}
                onChange={(e)=>
                  setOtpCode(
                    e.target.value.replace(/\D/g,"")
                  )
                }

                style={{
                  width:"100%",
                  padding:"17px",
                  borderRadius:"18px",
                  background:"#080808",
                  color:"#fff",
                  border:
                  "2px solid #D4AF37",
                  textAlign:"center",
                  letterSpacing:"8px",
                  fontSize:"22px",
                  boxSizing:"border-box",
                  outline:"none",
                }}
              />

            )}

            {/* وضع التخفي لصاحب الموقع */}

            {loginType === "owner" && (

              <div
                style={{
                  display:"flex",
                  justifyContent:"space-between",
                  alignItems:"center",
                  background:"#111",
                  padding:"15px",
                  borderRadius:"18px",
                  border:
                    "1px solid rgba(212,175,55,.25)",
                  marginBottom:"20px",
                }}
              >

                <span
                  style={{
                    color:"#D4AF37",
                    fontWeight:700,
                  }}
                >
                  🔴 وضع التخفي
                </span>


                <input
                  type="checkbox"
                  checked={stealthMode}
                  onChange={(e)=>
                    setStealthMode(
                      e.target.checked
                    )
                  }

                  style={{
                    width:"22px",
                    height:"22px",
                    accentColor:"#D4AF37",
                  }}
                />

              </div>

            )}



            {/* زر الدخول الرئيسي */}


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
                padding:"18px",
                borderRadius:"22px",
                border:"none",

                background:
                "linear-gradient(135deg,#FFF0A8,#D4AF37,#8C6500)",

                color:"#111",

                fontSize:"18px",

                fontWeight:900,

                cursor:
                  loading
                  ? "not-allowed"
                  : "pointer",

                boxShadow:
                  "0 15px 40px rgba(212,175,55,.35)",

                marginTop:"20px",

              }}
            >

              {

                loading

                ? "جارٍ التحقق..."

                :

                showOtp

                ? "🔐 تأكيد رمز التحقق"

                :

                "🚀 دخول أناقة CHIC"

              }


            </button>



            <div
              style={{
                marginTop:"28px",
                display:"flex",
                justifyContent:"space-between",
              }}
            >


              <Link
                to="/register"

                style={{
                  color:"#D4AF37",
                  textDecoration:"none",
                  fontWeight:700,
                }}
              >
                إنشاء حساب
              </Link>


              <Link
                to="/"

                style={{
                  color:"#999",
                  textDecoration:"none",
                }}
              >
                العودة
              </Link>


            </div>



            <p
              style={{
                textAlign:"center",
                color:"#666",
                marginTop:"30px",
                fontSize:"13px",
              }}
            >
              © ANAQA CHIC
              <br/>
              جميع الحقوق محفوظة
            </p>


          </div>


        </div>


      </div>



      <style>

        {`

          @keyframes marquee {

            from {

              transform:translateX(100%);

            }

            to {

              transform:translateX(-100%);

            }

          }


          @keyframes goldMove {

            0% {

              transform:translateX(-100%);

            }

            100% {

              transform:translateX(100%);

            }

          }

        `}

      </style>


    </>

  );

}