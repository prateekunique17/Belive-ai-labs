export default function BelieveLogo({ size = "small", showSubtitle = true, className = "" }) {
  const isLarge = size === "large";

  return (
    <div className={`believe-brand-logo ${isLarge ? "logo-large" : "logo-small"} ${className}`}>
      <div className="brand-wordmark">
        <img
          src="/images/believe-logo.png"
          alt="Believe"
          className="brand-wordmark-img"
          draggable="false"
        />
      </div>
      {showSubtitle && (
        <div className="brand-subtitle">
          AI LABS
        </div>
      )}
    </div>
  );
}
