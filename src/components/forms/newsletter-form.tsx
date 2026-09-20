"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { newsletterSchema, type NewsletterInput } from "@/lib/validation/newsletter";
import { useUiStore } from "@/store/use-ui-store";

export function NewsletterForm() {
  const showToast = useUiStore((state) => state.showToast);
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<NewsletterInput>({ resolver: zodResolver(newsletterSchema) });

  async function onSubmit(input: NewsletterInput) {
    try {
      const response = await fetch("/api/newsletter", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(input) });
      if (!response.ok) throw new Error(`Request failed with ${response.status}`);
      showToast({ type: "success", title: "You're subscribed", message: `A notification for ${input.email} has been sent.` });
      reset();
    } catch {
      showToast({ type: "error", title: "Subscription failed", message: "Something went wrong. Please try again." });
    }
  }

  return (
    <form className="newsletter-form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="newsletter-form__row">
        <label className="sr-only" htmlFor="newsletter-email">Email address</label>
        <input id="newsletter-email" type="email" autoComplete="email" placeholder="Email Address" aria-invalid={Boolean(errors.email)} aria-describedby="newsletter-error" {...register("email")} />
        <button aria-label="Subscribe" disabled={isSubmitting}>
          <picture><source media="(max-width: 767px)" srcSet="/assets/m-newsletter-send.svg" /><img src="/assets/newsletter-send.svg" alt="" /></picture>
        </button>
      </div>
      <p id="newsletter-error" className="newsletter-form__status" role="alert">{errors.email?.message ?? ""}</p>
    </form>
  );
}
