import React, { useEffect, useState } from 'react';
import { Zap, Brain, TrendingUp, BarChart3, Sparkles, Shield } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description, index, accentColor }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), index * 100);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div
      className={`group relative transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      {/* Gradient border effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/20 to-brand-secondary/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Card */}
      <div className="relative bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 group-hover:translate-y-[-4px] group-hover:shadow-2xl">
        {/* Icon container */}
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-all duration-300 ${accentColor}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>

        {/* Content */}
        <h3 className="text-lg font-serif font-semibold text-white mb-2">{title}</h3>
        <p className="text-text-secondary text-sm leading-relaxed">{description}</p>

        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-brand-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-xl" />
      </div>
    </div>
  );
};

const PremiumFeaturesSection = () => {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Analysis',
      description: 'Advanced machine learning analyzes your performance across 50+ metrics in real-time.',
      accentColor: 'bg-gradient-to-br from-brand-primary/30 to-brand-primary/10',
    },
    {
      icon: Zap,
      title: 'Instant Feedback',
      description: 'Get actionable insights immediately after each session to improve faster.',
      accentColor: 'bg-gradient-to-br from-brand-secondary/30 to-brand-secondary/10',
    },
    {
      icon: TrendingUp,
      title: 'Progress Tracking',
      description: 'Visualize your improvement over time with detailed performance graphs.',
      accentColor: 'bg-gradient-to-br from-brand-success/30 to-brand-success/10',
    },
    {
      icon: BarChart3,
      title: 'Detailed Metrics',
      description: 'Track eye contact, confidence, clarity, pacing, and 45+ other metrics.',
      accentColor: 'bg-gradient-to-br from-brand-accent/30 to-brand-accent/10',
    },
    {
      icon: Sparkles,
      title: 'Personalized Coaching',
      description: 'AI-generated recommendations tailored to your specific weaknesses.',
      accentColor: 'bg-gradient-to-br from-brand-primary/30 to-brand-secondary/10',
    },
    {
      icon: Shield,
      title: 'Privacy First',
      description: 'Your data is encrypted and never shared. Complete control over your recordings.',
      accentColor: 'bg-gradient-to-br from-brand-success/30 to-brand-success/10',
    },
  ];

  return (
    <section className="relative py-24 bg-bg-secondary">
      {/* Grid pattern background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(to right, #6D5BFF 1px, transparent 1px), linear-gradient(to bottom, #6D5BFF 1px, transparent 1px)',
        backgroundSize: '4rem 4rem',
      }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
            Powerful Features
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Everything you need to master your interviews and land your dream role.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              {...feature}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PremiumFeaturesSection;
