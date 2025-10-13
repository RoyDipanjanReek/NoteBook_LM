// TestimonialSection.jsx
import React from "react";

const testimonials = [
  {
    id: 1,
    name: "Jane Doe",
    text: "This platform helped me find my dream job!",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    id: 2,
    name: "John Smith",
    text: "Great experience, highly recommended.",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
  },
];

const TestimonialSection = () => (
  <section className="py-12 bg-gray-50">
    <div className="max-w-4xl mx-auto px-4">
      <h2 className="text-2xl font-bold mb-8 text-center">Testimonials</h2>
      <div className="grid gap-8 md:grid-cols-2">
        {testimonials.map((t) => (
          <div key={t.id} className="bg-white p-6 rounded-lg shadow">
            <img
              src={t.avatar}
              alt={t.name}
              className="w-16 h-16 rounded-full mx-auto mb-4"
            />
            <p className="text-gray-700 mb-2">"{t.text}"</p>
            <p className="text-sm font-semibold text-gray-900 text-center">{t.name}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialSection;