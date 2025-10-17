'use client'
import React, { useState, useEffect, useRef } from "react";

const testimonials = [
  {
    id: 1,
    name: "Sophia Williams",
    text: "This platform made my job search so easy and effective. I landed my first tech role within weeks!",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
  },
  {
    id: 2,
    name: "Michael Johnson",
    text: "Amazing experience! The tools and support helped me connect with top companies effortlessly.",
    avatar: "https://randomuser.me/api/portraits/men/4.jpg",
  },
  {
    id: 3,
    name: "Emily Brown",
    text: "A fantastic platform that truly cares about its users. I found not just a job, but a career path!",
    avatar: "https://randomuser.me/api/portraits/women/5.jpg",
  },
];

const AUTO_PLAY_INTERVAL = 3000; // ms

const TestimonialSection = () => {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef(null);

  // Auto-play logic
  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, AUTO_PLAY_INTERVAL);
    return () => clearTimeout(timeoutRef.current);
  }, [current]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowRight") {
        setCurrent((prev) => (prev + 1) % testimonials.length);
      } else if (e.key === "ArrowLeft") {
        setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  // Accessibility: focus trap for carousel
  const carouselRef = useRef(null);

  return (
    <section className="py-12 bg-black">
      <div className="max-w-xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8 text-center text-white">Testimonials</h2>
        <div
          className="relative"
          ref={carouselRef}
          aria-roledescription="carousel"
          aria-label="Testimonials"
        >
          {/* Carousel Item */}
          <div className="bg-white p-6 rounded-lg shadow flex flex-col items-center transition-all duration-500">
            <img
              src={testimonials[current].avatar}
              alt={testimonials[current].name}
              className="w-16 h-16 rounded-full mx-auto mb-4"
              loading="lazy"
            />
            <p className="text-gray-700 mb-2 text-center">"{testimonials[current].text}"</p>
            <p className="text-sm font-semibold text-gray-900 text-center">
              {testimonials[current].name}
            </p>
          </div>
          {/* Controls */}
          <button
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow hover:bg-gray-200 focus:outline-none"
            aria-label="Previous testimonial"
            onClick={() => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
            tabIndex={0}
          >
            &#8592;
          </button>
          <button
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow hover:bg-gray-200 focus:outline-none"
            aria-label="Next testimonial"
            onClick={() => setCurrent((prev) => (prev + 1) % testimonials.length)}
            tabIndex={0}
          >
            &#8594;
          </button>
          {/* Dots */}
          <div className="flex justify-center mt-4 gap-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                className={`w-3 h-3 rounded-full ${current === idx ? "bg-blue-600" : "bg-gray-300"} focus:outline-none`}
                aria-label={`Go to testimonial ${idx + 1}`}
                onClick={() => setCurrent(idx)}
                tabIndex={0}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;