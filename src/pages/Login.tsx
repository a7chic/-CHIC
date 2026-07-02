// src/pages/Login.tsx
import React, { useEffect, useRef, useState } from "react";
import styles from "./Login.module.css";
import ThroneSVG from "./ThroneSVG";
import ShieldSVG from "./ShieldSVG";
import { auth } from "../firebase/config"; // حافظت على نفس المسار كما طلبت
import { signInWithPhoneNumber, RecaptchaVerifier, ConfirmationResult } from "firebase/auth";
import { loginUser } from "../services/authService"; // استخدمنا خدمة تسجيل الدخول الموجودة في المشروع
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

type AuthError = { code?: string; message?: string };

export default function Login(): JSX.Element {
  const navigate = useNavigate();
  const { user, refreshUser } = useAuth(); // استخدم الـ hook الموجود لمزامنة الحالة (إن كان متاحًا)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [confirmation, setConfirmation] = useState<ConfirmationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<"owner" | "moderator" | null>(null);

  const recaptchaRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Cleanup recaptcha on unmount to avoid duplication in SPA navigation
    return () => {
      try {
        if ((window as any).recaptchaVerifierInstance) {
          (window as any).recaptchaVerifierInstance.clear?.();
          delete (window as any).recaptchaVerifierInstance;
        }
      } catch {
        // ignore
      }
    };
  }, []);

  function sanitize(value: string) {
    return value.trim();
  }

  function prettyError(err: AuthError) {
    if (!err || !err.code) return "حدث خطأ أثناء محاولة تسجيل الدخول. الرجاء المحاولة لاحقاً.";
    const c = err.code;
    if (c.includes("auth/wrong-password") || c.includes("auth/user-not-found")) return "البريد أو كلمة المرور غير صحيحتين.";
    if (c.includes("auth/too-many-requests")) return "محاولات كثيرة. حاول لاحقًا.";
    if (c.includes("auth/invalid-email")) return "الرجاء إدخال بريد إلكتروني صالح.";
    if (c.includes("auth/invalid-verification-code") || c.includes("auth/invalid-verification-id")) return "رمز التحقق غير صحيح.";
    return "تعذر تسجيل الدخول. الرجاء المحاولة مرة أخرى.";
  }

  async function handleEmailLogin(e?: React.FormEvent) {
    if (e) e.preventDefault();
    if (loading) return;
    setError(null);
    setLoading(true);

    const cleanedEmail = sanitize(email);
    if (!cleanedEmail || !password) {
      setError("الرجاء ملء البريد الإلكتروني وكلمة المرور.");
      setLoading(false);
      return;
    }
    // basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanedEmail)) {
      setError("الرجاء إدخال بريد إلكتروني صالح.");
      setLoading(false);
      return;
    }

    try {
      // استخدمنا loginUser من services/authService كما طلبت
      // loginUser يُفترض أنه يعيد Promise<void> أو يرمز لنجاح/فشل تسجيل الدخول
      await loginUser(cleanedEmail, password);

      // تحديث حالة المستخدم إن كان الـ hook يدعم ذلك
      try { await refreshUser?.(); } catch { /* ignore */ }

      // بعد الدخول نوجّه بناءً على الدور المحدد أو إلى الصفحة الرئيسية
      if (selectedRole === "owner") navigate("/admin");
      else if (selectedRole === "moderator") navigate("/moderator");
      else navigate("/");
    } catch (err: any) {
      setError(prettyError(err));
    } finally {
      setLoading(false);
    }
  }

  async function ensureRecaptcha() {
    if (!recaptchaRef.current) return null;
    if ((window as any).recaptchaVerifierInstance) return (window as any).recaptchaVerifierInstance;
    try {
      const verifier = new RecaptchaVerifier(
        recaptchaRef.current,
        { size: "invisible" },
        auth
      );
      (window as any).recaptchaVerifierInstance = verifier;
      return verifier;
    } catch (err) {
      console.warn("reCAPTCHA init failed", err);
      return null;
    }
  }

  async function handleSendOtp(e?: React.FormEvent) {
    if (e) e.preventDefault();
    if (loading) return;
    setError(null);
    setLoading(true);

    const phoneClean = sanitize(phone);
    if (!phoneClean) {
      setError("الرجاء إدخال رقم الجوال لإرسال رمز التحقق.");
      setLoading(false);
      return;
    }

    try {
      const verifier = await ensureRecaptcha();
      if (!verifier) {
        setError("لا يمكن تهيئة reCAPTCHA. تحقق من إعدادات Firebase.");
        setLoading(false);
        return;
      }
      const confirmationResult = await signInWithPhoneNumber(auth, phoneClean, verifier);
      setConfirmation(confirmationResult);
      setOtpSent(true);
    } catch (err: any) {
      setError(prettyError(err));
    } finally {
      setLoading(false);
    }
  }

  async function handleConfirmOtp(e?: React.FormEvent) {
    if (e) e.preventDefault();
    if (loading) return;
    setError(null);
    setLoading(true);
    try {
      if (!confirmation) {
        setError("لم يتم إرسال رمز التحقق بعد.");
        setLoading(false);
        return;
      }
      await confirmation.confirm(otp);
      try { await refreshUser?.(); } catch { /* ignore */ }
      navigate("/");
    } catch (err: any) {
      setError(prettyError(err));
    } finally {
      setLoading(false);
    }
  }

  function selectRole(role: "owner" | "moderator") {
    setSelectedRole(role);
    // Scroll login card into view (helpful on mobile)
    const form = document.querySelector(`.${styles.cardLogin}`) as HTMLElement | null;
    form?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.brand}>
          <div className={styles.crown} aria-hidden />
          <h1 className={styles.siteTitle}>ANAQA CHIC</h1>
          <p className={styles.tagline}>أناقة تفوق الخيال</p>
        </div>
      </header>

      <main className={styles.container} role="main" aria-labelledby="login-heading">
        <div className={styles.grid}>
          {/* Owner Card */}
          <section className={styles.cardOwner} aria-label="صاحب الموقع">
            <div className={styles.ownerInner}>
              <div className={styles.ownerFrame}>
                <div className={styles.throne}><ThroneSVG /></div>
                <h2 className={styles.ownerTitle}>صاحب موقع &quot;ANAQA CHIC&quot;</h2>
                <p className={styles.ownerDesc}>الإدارة العليا والتحكم الكامل بصلاحيات الموقع.</p>
                <button
                  className={`${styles.btn} ${styles.btnGold} ${styles.btnHero}`}
                  onClick={() => selectRole("owner")}
                  disabled={loading}
                  aria-pressed={selectedRole === "owner"}
                >
                  دخول الإدارة العليا
                </button>
              </div>
            </div>
          </section>

          {/* Moderator Card */}
          <aside className={styles.cardModerator} aria-label="المشرفين">
            <div className={styles.modInner}>
              <div className={styles.shield}><ShieldSVG /></div>
              <h3 className={styles.modTitle}>المشرفين والمراقبين</h3>
              <p className={styles.modDesc}>متابعة وإدارة أقسام الموقع حسب الصلاحيات.</p>
              <button
                className={`${styles.btn} ${styles.btnGold}`}
                onClick={() => selectRole("moderator")}
                disabled={loading}
                aria-pressed={selectedRole === "moderator"}
              >
                دخول المشرفين والمراقبين
              </button>
            </div>
          </aside>

          {/* Login Card */}
          <form className={styles.cardLogin} onSubmit={handleEmailLogin} noValidate aria-live="polite">
            <div className={styles.loginInner}>
              <h2 id="login-heading" className={styles.loginTitle}>تسجيل الدخول</h2>

              {selectedRole && <div className={styles.roleBadge}>{selectedRole === "owner" ? "الإدارة العليا" : "المشرف"}</div>}

              <label className={styles.field}>
                <span className={styles.fieldLabel}>البريد الإلكتروني</span>
                <input
                  id="email"
                  className={styles.input}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  autoComplete="email"
                  disabled={loading}
                  aria-required
                />
              </label>

              <label className={styles.field}>
                <span className={styles.fieldLabel}>كلمة المرور</span>
                <input
                  id="password"
                  className={styles.input}
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  disabled={loading}
                  aria-required
                />
              </label>

              <div className={styles.actionsRow}>
                <button type="submit" className={`${styles.btn} ${styles.btnPrimary}`} disabled={loading}>
                  {loading ? "جاري الدخول..." : "تسجيل الدخول"}
                </button>
                <button
                  type="button"
                  className={`${styles.btn} ${styles.btnGhost}`}
                  onClick={() => { setEmail(""); setPassword(""); setError(null); }}
                  disabled={loading}
                >
                  مسح
                </button>
              </div>

              <div className={styles.orDivider}><span>أو</span></div>

              <div className={styles.otpBlock}>
                <label className={styles.field}>
                  <span className={styles.fieldLabel}>رقم الجوال (لـ OTP)</span>
                  <input
                    className={styles.input}
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+201XXXXXXXXX"
                    disabled={loading || otpSent}
                  />
                </label>

                {!otpSent ? (
                  <button type="button" className={`${styles.btn} ${styles.btnGold}`} onClick={handleSendOtp} disabled={loading}>
                    إرسال رمز التحقق (OTP)
                  </button>
                ) : (
                  <>
                    <label className={styles.field}>
                      <span className={styles.fieldLabel}>أدخل رمز OTP</span>
                      <input
                        className={styles.input}
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="رمز التحقق"
                        disabled={loading}
                      />
                    </label>

                    <div className={styles.actionsRow}>
                      <button type="button" className={`${styles.btn} ${styles.btnPrimary}`} onClick={handleConfirmOtp} disabled={loading}>
                        تأكيد OTP
                      </button>
                      <button type="button" className={`${styles.btn} ${styles.btnGhost}`} onClick={() => { setOtp(""); setOtpSent(false); setConfirmation(null); setError(null); }} disabled={loading}>
                        تغيير/إعادة الرقم
                      </button>
                    </div>
                  </>
                )}

                <div ref={recaptchaRef} id="recaptcha-container" />
              </div>

              <div className={styles.formFooter}>
                <button type="button" className={styles.linkBtn} onClick={() => navigate("/register")} disabled={loading}>
                  إنشاء حساب
                </button>
                <button type="button" className={styles.linkBtn} onClick={() => window.history.back()} disabled={loading}>
                  العودة
                </button>
              </div>

              {error && <div role="alert" className={styles.error}>{error}</div>}
            </div>
          </form>
        </div>
      </main>

      <footer className={styles.footer}>
        <div className={styles.notice}>بعد إدخال بيانات الدخول سيتم إرسال رمز تحقق (OTP) إلى بريدك الإلكتروني أو جوالك للتحقق من هويتك.</div>
        <div className={styles.copy}>© ANAQA CHIC جميع الحقوق محفوظة</div>
      </footer>
    </div>
  );
}