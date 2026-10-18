import { useEffect } from "react";

export default function TermsModal({ isOpen, onClose }) {
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="terms-modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="terms-modal-title"
    >
      <div
        className="terms-modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="terms-modal-header">
          <div className="terms-modal-header-brand">
            <span className="terms-brand-eyebrow">BELIEVE AI LABS</span>
            <h2 id="terms-modal-title" className="terms-modal-title">
              TERMS AND CONDITIONS OF MEMBERSHIP
            </h2>
          </div>
          <button
            type="button"
            className="terms-modal-close-btn"
            onClick={onClose}
            aria-label="Close Terms and Conditions"
          >
            ✕
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="terms-modal-body">
          <p className="terms-preamble">
            Believe Ai Labs is established for individuals who are committed to
            personal growth and are prepared to work diligently toward it. The
            Society is a private association of members who value effort over
            excuses, integrity over appearance, and progress over comfort. Every
            member undertakes to support fellow members and to uphold the
            standards for which the Society stands.
          </p>

          <div className="terms-sections-list">
            <div className="terms-section-block">
              <h3>1. Membership</h3>
              <p>
                Membership of the Society is open to male individuals aged
                eighteen (18) years or above who seek admission voluntarily and
                are approved by the Leaders. Each member shall read, understand,
                and sign these Terms and Conditions prior to admission.
              </p>
            </div>

            <div className="terms-section-block">
              <h3>2. Decision Making</h3>
              <p>
                The Leaders shall manage the day-to-day affairs of the Society,
                while major decisions shall be taken by a majority vote of the
                members. Each member shall have one vote, and a decision shall be
                binding once duly recorded.
              </p>
            </div>

            <div className="terms-section-block">
              <h3>3. Confidentiality</h3>
              <p>
                Members shall not disclose the existence of the Society, the
                identity of its members, or any information shared within the
                Society to any person outside it. This obligation shall continue
                to apply after a member ceases to be a member.
              </p>
            </div>

            <div className="terms-section-block">
              <h3>4. Code and Repository Security</h3>
              <p>
                Members shall keep all private repositories, API keys, passwords,
                credentials, internal documents, and unreleased code strictly
                within the Society and shall not share them with any outside
                party. Credentials shall never be committed to GitHub or to any
                other code repository.
              </p>
            </div>

            <div className="terms-section-block">
              <h3>5. Acceptable Use of AI</h3>
              <p>
                <strong>(a) Role of AI.</strong> AI tools shall be used only as a
                helper and shall not be relied upon to take decisions for the
                Society or its members. All decisions shall remain with the
                members and the Leaders.
              </p>
              <p>
                <strong>(b) Prohibited Use.</strong> Members shall not use AI tools
                to generate malicious code, plagiarize research, expose
                confidential information, or violate the rights of any third
                party. Any such use shall be treated as a breach of these Terms
                and Conditions.
              </p>
              <p>
                <strong>(c) Responsibility for Output.</strong> Each member is
                responsible for reviewing and verifying any AI-generated output
                before using or sharing it. Responsibility for such output
                remains with the member and not with the tool.
              </p>
            </div>

            <div className="terms-section-block">
              <h3>6. Pitching</h3>
              <p>
                Every member is entitled to present ideas or projects to the
                Society at any time. Any idea so presented shall remain the
                property of the member who presented it, and no other member
                shall copy, use, or build upon it without that member&apos;s prior
                written consent.
              </p>
            </div>

            <div className="terms-section-block">
              <h3>7. Project Ownership</h3>
              <p>
                Ownership of any project developed within the Society shall rest
                with the member who originated the idea. Other members who
                contribute to the project shall do so with that member&apos;s
                consent and shall acquire no ownership unless agreed in writing.
              </p>
            </div>

            <div className="terms-section-block">
              <h3>8. Conflict of Interest</h3>
              <p>
                Members shall promptly disclose to the Leaders any situation in
                which their personal projects, outside organizations, or
                financial interests conflict with a project of Believe Ai Labs.
                The Leaders shall review each disclosure and decide how it is to
                be handled.
              </p>
            </div>

            <div className="terms-section-block">
              <h3>9. Code of Conduct</h3>
              <p>
                Physical violence, threats, harassment, and abuse are strictly
                prohibited within the Society. Any disagreement shall be
                reported to the Leaders and resolved in a calm and respectful
                manner.
              </p>
            </div>

            <div className="terms-section-block">
              <h3>10. Academic Priority</h3>
              <p>
                A member who finds that his involvement in the Society is
                affecting his studies may inform the Leaders without any
                prejudice. The Leaders shall review the matter and adjust the
                member&apos;s commitments accordingly.
              </p>
            </div>

            <div className="terms-section-block">
              <h3>11. Exit</h3>
              <p>
                A member may withdraw from the Society at any time by giving
                written notice to the Leaders. Upon withdrawal, the member shall
                return all Society materials in his possession and shall remain
                bound by the confidentiality obligation.
              </p>
            </div>

            <div className="terms-section-block">
              <h3>12. Amendments</h3>
              <p>
                These Terms and Conditions may be amended only by a majority vote
                of the members. Every amendment shall be recorded in writing and
                communicated to all members.
              </p>
            </div>

            <div className="terms-section-block">
              <h3>13. Disclaimers</h3>
              <p>
                The Society does not guarantee any result, income, or career
                outcome to any member. Each member is solely responsible for his
                own actions, and membership of Believe Ai Labs does not
                constitute a job or employment.
              </p>
            </div>

            <div className="terms-signatures-block">
              <h4>Acceptance &amp; Governance</h4>
              <p>
                All members and leaders voluntary agree to be bound by these
                terms upon admission to Believe AI Labs.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="terms-modal-footer">
          <button
            type="button"
            className="terms-modal-close-action"
            onClick={onClose}
          >
            Close Document
          </button>
        </div>
      </div>
    </div>
  );
}
