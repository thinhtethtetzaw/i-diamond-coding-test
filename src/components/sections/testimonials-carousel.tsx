"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

export type TestimonialCard = { id?: number; name: string; role: string; image: string; quote: string };

const AUTOPLAY_MS = 6000;
const TRANSITION_MS = 600;

export function TestimonialsCarousel({ items }: { items: TestimonialCard[] }) {
  const count = items.length;
  const [position, setPosition] = useState(count);
  const [animated, setAnimated] = useState(true);
  const [paused, setPaused] = useState(false);
  const positionRef = useRef(count);
  const trackRef = useRef<HTMLDivElement>(null);
  const active = ((position % count) + count) % count;

  const inRange = useCallback((value: number) => value >= count && value < count * 2, [count]);
  const normalize = useCallback((value: number) => count + (((value % count) + count) % count), [count]);

  const move = useCallback((delta: number) => {
    const current = positionRef.current;
    if (inRange(current)) {
      positionRef.current = current + delta;
      setAnimated(true);
      setPosition(positionRef.current);
      return;
    }
    const base = normalize(current);
    const track = trackRef.current;
    if (track) {
      track.style.transition = "none";
      track.style.transform = `translateX(calc(${-base} * var(--step)))`;
      void track.offsetWidth;
      track.style.transition = "";
    }
    positionRef.current = base + delta;
    setAnimated(true);
    setPosition(positionRef.current);
  }, [inRange, normalize]);

  const goTo = (index: number) => {
    const forward = (index - active + count) % count;
    const backward = (active - index + count) % count;
    if (forward === 0) return;
    move(forward <= backward ? forward : -backward);
  };

  useEffect(() => {
    if (inRange(position)) return;
    const timer = window.setTimeout(() => {
      positionRef.current = normalize(position);
      setAnimated(false);
      setPosition(positionRef.current);
    }, TRANSITION_MS);
    return () => window.clearTimeout(timer);
  }, [position, inRange, normalize]);

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => move(1), AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [move, paused]);

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowRight") move(1);
    if (event.key === "ArrowLeft") move(-1);
  };

  const slides = [...items, ...items, ...items];

  return (
    <div
      className="carousel"
      role="region"
      aria-roledescription="carousel"
      aria-label="Customer testimonials"
      tabIndex={0}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="testimonials__track">
        <div ref={trackRef} className={`testimonials__slides${animated ? "" : " no-transition"}`} style={{ transform: `translateX(calc(${-position} * var(--step)))` }}>
          {slides.map((item, index) => {
            const isVisible = index >= position && index < position + 4;
            return (
              <article key={`${item.name}-${index}`} style={{ left: `calc(${index} * var(--step))` }} aria-hidden={!isVisible}>
                <Image src={item.image} alt={item.name} width={120} height={120} />
                <h3>{item.name}</h3>
                <small>{item.role}</small>
                <p data-source-id={item.id}>{item.quote}</p>
              </article>
            );
          })}
        </div>
      </div>
      <button className="testimonials__arrow testimonials__arrow--prev" type="button" aria-label="Previous testimonial" onClick={() => move(-1)}>
        <Image src="/assets/testimonial-prev.svg" alt="" width={20} height={20} />
      </button>
      <button className="testimonials__arrow testimonials__arrow--next" type="button" aria-label="Next testimonial" onClick={() => move(1)}>
        <Image src="/assets/testimonial-next.svg" alt="" width={20} height={20} />
      </button>
      <div className="testimonials__dots" role="tablist" aria-label="Choose testimonial">
        {items.map((item, index) => (
          <button
            key={item.name}
            type="button"
            role="tab"
            aria-selected={index === active}
            aria-label={`Show testimonial ${index + 1} of ${count}`}
            className={index === active ? "is-active" : undefined}
            onClick={() => goTo(index)}
          />
        ))}
      </div>
      <p className="sr-only" aria-live="polite">Showing testimonial {active + 1} of {count}: {items[active].name}</p>
    </div>
  );
}
