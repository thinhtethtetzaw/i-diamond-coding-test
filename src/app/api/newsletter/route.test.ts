import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { POST } from "./route";

const request = (body: unknown) => new Request("http://localhost/api/newsletter", { method: "POST", body: JSON.stringify(body) });

describe("POST /api/newsletter", () => {
  beforeEach(() => {
    process.env.EMAIL_ADDRESS = "owner@example.com";
    vi.spyOn(console, "info").mockImplementation(() => {});
  });
  afterEach(() => vi.restoreAllMocks());

  it("notifies the configured address for a valid email", async () => {
    const response = await POST(request({ email: "hello@example.com" }));
    expect(response.status).toBe(200);
    expect(console.info).toHaveBeenCalledWith(expect.stringContaining("owner@example.com"));
    expect(console.info).toHaveBeenCalledWith(expect.stringContaining("hello@example.com"));
  });

  it("rejects an invalid email", async () => {
    const response = await POST(request({ email: "nope" }));
    expect(response.status).toBe(400);
    expect(console.info).not.toHaveBeenCalled();
  });
});
