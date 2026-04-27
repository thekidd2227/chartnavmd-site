import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { AssessmentForm } from "./AssessmentForm";
// NOTE: The DemoForm file is preserved in the repo for reference, but it is
// no longer wired into the UI. The public CTA system is unified around a
// single medically credible path: "Request a Workflow Assessment". Any
// legacy content that still emits `open-demo-modal` is transparently
// redirected to the assessment modal below.

type OpenWhich = "assessment" | null;

type Ctx = {
  /** Preserved for legacy callers — now routes to the assessment modal. */
  openDemo: () => void;
  openAssessment: () => void;
  openFromAction: (action?: string | null) => void;
  close: () => void;
};

const FormsContext = createContext<Ctx | null>(null);

export function useForms(): Ctx {
  const ctx = useContext(FormsContext);
  if (!ctx) throw new Error("useForms must be used inside FormsProvider");
  return ctx;
}

export function FormsProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState<OpenWhich>(null);
  // Track the element that opened the modal so we can restore focus on close.
  const triggerRef = useRef<HTMLElement | null>(null);

  const capture = useCallback(() => {
    const el = document.activeElement;
    if (el instanceof HTMLElement) triggerRef.current = el;
  }, []);

  const openAssessment = useCallback(() => {
    capture();
    setOpen("assessment");
  }, [capture]);

  // Alias retained for any legacy caller; all roads lead to the single
  // Workflow Assessment funnel.
  const openDemo = openAssessment;

  const close = useCallback(() => {
    setOpen(null);
    // Restore focus on next tick so the trigger is guaranteed visible first.
    setTimeout(() => {
      const el = triggerRef.current;
      if (el && document.body.contains(el)) el.focus();
    }, 0);
  }, []);

  const openFromAction = useCallback(
    (action?: string | null) => {
      // Both legacy and current action names open the assessment modal.
      if (action === "open-demo-modal" || action === "open-assessment-modal") {
        openAssessment();
      }
    },
    [openAssessment]
  );

  // Close on Escape + lock scroll while open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, close]);

  return (
    <FormsContext.Provider value={{ openDemo, openAssessment, openFromAction, close }}>
      {children}
      {open === "assessment" && (
        <Modal
          title="Request a Workflow Assessment"
          subtitle="We review your current workflow — intake, scheduling, charting, imaging, and billing — to determine implementation fit, rollout scope, and the clearest next step."
          onClose={close}
        >
          <AssessmentForm onSuccess={close} />
        </Modal>
      )}
    </FormsContext.Provider>
  );
}

// ---------- Modal ----------
function Modal({
  title,
  subtitle,
  onClose,
  children,
}: {
  title: string;
  subtitle?: string;
  onClose: () => void;
  children: ReactNode;
}) {
  const modalRef = useRef<HTMLDivElement>(null);

  // On open: focus the first focusable element inside the modal.
  useEffect(() => {
    const m = modalRef.current;
    if (!m) return;
    const first = m.querySelector<HTMLElement>(
      'input, select, textarea, button, [href], [tabindex]:not([tabindex="-1"])'
    );
    first?.focus();
  }, []);

  // Focus trap via Tab cycling.
  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Tab") return;
    const m = modalRef.current;
    if (!m) return;
    const focusables = m.querySelectorAll<HTMLElement>(
      'input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
    );
    if (focusables.length === 0) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  return (
    <div
      className="cn-modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cn-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      onKeyDown={onKeyDown}
    >
      <div className="cn-modal" ref={modalRef}>
        <button type="button" className="cn-modal__close" onClick={onClose} aria-label="Close">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M6 6l12 12M18 6l-12 12" />
          </svg>
        </button>
        <h2 id="cn-modal-title">{title}</h2>
        {subtitle && <p className="cn-modal__sub">{subtitle}</p>}
        {children}
      </div>
    </div>
  );
}
