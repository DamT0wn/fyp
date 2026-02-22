import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const TestimonialCard = ({ name, role, company, content, rating, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="card rounded-2xl p-8 card-shadow"
    >
      {/* Rating */}
      <div className="flex space-x-1 mb-4">
        {[...Array(rating)].map((_, i) => (
          <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
        ))}
      </div>

      {/* Content */}
      <p className="text-gray-300 mb-6 leading-relaxed">"{content}"</p>

      {/* Author */}
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 bg-gradient-accent rounded-full flex items-center justify-center">
          <span className="text-lg font-bold">{name.charAt(0)}</span>
        </div>
        <div>
          <div className="font-semibold">{name}</div>
          <div className="text-sm text-gray-400">{role} at {company}</div>
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;
