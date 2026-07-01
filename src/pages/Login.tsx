import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/config";
import { loginUser } from "../services/authService";

type LoginType = "owner" | "admin";

export default function Login(): JSX.Element {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [loginType, setLoginType] = useState<LoginType>("owner");

  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");

  const [ownerMessage, setOwnerMessage] = useState(false);

  const ownerMarquee =
    'تم تسجيل دخول صاحب موقع "أناقة CHIC" 👑 نرحب بكم ونتمنى لكم تجربة راقية وآمنة. ' +
    "للاقتراحات والشكاوى يرجى التواصل مع إدارة الموقع مباشرة حفاظًا على حقوق الجميع.";

  const login = async () => {
    if (!email || !password) {
      alert("أدخل البريد وكلمة المرور");
      return;
    }

    try {
      setLoading(true);

      await loginUser(email.trim(), password);

      if (!auth.currentUser?.emailVerified) {
        alert("يرجى تفعيل البريد الإلكتروني");
        return;
      }

      const code = Math.floor(
        100000 + Math.random() * 900000
      ).toString();

      setGeneratedOtp(code);

      alert("رمز التحقق: " + code);

      setShowOtp(true);

    } catch {
      alert("بيانات الدخول غير صحيحة");
    } finally {
      setLoading(false);
    }
  };


  const verifyOtp = () => {

    if (otp !== generatedOtp) {
      alert("رمز التحقق غير صحيح");
      return;
    }


    if (loginType === "owner") {

      const sound = new Audio(
        "/sounds/owner-login-alert.mp3"
      );

      sound.volume = 0.8;
      sound.play().catch(()=>{});


      setOwnerMessage(true);

      setTimeout(()=>{
        setOwnerMessage(false);
      },20000);


      navigate("/admin");

    } else {

      navigate("/admin");

    }

  };


  return (
    <div
      style={{
        minHeight:"100vh",
        background:"#030303",
        color:"#fff",
        direction:"rtl",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        padding:"20px",
        fontFamily:
        "Cairo, system-ui, sans-serif"
      }}
    >
      {ownerMessage && (
        <div
          style={{
            position:"fixed",
            top:0,
            right:0,
            left:0,
            zIndex:9999,
            background:
            "linear-gradient(90deg,#8b6508,#f5c84c,#8b6508)",
            color:"#000",
            padding:"12px",
            overflow:"hidden",
            fontWeight:"bold"
          }}
        >

          <div
            style={{
              whiteSpace:"nowrap",
              animation:
              "ownerMove 20s linear infinite"
            }}
          >
            {ownerMarquee}
          </div>

          <style>
            {`
              @keyframes ownerMove {
                from {
                  transform:translateX(100%);
                }
                to {
                  transform:translateX(-100%);
                }
              }
            `}
          </style>

        </div>
      )}


      <div
        style={{
          width:"100%",
          maxWidth:"950px",
          background:
          "linear-gradient(145deg,#111,#020202)",
          border:"1px solid #b88920",
          borderRadius:"30px",
          padding:"35px",
          boxShadow:
          "0 0 60px rgba(212,175,55,.25)"
        }}
      >


        <div
          style={{
            textAlign:"center",
            marginBottom:"35px"
          }}
        >

          <div
            style={{
              fontSize:"55px"
            }}
          >
            👑
          </div>


          <h1
            style={{
              color:"#d4af37",
              fontSize:"45px",
              letterSpacing:"3px",
              margin:0
            }}
          >
            AN AQA CHIC
          </h1>


          <p
            style={{
              color:"#d4af37",
              fontSize:"18px"
            }}
          >
            أناقة تفوق الخيال
          </p>

        </div>



        <div
          style={{
            display:"flex",
            gap:"25px",
            alignItems:"stretch",
            justifyContent:"center"
          }}
        >
        {/* صاحب الموقع - الجانب الأيمن */}

        <div
          style={{
            flex:1.4,
            minHeight:"430px",
            background:
            "linear-gradient(160deg,#111,#050505)",
            border:"2px solid #d4af37",
            borderRadius:"25px",
            padding:"25px",
            textAlign:"center",
            display:"flex",
            flexDirection:"column",
            justifyContent:"center",
            boxShadow:
            "0 0 35px rgba(212,175,55,.25)"
          }}
        >

          <div
            style={{
              fontSize:"90px",
              marginBottom:"15px"
            }}
          >
            👑🪑
          </div>


          <h2
            style={{
              color:"#d4af37",
              fontSize:"32px",
              margin:"10px 0"
            }}
          >
            صاحب موقع
            <br/>
            "أناقة CHIC"
          </h2>


          <p
            style={{
              color:"#ddd",
              fontSize:"18px",
              lineHeight:1.8
            }}
          >
            الإدارة العليا والتحكم الكامل
            <br/>
            بصلاحيات الموقع
          </p>


          <button
            type="button"
            onClick={()=>{
              setLoginType("owner");
            }}
            style={{
              marginTop:"25px",
              padding:"16px",
              borderRadius:"15px",
              border:"none",
              background:
              "linear-gradient(90deg,#b88619,#f4d06f)",
              fontSize:"20px",
              fontWeight:"bold",
              cursor:"pointer"
            }}
          >
            👑 دخول الإدارة العليا
          </button>


        </div>



        {/* المشرفين والمراقبين - الجانب الأيسر */}

        <div
          style={{
            flex:0.8,
            minHeight:"330px",
            background:
            "linear-gradient(160deg,#111,#050505)",
            border:"1px solid #d4af37",
            borderRadius:"25px",
            padding:"25px",
            textAlign:"center",
            display:"flex",
            flexDirection:"column",
            justifyContent:"center"
          }}
        >


          <div
            style={{
              fontSize:"55px"
            }}
          >
            🛡️
          </div>


          <h2
            style={{
              color:"#d4af37",
              fontSize:"25px"
            }}
          >
            المشرفين
            <br/>
            والمراقبين
          </h2>


          <p
            style={{
              color:"#ccc",
              lineHeight:1.7
            }}
          >
            متابعة وإدارة أقسام الموقع
            <br/>
            حسب الصلاحيات
          </p>


          <button
            type="button"
            onClick={()=>{
              setLoginType("admin");
            }}
            style={{
              marginTop:"20px",
              padding:"14px",
              borderRadius:"14px",
              border:"none",
              background:
              "linear-gradient(90deg,#b88619,#f4d06f)",
              fontWeight:"bold",
              cursor:"pointer"
            }}
          >
            🛡️ دخول المشرفين
          </button>


        </div>


      </div>
        {/* نموذج تسجيل الدخول */}

        <div
          style={{
            marginTop:"35px",
            background:
            "linear-gradient(160deg,#0d0d0d,#030303)",
            border:"1px solid #8b6508",
            borderRadius:"25px",
            padding:"30px",
          }}
        >

          <h2
            style={{
              textAlign:"center",
              color:"#d4af37",
              fontSize:"30px",
              marginBottom:"25px"
            }}
          >
            ✦ تسجيل الدخول ✦
          </h2>



          {!showOtp ? (

          <>

          <input
            type="email"
            placeholder="البريد الإلكتروني"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            style={{
              width:"100%",
              boxSizing:"border-box",
              padding:"17px",
              marginBottom:"15px",
              borderRadius:"15px",
              background:"#111",
              color:"#fff",
              border:"1px solid #8b6508",
              fontSize:"17px",
              textAlign:"right"
            }}
          />


          <input
            type="password"
            placeholder="كلمة المرور"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            style={{
              width:"100%",
              boxSizing:"border-box",
              padding:"17px",
              marginBottom:"15px",
              borderRadius:"15px",
              background:"#111",
              color:"#fff",
              border:"1px solid #8b6508",
              fontSize:"17px",
              textAlign:"right"
            }}
          />


          </>

          ) : (

          <input
            type="text"
            inputMode="numeric"
            placeholder="أدخل رمز التحقق OTP"
            value={otp}
            onChange={(e)=>setOtp(e.target.value)}
            style={{
              width:"100%",
              boxSizing:"border-box",
              padding:"17px",
              borderRadius:"15px",
              background:"#111",
              color:"#fff",
              border:"1px solid #8b6508",
              fontSize:"18px",
              textAlign:"center"
            }}
          />

          )}




          <button
            type="button"
            disabled={loading}
            onClick={
              showOtp ? verifyOtp : login
            }
            style={{
              width:"100%",
              marginTop:"25px",
              padding:"18px",
              borderRadius:"18px",
              border:"none",
              cursor:"pointer",
              background:
              "linear-gradient(90deg,#b88619,#f4d06f)",
              color:"#000",
              fontSize:"22px",
              fontWeight:"bold",
              boxShadow:
              "0 0 25px rgba(212,175,55,.35)"
            }}
          >

          {loading
          ?
          "جاري التحقق..."
          :
          showOtp
          ?
          "تأكيد الرمز ودخول أناقة CHIC"
          :
          "🔒 دخول الآن"}

          </button>



          <div
            style={{
              display:"flex",
              justifyContent:"space-between",
              marginTop:"25px",
              color:"#d4af37",
              fontSize:"18px"
            }}
          >

            <span
              style={{
                cursor:"pointer"
              }}
            >
              إنشاء حساب جديد
            </span>


            <span
              style={{
                cursor:"pointer"
              }}
            >
              العودة
            </span>


          </div>


        </div>
        </div>


        <div
          style={{
            textAlign:"center",
            marginTop:"35px",
            color:"#777",
            fontSize:"14px"
          }}
        >
          <div
            style={{
              color:"#d4af37",
              fontSize:"22px",
              marginBottom:"8px"
            }}
          >
            👑 ANAQA CHIC
          </div>

          جميع الحقوق محفوظة ©
        </div>


      </div>



      <style>
        {`

        *{
          box-sizing:border-box;
        }


        input::placeholder{
          color:#888;
        }


        button:hover{
          transform:translateY(-2px);
          transition:.3s;
        }


        @media(max-width:800px){

          div[style*="display:flex"]{
            flex-direction:column;
          }


          h1{
            font-size:32px !important;
          }


        }


        `}

      </style>


    </div>

  );

}