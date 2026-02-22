import React from 'react';
import { motion } from 'framer-motion';
import { Video, Brain, BarChart3, Mic, Eye, TrendingUp } from 'lucide-react';
import FeatureCard from './FeatureCard';

const FeaturesSection = () => {
  const features = [
    {
      icon: Video,
      title: 'Real-Time Interview Simulation',
      description: 'Practice with our AI interviewer that adapts to your responses and provides realistic interview scenarios.',
    },
    {
      icon: Brain,
      title: 'AI Video Analysis',
      description: 'Advanced AI analyzes your body language, facial expressions, and communication patterns in real-time.',
    },
    {
      icon: BarChart3,
      title: 'Performance Insights Dashboard',
      description: 'Get detailed analytics on confidence, clarity, technical depth, and areas for improvement.',
    },
    {
      icon: Mic,
      title: 'Speech Analysis',
      description: 'Evaluate your tone, pace, filler words, and articulation to improve your communication skills.',
    },
    {
      icon: Eye,
      title: 'Body Language Tracking',
      description: 'Understand your non-verbal cues and learn how to project confidence through posture and gestures.',
    },
    {
      icon: TrendingUp,
      title: 'Progress Tracking',
      description: 'Monitor your improvement over time with detailed reports and personalized recommendations.',
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
            Professional Interview Preparation
            <span className="block text-accent-300 mt-2">
              Built for Success
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Comprehensive AI-powered tools designed for serious candidates
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
