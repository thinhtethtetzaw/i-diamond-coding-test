import "server-only";
import type { Testimonial } from "@/types/testimonial";

const ENDPOINT = "https://jsonplaceholder.typicode.com/comments?_limit=4";

const fallback: Testimonial[] = [
  { id: 1, name: "A thoughtful, capable partner", email: "client@example.com", body: "The team brought clarity to a difficult brief and delivered work that exceeded our expectations." },
];

export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const response = await fetch(ENDPOINT, { next: { revalidate: 3600, tags: ["testimonials"] } });
    if (!response.ok) throw new Error(`Testimonials returned ${response.status}`);
    return response.json() as Promise<Testimonial[]>;
  } catch (error) {
    console.error("Using fallback testimonials", error);
    return fallback;
  }
}
