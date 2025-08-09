import styles from "./cta.module.css";

export function CtaButton({ href = "#join", children = "Get Instant Access", ...props }) {
  return (
    <a href={href} className={`${styles.cta} focus:outline-none`} {...props}>
      <span className={styles.glow} aria-hidden />
      <span className={styles.pulse} aria-hidden />
      <span className={styles.label}>
        <svg aria-hidden focusable="false" viewBox="0 0 24 24" className="w-4 h-4">
          <path
            fill="currentColor"
            d="M12 2l3 7h7l-5.5 4 2.5 7-7-5-7 5 2.5-7L2 9h7z"
          />
        </svg>
        {children}
      </span>
    </a>
  );
}

export default CtaButton;


