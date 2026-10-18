import { useState } from "react";

/**
 * Contact Section — Believe AI Labs
 *
 * Backend integration:
 *   Submits directly to Web3Forms using VITE_WEB3FORMS_ACCESS_KEY.
 */
async function submitContactForm({ name, email, message }) {
  const accessKey =
    import.meta.env.VITE_WEB3FORMS_ACCESS_KEY ||
    "3d1f3e85-8c83-4113-bc2a-348e4bbfee6c";

  const formData = new FormData();
  formData.append("access_key", accessKey);
  formData.append("from_name", "Believe AI Labs Website");
  formData.append("subject", `New Inquiry from ${name} — Let's Connect`);
  formData.append("name", name);
  formData.append("email", email);
  formData.append("message", message);

  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  if (!data.success) {
    throw new Error(data.message || `Server error ${res.status}`);
  }

  return { live: true };
}

export default function Contact() {
  const [name, setName]       = useState("");
  const [email, setEmail]     = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors]   = useState({});
  const [status, setStatus]   = useState("idle"); // idle | submitting | success | error
  const [isLive, setIsLive]   = useState(false);

  const validate = () => {
    const e = {};
    if (!name.trim() || name.trim().length < 2)
      e.name = "Please enter your full name (at least 2 characters).";
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      e.email = "Please enter a valid email address.";
    if (!message.trim() || message.trim().length < 10)
      e.message = "Message must be at least 10 characters.";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setErrors({});
    setStatus("submitting");
    try {
      const result = await submitContactForm({
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
      });
      setIsLive(result.live);
      setStatus("success");
    } catch (err) {
      setErrors({ form: err.message || "Something went wrong. Please try again." });
      setStatus("error");
    }
  };

  const handleReset = () => {
    setName(""); setEmail(""); setMessage("");
    setErrors({}); setStatus("idle");
  };

  return (
    <section className="contact-section" id="contact" aria-labelledby="contact-heading">
      {/* Full-bleed architectural background */}
      <div className="contact-bg" aria-hidden="true" />
      <div className="contact-overlay" aria-hidden="true" />

      <div className="contact-inner">
        {/* ── LEFT — Heading & copy ── */}
        <div className="contact-left" data-reveal>
          <p className="contact-eyebrow">005 // CONTACT</p>
          <h2 className="contact-heading" id="contact-heading">
            LET&rsquo;S<br />CONNECT
          </h2>
          <div className="contact-accent-line" aria-hidden="true" />
          <p className="contact-subtext">
            Have a question, a collaboration idea, or just want to say hi?
            We&rsquo;d love to hear from you.
          </p>
        </div>

        {/* ── RIGHT — Form card ── */}
        <div className="contact-right" data-reveal>
          <div className="contact-form-card">
            <p className="contact-form-label">SEND US A MESSAGE</p>

            {status === "success" ? (
              <div className="contact-success" role="status" aria-live="polite">
                <div className="contact-success-icon" aria-hidden="true">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="contact-success-heading">Message Sent</h3>
                <p className="contact-success-copy">
                  Thank you for reaching out. We&rsquo;ll get back to you soon.
                </p>
                <button type="button" className="contact-reset-btn" onClick={handleReset}>
                  Send Another Message
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit} noValidate>
                {/* Name */}
                <div className="contact-field">
                  <label htmlFor="contact-name" className="contact-field-label">Name</label>
                  <input
                    id="contact-name" type="text" autoComplete="name"
                    className={`contact-input${errors.name ? " has-error" : ""}`}
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => { setName(e.target.value); if (errors.name) setErrors(p => ({ ...p, name: undefined })); }}
                    aria-required="true" aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "contact-name-err" : undefined}
                    disabled={status === "submitting"}
                  />
                  {errors.name && <span id="contact-name-err" className="contact-field-error" role="alert">{errors.name}</span>}
                </div>

                {/* Email */}
                <div className="contact-field">
                  <label htmlFor="contact-email" className="contact-field-label">Email</label>
                  <input
                    id="contact-email" type="email" autoComplete="email"
                    className={`contact-input${errors.email ? " has-error" : ""}`}
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); if (errors.email) setErrors(p => ({ ...p, email: undefined })); }}
                    aria-required="true" aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "contact-email-err" : undefined}
                    disabled={status === "submitting"}
                  />
                  {errors.email && <span id="contact-email-err" className="contact-field-error" role="alert">{errors.email}</span>}
                </div>

                {/* Message */}
                <div className="contact-field">
                  <label htmlFor="contact-message" className="contact-field-label">Message</label>
                  <textarea
                    id="contact-message"
                    className={`contact-input contact-textarea${errors.message ? " has-error" : ""}`}
                    placeholder="Tell us more…"
                    rows={4}
                    value={message}
                    onChange={(e) => { setMessage(e.target.value); if (errors.message) setErrors(p => ({ ...p, message: undefined })); }}
                    aria-required="true" aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "contact-msg-err" : undefined}
                    disabled={status === "submitting"}
                  />
                  {errors.message && <span id="contact-msg-err" className="contact-field-error" role="alert">{errors.message}</span>}
                </div>

                {/* General form error */}
                {errors.form && (
                  <div className="contact-form-alert" role="alert">{errors.form}</div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  className="contact-submit-btn"
                  disabled={status === "submitting"}
                  aria-busy={status === "submitting"}
                >
                  {status === "submitting" ? (
                    <span className="contact-submitting">
                      <span className="contact-spinner" aria-hidden="true" />
                      SENDING…
                    </span>
                  ) : (
                    <span>SEND MESSAGE →</span>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
