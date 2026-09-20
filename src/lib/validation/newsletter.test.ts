import { describe, expect, it } from "vitest";
import { newsletterSchema } from "./newsletter";

describe("newsletterSchema", () => {
  it("accepts and trims a valid email", () => {
    expect(newsletterSchema.parse({ email: "  hello@example.com  " })).toEqual({ email: "hello@example.com" });
  });

  it("rejects an invalid email", () => {
    expect(newsletterSchema.safeParse({ email: "not-an-email" }).success).toBe(false);
  });
});
