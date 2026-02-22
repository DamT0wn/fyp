import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Video, LineChart } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: Briefcase,
      title: 'Choose Role',
      description: 'Select your target position and industry for tailored interview questions',
      color: 'from-primary-600 to-primary-700',
    },
    {
      icon: Video,
      title: 'Practice Interview',
      description: 'Engage with our AI interviewer in real-time or upload a recorded session',
      color: 'from-accent-600 to-accent-700',
    },
    {
      icon: LineChart,
      title: 'Receive Analysis',
      description: 'Get detailed performance insights and actionable improvement recommendations',
      color: 'from-primary-700 to-accent-700',
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
            How It Works
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Three simple steps to interview mastery
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connection lines for desktop */}
          <div className="hidden md:block absolute top-20 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-600 via-accent-600 to-primary-700 opacity-20" />

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative"
            >
              <div className="card rounded-2xl p-8 text-center card-hover card-shadow">
                {/* Step number */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-dark-900 rounded-full flex items-center justify-center border-2 border-white/20">
                  <span className="text-sm font-bold">{index + 1}</span>
                </div>

                {/* Icon */}
                <div className={`w-16 h-16 mx-auto mb-6 bg-gradient-to-br ${step.color} rounded-xl flex items-center justify-center`}>
                  <step.icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                <p className="text-gray-400 leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
