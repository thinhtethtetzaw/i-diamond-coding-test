"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { newsletterSchema, type NewsletterInput } from "@/lib/validation/newsletter";

export function NewsletterForm() {
  const { register, handleSubmit, reset, setError, formState: { errors, isSubmitting, isSubmitSuccessful } } = useForm<NewsletterInput>({ resolver: zodResolver(newsletterSchema) });

  async function onSubmit(input: NewsletterInput) {
    const response = await fetch("/api/newsletter", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(input) });
    if (!response.ok) { setError("root", { message: "Subscription failed. Please try again." }); return; }
    reset();
  }

  return (
    <form className="newsletter-form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="newsletter-form__row">
        <label className="sr-only" htmlFor="newsletter-email">Email address</label>
        <input id="newsletter-email" type="email" autoComplete="email" placeholder="Email Address" aria-invalid={Boolean(errors.email)} {...register("email")} />
        <button aria-label="Subscribe" disabled={isSubmitting}>
          <picture><source media="(max-width: 767px)" srcSet="/assets/m-newsletter-send.svg" /><img src="/assets/newsletter-send.svg" alt="" /></picture>
        </button>
      </div>
      <p className="newsletter-form__status" role="status">{errors.email?.message ?? errors.root?.message ?? (isSubmitSuccessful ? "Thanks — your notification was sent." : "")}</p>
    </form>
  );
}
