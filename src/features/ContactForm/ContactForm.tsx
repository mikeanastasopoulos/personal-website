"use client";

import { useRef, useState, type FormEvent } from "react";
import type { SiteDictionary } from "@/i18n/types";
import { CONTACT_FORM_CONFIG } from "./config";
import styles from "./ContactForm.module.css";

type Props = { content: SiteDictionary["contact"]["form"] };

const ContactForm = ({ content }: Props) => {
  const pendingRef = useRef(false);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (pendingRef.current) return;
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    if (!CONTACT_FORM_CONFIG.accessKey) {
      setStatus("error");
      return;
    }
    const data = new FormData(form);
    if (data.get("botcheck")) return;
    for (const name of ["first_name", "last_name", "phone", "email", "message"]) {
      if (!String(data.get(name) ?? "").trim()) {
        setStatus("error");
        return;
      }
    }
    pendingRef.current = true;
    setStatus("sending");
    try {
      const response = await fetch(CONTACT_FORM_CONFIG.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        signal: AbortSignal.timeout(20000),
        body: JSON.stringify({
          ...Object.fromEntries(data),
          name: `${String(data.get("first_name")).trim()} ${String(data.get("last_name")).trim()}`,
          access_key: CONTACT_FORM_CONFIG.accessKey,
          subject: "New website enquiry — Anastasopoulos Law",
          from_name: "Anastasopoulos Law website",
          replyto: String(data.get("email")).trim(),
        }),
      });
      const result = await response.json();
      if (!response.ok || result.success !== true) throw new Error("Submission failed");
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    } finally {
      pendingRef.current = false;
    }
  };

  let statusMessage = "";
  if (status === "success") statusMessage = content.success;
  if (status === "error") statusMessage = content.error;

  return (
    <form className={styles.form} onSubmit={submit} aria-label={content.label}>
      <p className={styles.note}>{content.required}</p>
      <div className={styles.fields}>
        <label>{content.firstName} *
          <input name="first_name" autoComplete="given-name" required maxLength={60} />
        </label>
        <label>{content.lastName} *
          <input name="last_name" autoComplete="family-name" required maxLength={60} />
        </label>
        <label>{content.phone} *
          <input name="phone" type="tel" autoComplete="tel" required maxLength={40} pattern="[+0-9() .-]{6,40}" />
        </label>
        <label>{content.email} *
          <input name="email" type="email" autoComplete="email" required maxLength={254} />
        </label>
        <label className={styles.full}>{content.message} *
          <textarea name="message" required rows={8} maxLength={5000} />
        </label>
      </div>
      <input className={styles.honeypot} type="checkbox" name="botcheck" tabIndex={-1} aria-hidden="true" />
      <button type="submit" disabled={status === "sending"}>
        {status === "sending" ? content.sending : content.submit}
      </button>
      <p className={styles.status} role="status" aria-live="polite">
        {statusMessage}
      </p>
    </form>
  );
};

export default ContactForm;
