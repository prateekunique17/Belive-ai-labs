import { useState, useRef } from "react";

// Document icon matching the screenshot
function FileDocIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="join-doc-icon"
      aria-hidden="true"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 2l5 5h-5V4zM6 20V4h5v6h6v10H6z" />
    </svg>
  );
}

/**
 * Isolated Application Submission Handler
 *
 * NOTE FOR BACKEND INTEGRATION:
 * To connect a live backend endpoint, define VITE_APPLY_API_ENDPOINT in your environment (e.g. .env)
 * or update the fetch call below with your actual API route.
 */
async function submitApplication({ fullName, email, resume }) {
  const endpoint = import.meta.env.VITE_APPLY_API_ENDPOINT;

  if (endpoint) {
    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("resume", resume);

    const response = await fetch(endpoint, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(
        `Server returned error: ${response.status} ${response.statusText}`
      );
    }

    return { success: true, live: true };
  }

  // When no backend endpoint is configured:
  // Simulate processing delay for UI demonstration, then return unconfigured notice
  await new Promise((resolve) => setTimeout(resolve, 600));
  return { success: true, live: false };
}

export default function JoinUs() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // 'idle' | 'submitting' | 'success' | 'error'
  const [isLiveBackend, setIsLiveBackend] = useState(false);

  const fileInputRef = useRef(null);

  // File validator (PDF, DOC, DOCX up to 10MB)
  const validateFile = (selectedFile) => {
    if (!selectedFile) return "Resume / CV is required.";
    const validExtensions = [".pdf", ".doc", ".docx"];
    const fileName = selectedFile.name.toLowerCase();
    const hasValidExt = validExtensions.some((ext) => fileName.endsWith(ext));

    if (!hasValidExt) {
      return "Only PDF, DOC, or DOCX files are accepted.";
    }

    if (selectedFile.size > 10 * 1024 * 1024) {
      return "File size exceeds the 10MB limit.";
    }

    return null;
  };

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0];
    if (selected) {
      const err = validateFile(selected);
      if (err) {
        setErrors((prev) => ({ ...prev, resume: err }));
        setFile(null);
      } else {
        setFile(selected);
        setErrors((prev) => ({ ...prev, resume: undefined }));
      }
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      const err = validateFile(droppedFile);
      if (err) {
        setErrors((prev) => ({ ...prev, resume: err }));
        setFile(null);
      } else {
        setFile(droppedFile);
        setErrors((prev) => ({ ...prev, resume: undefined }));
      }
    }
  };

  const handleRemoveFile = (e) => {
    e.stopPropagation();
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validate Full Name
    if (!fullName.trim()) {
      newErrors.fullName = "Please enter your full name.";
    } else if (fullName.trim().length < 2) {
      newErrors.fullName = "Name must be at least 2 characters.";
    }

    // Validate Email
    if (!email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }

    // Validate Resume
    const fileError = validateFile(file);
    if (fileError) {
      newErrors.resume = fileError;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setStatus("submitting");

    try {
      const result = await submitApplication({
        fullName: fullName.trim(),
        email: email.trim(),
        resume: file,
      });

      setIsLiveBackend(result.live);
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrors({
        form: err.message || "An error occurred while submitting. Please try again.",
      });
    }
  };

  const handleReset = () => {
    setFullName("");
    setEmail("");
    setFile(null);
    setErrors({});
    setStatus("idle");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <section className="join-section" id="join" aria-labelledby="join-heading">
      {/* Background overlay for subtle contrast & readability */}
      <div className="join-bg-overlay" aria-hidden="true" />

      {/* ── SECTION HEADER ── */}
      <div className="join-header" data-reveal>
        <p className="join-eyebrow">003 // MEMBERSHIP &amp; ADMISSIONS</p>
        <h2 className="join-heading" id="join-heading">
          JOIN US
        </h2>
        <p className="join-subtext">
          Believe AI Labs is a private community for driven people who are
          willing to work hard, continuously improve, pursue bold ideas, and
          contribute meaningfully.
        </p>
      </div>

      {/* ── APPLICATION FORM CONTAINER ── */}
      <div className="join-card-container" data-reveal>
        {status === "success" ? (
          <div className="join-status-panel" role="status" aria-live="polite">
            <div className="join-status-icon-box" aria-hidden="true">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h3 className="join-status-heading">
              {isLiveBackend
                ? "Application Submitted"
                : "Application Validated"}
            </h3>
            <p className="join-status-copy">
              {isLiveBackend
                ? "Thank you for applying to Believe AI Labs. Our admissions committee will review your application and reach out via email."
                : "Your application fields and resume passed all client-side validation requirements. (Notice: A backend submission endpoint is not yet connected to this project, so no documents were transmitted)."}
            </p>
            <button
              type="button"
              className="join-reset-button"
              onClick={handleReset}
            >
              Submit Another Application
            </button>
          </div>
        ) : (
          <form className="join-form" onSubmit={handleSubmit} noValidate>
            {/* Field 1: Full Name */}
            <div className="join-form-group">
              <label htmlFor="join-full-name" className="join-form-label">
                FULL NAME <span className="join-asterisk">*</span>
              </label>
              <input
                id="join-full-name"
                name="fullName"
                type="text"
                autoComplete="name"
                className={`join-form-input ${
                  errors.fullName ? "input-has-error" : ""
                }`}
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                  if (errors.fullName) {
                    setErrors((prev) => ({ ...prev, fullName: undefined }));
                  }
                }}
                aria-required="true"
                aria-invalid={!!errors.fullName}
                aria-describedby={
                  errors.fullName ? "join-name-error" : undefined
                }
                disabled={status === "submitting"}
              />
              {errors.fullName && (
                <span
                  id="join-name-error"
                  className="join-validation-error"
                  role="alert"
                >
                  {errors.fullName}
                </span>
              )}
            </div>

            {/* Field 2: Email Address */}
            <div className="join-form-group">
              <label htmlFor="join-email" className="join-form-label">
                EMAIL ADDRESS <span className="join-asterisk">*</span>
              </label>
              <input
                id="join-email"
                name="email"
                type="email"
                autoComplete="email"
                className={`join-form-input ${
                  errors.email ? "input-has-error" : ""
                }`}
                placeholder="your@email.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) {
                    setErrors((prev) => ({ ...prev, email: undefined }));
                  }
                }}
                aria-required="true"
                aria-invalid={!!errors.email}
                aria-describedby={
                  errors.email ? "join-email-error" : undefined
                }
                disabled={status === "submitting"}
              />
              {errors.email && (
                <span
                  id="join-email-error"
                  className="join-validation-error"
                  role="alert"
                >
                  {errors.email}
                </span>
              )}
            </div>

            {/* Field 3: Resume / CV */}
            <div className="join-form-group">
              <label htmlFor="join-resume-input" className="join-form-label">
                RESUME / CV (PDF OR DOC) <span className="join-asterisk">*</span>
              </label>

              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                id="join-resume-input"
                name="resume"
                type="file"
                className="join-hidden-file-input"
                accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                onChange={handleFileChange}
                aria-required="true"
                aria-invalid={!!errors.resume}
                aria-describedby={
                  errors.resume ? "join-resume-error" : undefined
                }
                disabled={status === "submitting"}
              />

              {/* Custom drag-and-drop dropzone */}
              <div
                className={`join-dropzone ${isDragging ? "is-dragging" : ""} ${
                  file ? "has-file" : ""
                } ${errors.resume ? "dropzone-has-error" : ""}`}
                onClick={() => fileInputRef.current?.click()}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    fileInputRef.current?.click();
                  }
                }}
                aria-label={
                  file
                    ? `Selected file: ${file.name}. Click to replace.`
                    : "Choose resume file or drag and drop"
                }
              >
                {file ? (
                  <div className="join-selected-file-row">
                    <div className="join-selected-file-details">
                      <FileDocIcon />
                      <span className="join-selected-filename">{file.name}</span>
                      <span className="join-selected-filesize">
                        ({formatFileSize(file.size)})
                      </span>
                    </div>
                    <button
                      type="button"
                      className="join-file-remove-button"
                      onClick={handleRemoveFile}
                      aria-label="Remove selected file"
                      title="Remove file"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <div className="join-dropzone-content">
                    <div className="join-dropzone-primary-line">
                      <FileDocIcon />
                      <span className="join-dropzone-title">
                        Choose file or drag &amp; drop
                      </span>
                    </div>
                    <span className="join-dropzone-subtitle">
                      PDF, DOC, DOCX up to 10MB
                    </span>
                  </div>
                )}
              </div>

              {errors.resume && (
                <span
                  id="join-resume-error"
                  className="join-validation-error"
                  role="alert"
                >
                  {errors.resume}
                </span>
              )}
            </div>

            {/* General form error if any */}
            {errors.form && (
              <div className="join-form-alert" role="alert">
                {errors.form}
              </div>
            )}

            {/* Apply Button */}
            <div className="join-action-row">
              <button
                type="submit"
                className="join-submit-button"
                disabled={status === "submitting"}
                aria-busy={status === "submitting"}
              >
                {status === "submitting" ? (
                  <span className="join-submitting-state">
                    <span className="join-submitting-spinner" aria-hidden="true" />
                    APPLYING...
                  </span>
                ) : (
                  <span>APPLY TO JOIN →</span>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
