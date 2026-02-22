import React from 'react';
import { motion } from 'framer-motion';
import TestimonialCard from './TestimonialCard';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Software Engineer',
      company: 'Google',
      content: 'The structured feedback helped me identify specific areas for improvement. Within three weeks, I received multiple offers from top tech companies.',
      rating: 5,
    },
    {
      name: 'Michael Rodriguez',
      role: 'Product Manager',
      company: 'Microsoft',
      content: 'Professional, data-driven insights that actually made a difference. The AI analysis was remarkably accurate and actionable.',
      rating: 5,
    },
    {
      name: 'Priya Sharma',
      role: 'Data Scientist',
      company: 'Amazon',
      content: 'As someone transitioning careers, this platform gave me the confidence and preparation I needed to compete with experienced candidates.',
      rating: 5,
    },
  ];

  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Proven Results
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Join professionals who advanced their careers with our platform
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              {...testimonial}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
