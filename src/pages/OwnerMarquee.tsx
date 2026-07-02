// src/pages/OwnerMarquee.tsx
import React, { useEffect } from "react";
import styles from "./Login.module.css";

type Props = {
  visible: boolean;
  onClose?: () => void;
};

/**
 * OwnerMarquee: shows a golden scrolling message when visible === true.
 * It auto-hides after 20s in the parent; this component just animates & shows close button.
 */
const OwnerMarquee: React.FC<Props> = ({ visible, onClose }) => {
  useEffect(() => {
    // accessibility: focus management could be added here if needed
  }, [visible]);

  if (!visible) return null;

  return (
    <div className={styles.marqueeWrap} role="status" aria-live="polite">
      <div className={styles.marqueeInner}>
        <div className={styles.marqueeContent}>
          <span className={styles.marqueeCrown} aria-hidden>👑</span>
          <span>
            تم تسجيل دخول صاحب موقع “ANAQA CHIC”. نرحب بكم ونتمنى لكم تجربة راقية وآمنة داخل الموقع. نسعى دائمًا لتقديم أفضل الخدمات، ولأي ملاحظات أو اقتراحات أو شكاوى يرجى التواصل مع إدارة الموقع مباشرة. شكرًا لثقتكم، ونتمنى لكم تجربة ممتعة ومميزة.
          </span>
        </div>
        <button className={styles.marqueeClose} aria-label="إغلاق" onClick={onClose}>✕</button>
      </div>
    </div>
  );
};

export default OwnerMarquee;