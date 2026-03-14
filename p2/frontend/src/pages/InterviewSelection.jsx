import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Code, ArrowLeft, ChevronRight, Briefcase, Brain, Target, Sparkles, Upload, FileText, CheckCircle, X, AlertCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { uploadResume } from '../api/api';

const InterviewSelection = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState(null);
  const [selectedField, setSelectedField] = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeUploading, setResumeUploading] = useState(false);
  const [resumeUploaded, setResumeUploaded] = useState(false);
  const [resumeScore, setResumeScore] = useState(null);
  const [uploadError, setUploadError] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedForField, setUploadedForField] = useState(null); // Track which field resume was uploaded for

  const interviewTypes = [
    {
      id: 'hr',
      title: 'HR Interview',
      icon: Users,
      color: 'blue',
      description: 'Behavioral and soft skills assessment',
      topics: [
        'Communication & Teamwork',
        'Strengths & Weaknesses',
        'Conflict Resolution',
        'Career Goals & Motivation',
        'Leadership & Problem Solving',
        'Work Ethics & Values'
      ],
      gradient: 'from-blue-500 to-cyan-500',
      questionCount: 10
    },
    {
      id: 'field',
      title: 'Field Interview',
      icon: Code,
      color: 'purple',
      description: 'Technical and domain-specific questions',
      topics: [
        'Role-specific Technical Skills',
        'Industry Knowledge',
        'Problem-solving Scenarios',
        'Domain Expertise',
        'Best Practices',
        'Real-world Applications'
      ],
      gradient: 'from-purple-500 to-pink-500',
      questionCount: 15
    }
  ];

  const fields = [
    {
      id: 'software-engineering',
      name: 'Software Engineering',
      icon: Code,
      description: 'Algorithms, data structures, system design',
      color: 'blue',
      sampleQuestions: [
        'System design and architecture',
        'Algorithm complexity analysis',
        'Code quality and best practices'
      ]
    },
    {
      id: 'data-science',
      name: 'Data Science',
      icon: Brain,
      description: 'ML, statistics, data analysis',
      color: 'green',
      sampleQuestions: [
        'Machine learning concepts',
        'Statistical analysis methods',
        'Model evaluation techniques'
      ]
    },
    {
      id: 'product-management',
      name: 'Product Management',
      icon: Target,
      description: 'Strategy, roadmaps, user research',
      color: 'orange',
      sampleQuestions: [
        'Product prioritization',
        'Stakeholder management',
        'Metrics and success criteria'
      ]
    },
    {
      id: 'business-analyst',
      name: 'Business Analyst',
      icon: Briefcase,
      description: 'Requirements, process improvement',
      color: 'purple',
      sampleQuestions: [
        'Requirements gathering',
        'Process analysis',
        'Stakeholder communication'
      ]
    }
  ];

  const difficultyLevels = [
    {
      id: 'beginner',
      name: 'Beginner',
      icon: '🌱',
      description: 'Basic conceptual questions for newcomers',
      color: 'green',
      details: [
        'Fundamental concepts',
        'Simple scenarios',
        'Entry-level knowledge',
        'Basic terminology'
      ],
      questionCount: 8
    },
    {
      id: 'intermediate',
      name: 'Intermediate',
      icon: '⚡',
      description: 'Practical knowledge and problem-solving',
      color: 'blue',
      details: [
        'Real-world applications',
        'Problem-solving scenarios',
        'Moderate complexity',
        'Practical experience'
      ],
      questionCount: 10
    },
    {
      id: 'advanced',
      name: 'Advanced',
      icon: '🚀',
      description: 'Complex questions from top companies',
      color: 'purple',
      details: [
        'System design',
        'Advanced algorithms',
        'Architecture decisions',
        'Industry best practices'
      ],
      questionCount: 12
    }
  ];

  const handleStartInterview = () => {
    const interviewData = {
      type: selectedType === 'hr' ? 'hr' : 'field',
      field: selectedField,
      difficulty: selectedDifficulty,
      hasResume: resumeUploaded,
      resumeScore: resumeScore
    };

    if (selectedType === 'hr') {
      navigate('/live-interview', { state: interviewData });
    } else if (selectedType === 'field' && selectedField) {
      navigate('/live-interview', { state: interviewData });
    }
  };

  // Clear resume when field changes
  const handleFieldChange = (fieldId) => {
    // If field changes and resume was uploaded for a different field, clear it
    if (uploadedForField && uploadedForField !== fieldId && resumeUploaded) {
      setResumeFile(null);
      setResumeUploaded(false);
      setResumeScore(null);
      setUploadedForField(null);
      setUploadError('');
      // Show message that resume needs to be re-uploaded
      setUploadError('Field changed. Please upload your resume again for accurate analysis.');
      setTimeout(() => setUploadError(''), 3000);
    }
    setSelectedField(fieldId);
  };

  const handleResumeUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      setUploadError('Please upload a PDF or Word document');
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('File size must be less than 5MB');
      return;
    }

    setResumeFile(file);
    setUploadError('');
    setResumeUploading(true);
    setUploadProgress(0);

    try {
      // Pass the selected field for better analysis
      const response = await uploadResume(file, selectedField, (progress) => {
        setUploadProgress(progress);
      });

      // Use the analysis from backend
      if (response.analysis) {
        setResumeScore(response.analysis);
      } else {
        // Fallback if backend doesn't return analysis
        const mockScore = {
          overall: Math.floor(Math.random() * 20) + 75,
          structure: Math.floor(Math.random() * 20) + 75,
          skills: Math.floor(Math.random() * 20) + 70,
          experience: Math.floor(Math.random() * 20) + 80,
          keywords: Math.floor(Math.random() * 15) + 80
        };
        setResumeScore(mockScore);
      }

      setResumeUploaded(true);
      setUploadedForField(selectedField); // Track which field this was uploaded for
      setResumeUploading(false);
    } catch (error) {
      // Handle specific validation errors from backend
      const errorMessage = error.message || 'Failed to upload resume';
      setUploadError(errorMessage);
      setResumeUploading(false);
      setResumeFile(null);
    }
  };

  const handleRemoveResume = () => {
    setResumeFile(null);
    setResumeUploaded(false);
    setResumeScore(null);
    setUploadError('');
    setUploadProgress(0);
  };

  return (
    <div className="min-h-screen bg-dark-900">
      <Navbar />
      
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Link to="/" className="inline-flex items-center text-gray-400 hover:text-white mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
            <h1 className="text-4xl font-bold mb-2">Choose Your Interview Type</h1>
            <p className="text-gray-400">Select the type of interview you want to practice</p>
          </div>

          {/* Interview Type Selection */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {interviewTypes.map((type) => {
              const Icon = type.icon;
              const isSelected = selectedType === type.id;
              
              return (
                <motion.div
                  key={type.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => {
                    setSelectedType(type.id);
                    if (type.id === 'hr') {
                      setSelectedField(null);
                    }
                  }}
                  className={`glass rounded-2xl p-8 border cursor-pointer transition-all ${
                    isSelected 
                      ? 'border-white/30 bg-white/10' 
                      : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-16 h-16 bg-gradient-to-br ${type.gradient} rounded-xl flex items-center justify-center`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center"
                        >
                          <span className="text-white text-lg">✓</span>
                        </motion.div>
                      )}
                      <span className="px-2 py-1 bg-white/10 text-white text-xs font-semibold rounded">
                        {type.questionCount} Questions
                      </span>
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-2">{type.title}</h3>
                  <p className="text-gray-400 mb-4">{type.description}</p>
                  
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-gray-300">Topics Covered:</p>
                    <ul className="space-y-1">
                      {type.topics.map((topic, idx) => (
                        <li key={idx} className="text-sm text-gray-400 flex items-start">
                          <span className="text-blue-400 mr-2">•</span>
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Difficulty Level Selection */}
          {(selectedType === 'hr' || (selectedType === 'field' && selectedField)) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <h2 className="text-2xl font-bold mb-4">Select Difficulty Level</h2>
              <div className="grid md:grid-cols-3 gap-4">
                {difficultyLevels.map((level) => {
                  const isSelected = selectedDifficulty === level.id;
                  
                  return (
                    <motion.div
                      key={level.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      whileHover={{ scale: 1.05 }}
                      onClick={() => setSelectedDifficulty(level.id)}
                      className={`glass rounded-xl p-6 border cursor-pointer transition-all ${
                        isSelected 
                          ? 'border-white/30 bg-white/10' 
                          : 'border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="flex flex-col items-center text-center">
                        <div className="text-4xl mb-3">{level.icon}</div>
                        <h3 className="text-xl font-bold mb-2">{level.name}</h3>
                        <p className="text-sm text-gray-400 mb-3">{level.description}</p>
                        
                        <div className="w-full mt-2 pt-3 border-t border-white/10">
                          <p className="text-xs text-gray-500 mb-2">What to expect:</p>
                          <div className="space-y-1">
                            {level.details.map((detail, idx) => (
                              <p key={idx} className="text-xs text-gray-400 flex items-start">
                                <span className={`text-${level.color}-400 mr-1`}>•</span>
                                {detail}
                              </p>
                            ))}
                          </div>
                        </div>
                        
                        <div className="mt-3 px-3 py-1 bg-white/10 text-white text-xs font-semibold rounded-full">
                          {level.questionCount} Questions
                        </div>
                        
                        {isSelected && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="mt-3 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
                          >
                            <span className="text-white text-sm">✓</span>
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Field Selection (only shown when Field Interview is selected) */}
          {selectedType === 'field' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mb-8"
            >
              <h2 className="text-2xl font-bold mb-4">Select Your Field</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {fields.map((field) => {
                  const FieldIcon = field.icon;
                  const isSelected = selectedField === field.id;
                  
                  return (
                    <motion.div
                      key={field.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      whileHover={{ scale: 1.05 }}
                      onClick={() => handleFieldChange(field.id)}
                      className={`glass rounded-xl p-6 border cursor-pointer transition-all ${
                        isSelected 
                          ? 'border-white/30 bg-white/10' 
                          : 'border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="flex flex-col items-center text-center">
                        <div className={`w-12 h-12 bg-${field.color}-500/20 rounded-lg flex items-center justify-center mb-3`}>
                          <FieldIcon className={`w-6 h-6 text-${field.color}-400`} />
                        </div>
                        <h3 className="font-bold mb-2">{field.name}</h3>
                        <p className="text-sm text-gray-400 mb-3">{field.description}</p>
                        
                        {/* Sample Questions Preview */}
                        <div className="w-full mt-2 pt-3 border-t border-white/10">
                          <p className="text-xs text-gray-500 mb-2">Sample Topics:</p>
                          <div className="space-y-1">
                            {field.sampleQuestions.map((q, idx) => (
                              <p key={idx} className="text-xs text-gray-400 flex items-start">
                                <span className="text-blue-400 mr-1">•</span>
                                {q}
                              </p>
                            ))}
                          </div>
                        </div>
                        
                        {isSelected && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="mt-3 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
                          >
                            <span className="text-white text-sm">✓</span>
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Resume Upload Section (optional) */}
          {(selectedType === 'hr' || (selectedType === 'field' && selectedField)) && selectedDifficulty && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <div className="glass rounded-2xl p-8 border border-white/10">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                      <FileText className="w-6 h-6 text-blue-400" />
                      Resume Upload (Optional)
                    </h2>
                    <p className="text-gray-400">
                      Upload your resume for personalized questions and instant feedback
                    </p>
                    {selectedField && (
                      <p className="text-sm text-blue-400 mt-1">
                        Analysis will be specific to: {fields.find(f => f.id === selectedField)?.name}
                      </p>
                    )}
                  </div>
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs font-semibold rounded-full">
                    OPTIONAL
                  </span>
                </div>

                {/* Warning if field changed after upload */}
                {resumeUploaded && uploadedForField && selectedField && uploadedForField !== selectedField && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg"
                  >
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-yellow-400 text-sm font-semibold mb-1">Field Changed</p>
                        <p className="text-yellow-300 text-sm">
                          Your resume was analyzed for {fields.find(f => f.id === uploadedForField)?.name}. 
                          Upload again to get analysis for {fields.find(f => f.id === selectedField)?.name}.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {!resumeUploaded ? (
                  <div>
                    <div className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center hover:border-blue-500/50 transition-all">
                      <input
                        type="file"
                        id="resume-upload"
                        accept=".pdf,.doc,.docx"
                        onChange={handleResumeUpload}
                        className="hidden"
                        disabled={resumeUploading}
                      />
                      <label
                        htmlFor="resume-upload"
                        className="cursor-pointer flex flex-col items-center"
                      >
                        <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mb-4">
                          <Upload className="w-8 h-8 text-blue-400" />
                        </div>
                        <p className="text-lg font-semibold mb-2">
                          {resumeUploading ? 'Uploading...' : 'Click to upload your resume'}
                        </p>
                        <p className="text-sm text-gray-400 mb-4">
                          PDF, DOC, or DOCX (Max 5MB)
                        </p>
                        {resumeUploading && (
                          <div className="w-full max-w-xs">
                            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                              <motion.div
                                className="h-full bg-blue-500"
                                initial={{ width: 0 }}
                                animate={{ width: `${uploadProgress}%` }}
                                transition={{ duration: 0.3 }}
                              />
                            </div>
                            <p className="text-sm text-gray-400 mt-2">{uploadProgress}%</p>
                          </div>
                        )}
                      </label>
                    </div>

                    {uploadError && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg"
                      >
                        <div className="flex items-start gap-3">
                          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                          <div className="flex-1">
                            <p className="text-red-400 text-sm font-semibold mb-1">Upload Failed</p>
                            <p className="text-red-300 text-sm">{uploadError}</p>
                            {uploadError.includes('syllabus') || uploadError.includes('course') ? (
                              <p className="text-red-300 text-xs mt-2">
                                💡 Tip: Make sure you're uploading your resume/CV, not course materials or other documents.
                              </p>
                            ) : uploadError.includes('resume') || uploadError.includes('CV') ? (
                              <p className="text-red-300 text-xs mt-2">
                                💡 Tip: Your resume should include sections like Experience, Skills, and Education.
                              </p>
                            ) : null}
                          </div>
                        </div>
                      </motion.div>
                    )}

                    <div className="mt-6 grid md:grid-cols-3 gap-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-sm">Personalized Questions</p>
                          <p className="text-xs text-gray-400">Based on your experience</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-sm">Resume Analysis</p>
                          <p className="text-xs text-gray-400">Instant quality score</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-sm">Better Preparation</p>
                          <p className="text-xs text-gray-400">Targeted feedback</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6 mb-4">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                          <div>
                            <p className="font-semibold text-green-400 mb-1">Resume Uploaded Successfully</p>
                            <p className="text-sm text-gray-300">{resumeFile?.name}</p>
                            {uploadedForField && (
                              <p className="text-xs text-green-300 mt-1">
                                Analyzed for: {fields.find(f => f.id === uploadedForField)?.name || 'General'}
                              </p>
                            )}
                          </div>
                        </div>
                        <button
                          onClick={handleRemoveResume}
                          className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
                        >
                          <X className="w-5 h-5 text-gray-400 hover:text-red-400" />
                        </button>
                      </div>

                      {resumeScore && (
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="font-semibold">Resume Analysis Score</h3>
                            <span className="text-2xl font-bold text-green-400">{resumeScore.overall}/100</span>
                          </div>
                          
                          <div className="space-y-3 mb-4">
                            {[
                              { label: 'Structure & Format', score: resumeScore.structure },
                              { label: 'Skills Relevance', score: resumeScore.skills },
                              { label: 'Experience Quality', score: resumeScore.experience },
                              { label: 'Keywords Match', score: resumeScore.keywords }
                            ].map((item, idx) => (
                              <div key={idx}>
                                <div className="flex items-center justify-between text-sm mb-1">
                                  <span className="text-gray-300">{item.label}</span>
                                  <span className="font-semibold text-white">{item.score}/100</span>
                                </div>
                                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                  <motion.div
                                    className={`h-full ${
                                      item.score >= 85 ? 'bg-green-500' :
                                      item.score >= 70 ? 'bg-blue-500' :
                                      item.score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                                    }`}
                                    initial={{ width: 0 }}
                                    animate={{ width: `${item.score}%` }}
                                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Field-Specific Insights */}
                          {resumeScore.field_specific && (
                            <div className="space-y-3">
                              {/* Matched Skills */}
                              {resumeScore.field_specific.matched_skills && resumeScore.field_specific.matched_skills.length > 0 && (
                                <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                                  <p className="text-sm font-semibold text-green-400 mb-2 flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4" />
                                    Matched Skills ({resumeScore.field_specific.matched_count || resumeScore.field_specific.matched_skills.length})
                                  </p>
                                  <div className="flex flex-wrap gap-1">
                                    {resumeScore.field_specific.matched_skills.slice(0, 10).map((skill, idx) => (
                                      <span key={idx} className="px-2 py-0.5 bg-green-500/20 text-green-300 rounded text-xs">
                                        {skill}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Missing Critical Skills */}
                              {resumeScore.field_specific.missing_critical && resumeScore.field_specific.missing_critical.length > 0 && (
                                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                                  <p className="text-sm font-semibold text-red-400 mb-2 flex items-center gap-2">
                                    <AlertCircle className="w-4 h-4" />
                                    Missing Critical Skills
                                  </p>
                                  <div className="flex flex-wrap gap-1">
                                    {resumeScore.field_specific.missing_critical.map((skill, idx) => (
                                      <span key={idx} className="px-2 py-0.5 bg-red-500/20 text-red-300 rounded text-xs">
                                        {skill}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Recommendations */}
                              {resumeScore.field_specific.recommendations && resumeScore.field_specific.recommendations.length > 0 && (
                                <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                                  <p className="text-sm font-semibold text-blue-400 mb-2">Recommendations:</p>
                                  <ul className="space-y-1">
                                    {resumeScore.field_specific.recommendations.map((rec, idx) => (
                                      <li key={idx} className="text-xs text-blue-300 flex items-start gap-2">
                                        <span className="text-blue-400 mt-0.5">•</span>
                                        {rec}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          )}

                          <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                            <p className="text-sm text-blue-400 flex items-start gap-2">
                              <Sparkles className="w-4 h-4 flex-shrink-0 mt-0.5" />
                              <span>Your interview questions will be personalized based on your resume content and experience level.</span>
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}

          {/* Start Interview Button */}
          {(selectedType === 'hr' || (selectedType === 'field' && selectedField)) && selectedDifficulty && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass rounded-2xl p-8 border border-white/10"
            >
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">Ready to Start?</h3>
                  <p className="text-gray-400 mb-2">
                    {selectedType === 'hr' 
                      ? 'You\'ll be asked behavioral and HR-related questions'
                      : `You'll be asked ${fields.find(f => f.id === selectedField)?.name} specific questions`
                    }
                  </p>
                  <div className="flex items-center gap-3 flex-wrap">
                    {resumeUploaded && (
                      <div className="flex items-center gap-2 text-sm text-green-400 mt-2">
                        <CheckCircle className="w-4 h-4" />
                        <span>Personalized questions based on your resume</span>
                      </div>
                    )}
                    {selectedDifficulty && (
                      <div className="flex items-center gap-2 text-sm text-blue-400 mt-2">
                        <Target className="w-4 h-4" />
                        <span>
                          {difficultyLevels.find(d => d.id === selectedDifficulty)?.icon} 
                          {' '}
                          {difficultyLevels.find(d => d.id === selectedDifficulty)?.name} Level
                          {' '}
                          ({difficultyLevels.find(d => d.id === selectedDifficulty)?.questionCount} questions)
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleStartInterview}
                  className="px-8 py-4 bg-gradient-accent text-white rounded-xl font-semibold professional-glow hover:shadow-xl transition-all flex items-center space-x-2"
                >
                  <Sparkles className="w-5 h-5" />
                  <span>Start Interview</span>
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Info Box */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-8 glass rounded-xl p-6 border border-blue-500/20 bg-blue-500/5"
          >
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <h4 className="font-semibold text-blue-400 mb-1">AI-Powered Analysis</h4>
                <p className="text-sm text-gray-400 mb-3">
                  Our AI will analyze your responses in real-time, providing feedback on communication skills, 
                  confidence, clarity, and technical accuracy. You'll receive detailed insights after completing the interview.
                </p>
                {resumeUploaded && (
                  <div className="flex items-start gap-2 text-sm text-green-400 bg-green-500/10 border border-green-500/20 rounded-lg p-3 mt-2">
                    <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span>
                      With your resume uploaded, questions will be tailored to your experience level and the specific 
                      skills mentioned in your CV. You'll also receive targeted feedback on how well your answers align 
                      with your stated qualifications.
                    </span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default InterviewSelection;
