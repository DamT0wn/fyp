"""
AI Interviewer Service
Generates interview questions based on resume and job description
Analyzes candidate answers for knowledge assessment using Google Gemini API
"""
import re
import json
from typing import List, Dict, Tuple
import PyPDF2
import docx
from io import BytesIO
import os

# Try to import Gemini - handle both old and new packages
try:
    import google.generativeai as genai
    GEMINI_AVAILABLE = True
except ImportError:
    try:
        from google import genai
        GEMINI_AVAILABLE = True
    except ImportError:
        GEMINI_AVAILABLE = False
        genai = None

from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Get API key from environment
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")
GEMINI_MODEL = os.getenv("GEMINI_MODEL", "gemini-1.5-flash")

# For now, using rule-based approach. Can be upgraded to use OpenAI/Anthropic/Ollama
# To use LLM APIs, add API keys to .env and uncomment the relevant sections

class AIInterviewer:
    """Handles question generation and answer analysis using Gemini API"""
    
    def __init__(self):
        # Configure Gemini API
        self.use_gemini = GEMINI_AVAILABLE and bool(GEMINI_API_KEY) and GEMINI_API_KEY != "paste_your_gemini_api_key_here"
        if self.use_gemini:
            try:
                genai.configure(api_key=GEMINI_API_KEY)
                self.model = genai.GenerativeModel(GEMINI_MODEL)
                print(f"✓ Gemini API initialized with model: {GEMINI_MODEL}")
            except Exception as e:
                print(f"⚠ Failed to initialize Gemini API: {e}")
                self.use_gemini = False
                self.model = None
        else:
            if not GEMINI_AVAILABLE:
                print("⚠ Gemini package not installed. Using rule-based fallback.")
            elif not GEMINI_API_KEY or GEMINI_API_KEY == "paste_your_gemini_api_key_here":
                print("⚠ No Gemini API key found. Using rule-based fallback.")
            self.model = None
        
        # Fallback question templates for when API is not available
        self.question_templates = {
            "technical": [
                "Can you explain your experience with {skill}?",
                "How have you used {skill} in your previous projects?",
                "What challenges did you face while working with {skill}?",
                "Describe a project where you implemented {skill}.",
            ],
            "behavioral": [
                "Tell me about a time when you {situation}.",
                "How do you handle {situation}?",
                "Describe your approach to {situation}.",
            ],
            "role_specific": [
                "Why are you interested in this {role} position?",
                "What makes you a good fit for {role}?",
                "How does your experience align with {role} requirements?",
            ]
        }
    
    def extract_text_from_file(self, file_content: bytes, filename: str) -> str:
        """Extract text from PDF or DOCX resume"""
        try:
            if filename.lower().endswith('.pdf'):
                return self._extract_from_pdf(file_content)
            elif filename.lower().endswith(('.docx', '.doc')):
                return self._extract_from_docx(file_content)
            elif filename.lower().endswith('.txt'):
                return file_content.decode('utf-8')
            else:
                raise ValueError("Unsupported file format. Please upload PDF, DOCX, or TXT")
        except Exception as e:
            raise ValueError(f"Failed to extract text from resume: {str(e)}")
    
    def _extract_from_pdf(self, file_content: bytes) -> str:
        """Extract text from PDF"""
        pdf_file = BytesIO(file_content)
        pdf_reader = PyPDF2.PdfReader(pdf_file)
        text = ""
        for page in pdf_reader.pages:
            text += page.extract_text() + "\n"
        return text.strip()
    
    def _extract_from_docx(self, file_content: bytes) -> str:
        """Extract text from DOCX"""
        doc_file = BytesIO(file_content)
        doc = docx.Document(doc_file)
        text = "\n".join([paragraph.text for paragraph in doc.paragraphs])
        return text.strip()
    
    def extract_skills(self, resume_text: str, job_description: str) -> List[str]:
        """Extract relevant skills from resume and job description"""
        # Common technical skills to look for
        common_skills = [
            "python", "javascript", "java", "c++", "react", "angular", "vue",
            "node.js", "django", "flask", "fastapi", "sql", "mongodb", "postgresql",
            "aws", "azure", "docker", "kubernetes", "git", "agile", "scrum",
            "machine learning", "data analysis", "api", "rest", "graphql",
            "html", "css", "typescript", "testing", "ci/cd", "devops"
        ]
        
        combined_text = (resume_text + " " + job_description).lower()
        found_skills = []
        
        for skill in common_skills:
            if skill in combined_text:
                found_skills.append(skill)
        
        return found_skills[:8]  # Return top 8 skills
    
    def generate_questions(
        self, 
        resume_text: str, 
        job_description: str, 
        num_questions: int = 5,
        difficulty: str = "intermediate"
    ) -> List[Dict[str, str]]:
        """
        Generate interview questions based on resume and job description
        Uses Gemini API if available, otherwise falls back to rule-based generation
        
        Args:
            resume_text: Candidate's resume content
            job_description: Job requirements and description
            num_questions: Number of questions to generate
            difficulty: Question difficulty level (beginner, intermediate, advanced)
        
        Returns:
            List of question dictionaries with 'question' and 'type' keys
        """
        if self.use_gemini and self.model:
            try:
                return self._generate_questions_with_gemini(resume_text, job_description, num_questions, difficulty)
            except Exception as e:
                print(f"⚠ Gemini API error: {e}. Falling back to rule-based generation.")
                return self._generate_questions_fallback(resume_text, job_description, num_questions, difficulty)
        else:
            return self._generate_questions_fallback(resume_text, job_description, num_questions, difficulty)
    
    def _generate_questions_with_gemini(
        self, 
        resume_text: str, 
        job_description: str, 
        num_questions: int,
        difficulty: str = "intermediate"
    ) -> List[Dict[str, str]]:
        """Generate questions using Gemini API"""
        print(f"🤖 Using Gemini API to generate {num_questions} {difficulty} questions...")
        
        # Difficulty-specific instructions
        difficulty_instructions = {
            "beginner": """
- Focus on fundamental concepts and basic terminology
- Ask about simple, straightforward scenarios
- Test foundational knowledge without complex problem-solving
- Use clear, simple language
- Suitable for entry-level candidates or those new to the field""",
            "intermediate": """
- Focus on practical knowledge and real-world applications
- Include moderate problem-solving scenarios
- Test understanding of best practices and common patterns
- Suitable for candidates with 1-3 years of experience""",
            "advanced": """
- Focus on complex, real-world scenarios similar to FAANG interviews
- Include system design and architecture questions
- Test deep understanding and advanced problem-solving
- Challenge candidates with edge cases and trade-offs
- Suitable for senior-level candidates with 3+ years of experience"""
        }
        
        difficulty_instruction = difficulty_instructions.get(difficulty, difficulty_instructions["intermediate"])
        
        prompt = f"""You are an expert technical interviewer. Based on the candidate's resume and the job description, generate {num_questions} relevant interview questions at {difficulty.upper()} difficulty level.

Resume:
{resume_text[:2000]}

Job Description:
{job_description[:1000]}

Difficulty Level: {difficulty.upper()}
{difficulty_instruction}

Generate exactly {num_questions} interview questions that:
1. Match the {difficulty} difficulty level
2. Test technical skills mentioned in the resume
3. Assess fit for the job requirements
4. Include a mix of technical, behavioral, and role-specific questions
5. Are clear and specific

Return ONLY a JSON array in this exact format:
[
  {{"question": "Question text here?", "type": "technical", "topic": "skill name"}},
  {{"question": "Question text here?", "type": "behavioral", "topic": "topic name"}},
  ...
]

Types can be: "technical", "behavioral", or "role_specific"
"""
        
        response = self.model.generate_content(prompt)
        response_text = response.text.strip()
        print(f"✓ Gemini API responded successfully")
        
        # Extract JSON from response (handle markdown code blocks)
        if "```json" in response_text:
            response_text = response_text.split("```json")[1].split("```")[0].strip()
        elif "```" in response_text:
            response_text = response_text.split("```")[1].split("```")[0].strip()
        
        questions = json.loads(response_text)
        
        # Validate and ensure correct format
        validated_questions = []
        for q in questions[:num_questions]:
            if isinstance(q, dict) and "question" in q:
                validated_questions.append({
                    "question": q.get("question", ""),
                    "type": q.get("type", "general"),
                    "topic": q.get("topic", "general")
                })
        
        return validated_questions if validated_questions else self._generate_questions_fallback(resume_text, job_description, num_questions, difficulty)
    
    def _generate_questions_fallback(
        self, 
        resume_text: str, 
        job_description: str, 
        num_questions: int,
        difficulty: str = "intermediate"
    ) -> List[Dict[str, str]]:
        """Fallback rule-based question generation with difficulty levels"""
        questions = []
        skills = self.extract_skills(resume_text, job_description)
        
        # Extract job role from job description
        role = self._extract_role(job_description)
        
        # Difficulty-specific question templates
        difficulty_templates = {
            "beginner": {
                "technical": [
                    "What is {skill} and why is it used?",
                    "Can you explain the basic concepts of {skill}?",
                    "What are the main features of {skill}?",
                    "How would you describe {skill} to someone new?",
                ],
                "behavioral": [
                    "Tell me about your interest in {situation}.",
                    "What motivated you to learn about {situation}?",
                    "Describe a simple project where you used {situation}.",
                ],
            },
            "intermediate": {
                "technical": [
                    "Can you explain your experience with {skill}?",
                    "How have you used {skill} in your previous projects?",
                    "What challenges did you face while working with {skill}?",
                    "Describe a project where you implemented {skill}.",
                ],
                "behavioral": [
                    "Tell me about a time when you {situation}.",
                    "How do you handle {situation}?",
                    "Describe your approach to {situation}.",
                ],
            },
            "advanced": {
                "technical": [
                    "How would you architect a system using {skill} at scale?",
                    "What are the trade-offs when choosing {skill} over alternatives?",
                    "Explain how you would optimize {skill} for production use.",
                    "Design a solution using {skill} for a high-traffic application.",
                ],
                "behavioral": [
                    "Describe a complex situation where you {situation} and the impact it had.",
                    "How would you lead a team through {situation}?",
                    "Tell me about a time you made a critical decision regarding {situation}.",
                ],
            }
        }
        
        templates = difficulty_templates.get(difficulty, difficulty_templates["intermediate"])
        
        # Generate technical questions based on skills
        tech_count = min(3, len(skills))
        for i, skill in enumerate(skills[:tech_count]):
            template = templates["technical"][i % len(templates["technical"])]
            questions.append({
                "question": template.format(skill=skill.title()),
                "type": "technical",
                "topic": skill,
                "difficulty": difficulty
            })
        
        # Add behavioral question
        behavioral_situations = {
            "beginner": [
                "working in a team",
                "learning new technologies",
                "solving a technical problem"
            ],
            "intermediate": [
                "faced a challenging deadline",
                "worked in a team with conflicting opinions",
                "had to learn a new technology quickly"
            ],
            "advanced": [
                "led a critical project under tight constraints",
                "made an architectural decision with significant trade-offs",
                "resolved a major production incident"
            ]
        }
        
        situations = behavioral_situations.get(difficulty, behavioral_situations["intermediate"])
        questions.append({
            "question": templates["behavioral"][0].format(situation=situations[0]),
            "type": "behavioral",
            "topic": "teamwork",
            "difficulty": difficulty
        })
        
        # Add role-specific question
        if role:
            questions.append({
                "question": self.question_templates["role_specific"][0].format(role=role),
                "type": "role_specific",
                "topic": "motivation",
                "difficulty": difficulty
            })
        
        return questions[:num_questions]
    
    def _extract_role(self, job_description: str) -> str:
        """Extract job role from job description"""
        # Simple pattern matching for common roles
        roles = [
            "software engineer", "developer", "data scientist", "analyst",
            "manager", "designer", "architect", "consultant", "engineer"
        ]
        
        job_desc_lower = job_description.lower()
        for role in roles:
            if role in job_desc_lower:
                return role
        
        return "this position"
    
    def analyze_answer(
        self, 
        question: Dict[str, str], 
        answer_text: str,
        answer_duration: float
    ) -> Dict[str, any]:
        """
        Analyze candidate's answer and provide scoring
        Uses Gemini API if available, otherwise falls back to rule-based analysis
        
        Returns:
            Dictionary with score, feedback, and metrics
        """
        if self.use_gemini and self.model:
            try:
                return self._analyze_answer_with_gemini(question, answer_text, answer_duration)
            except Exception as e:
                print(f"⚠ Gemini API error: {e}. Falling back to rule-based analysis.")
                return self._analyze_answer_fallback(question, answer_text, answer_duration)
        else:
            return self._analyze_answer_fallback(question, answer_text, answer_duration)
    
    def _analyze_answer_with_gemini(
        self, 
        question: Dict[str, str], 
        answer_text: str,
        answer_duration: float
    ) -> Dict[str, any]:
        """Analyze answer using Gemini API"""
        print(f"🤖 Using Gemini API to analyze answer...")
        prompt = f"""You are an expert interviewer evaluating a candidate's answer.

Question: {question['question']}
Question Type: {question.get('type', 'general')}
Topic: {question.get('topic', 'general')}

Candidate's Answer:
{answer_text}

Answer Duration: {answer_duration:.1f} seconds

Evaluate this answer and provide:
1. Overall score (0-100)
2. Relevance score (0-100) - How well does it address the question?
3. Completeness score (0-100) - Is the answer thorough?
4. Clarity score (0-100) - Is it well-articulated?
5. Constructive feedback (2-3 sentences)

Return ONLY a JSON object in this exact format:
{{
  "score": 85,
  "relevance": 90,
  "completeness": 80,
  "clarity": 85,
  "feedback": "Your feedback here."
}}
"""
        
        response = self.model.generate_content(prompt)
        response_text = response.text.strip()
        print(f"✓ Gemini API analyzed answer successfully")
        
        # Extract JSON from response
        if "```json" in response_text:
            response_text = response_text.split("```json")[1].split("```")[0].strip()
        elif "```" in response_text:
            response_text = response_text.split("```")[1].split("```")[0].strip()
        
        analysis = json.loads(response_text)
        
        # Validate scores
        score = max(0, min(100, int(analysis.get("score", 50))))
        relevance = max(0, min(100, int(analysis.get("relevance", 50))))
        completeness = max(0, min(100, int(analysis.get("completeness", 50))))
        clarity = max(0, min(100, int(analysis.get("clarity", 50))))
        
        word_count = len(answer_text.split())
        
        return {
            "score": score,
            "feedback": analysis.get("feedback", "Good effort."),
            "metrics": {
                "relevance": relevance,
                "completeness": completeness,
                "clarity": clarity
            },
            "word_count": word_count
        }
    
    def _analyze_answer_fallback(
        self, 
        question: Dict[str, str], 
        answer_text: str,
        answer_duration: float
    ) -> Dict[str, any]:
        """Fallback rule-based answer analysis"""
        if not answer_text or len(answer_text.strip()) < 10:
            return {
                "score": 0,
                "feedback": "Answer too short or empty",
                "metrics": {
                    "relevance": 0,
                    "completeness": 0,
                    "clarity": 0
                }
            }
        
        # Calculate basic metrics
        word_count = len(answer_text.split())
        sentence_count = len(re.split(r'[.!?]+', answer_text))
        
        # Relevance: Check if answer mentions the topic
        topic = question.get("topic", "")
        relevance_score = self._calculate_relevance(answer_text, topic, question["type"])
        
        # Completeness: Based on answer length and structure
        completeness_score = self._calculate_completeness(word_count, sentence_count, answer_duration)
        
        # Clarity: Based on sentence structure and filler words
        clarity_score = self._calculate_clarity(answer_text, word_count)
        
        # Overall score (0-100)
        overall_score = int((relevance_score + completeness_score + clarity_score) / 3)
        
        # Generate feedback
        feedback = self._generate_feedback(
            overall_score, 
            relevance_score, 
            completeness_score, 
            clarity_score
        )
        
        return {
            "score": overall_score,
            "feedback": feedback,
            "metrics": {
                "relevance": relevance_score,
                "completeness": completeness_score,
                "clarity": clarity_score
            },
            "word_count": word_count
        }
    
    def _calculate_relevance(self, answer: str, topic: str, question_type: str) -> int:
        """Calculate how relevant the answer is to the question"""
        answer_lower = answer.lower()
        score = 50  # Base score
        
        # Check if topic is mentioned
        if topic and topic.lower() in answer_lower:
            score += 30
        
        # Check for type-specific keywords
        if question_type == "technical":
            technical_keywords = ["implemented", "developed", "used", "worked", "experience", "project"]
            matches = sum(1 for kw in technical_keywords if kw in answer_lower)
            score += min(matches * 5, 20)
        
        elif question_type == "behavioral":
            behavioral_keywords = ["situation", "challenge", "team", "result", "learned", "approach"]
            matches = sum(1 for kw in behavioral_keywords if kw in answer_lower)
            score += min(matches * 5, 20)
        
        return min(score, 100)
    
    def _calculate_completeness(self, word_count: int, sentence_count: int, duration: float) -> int:
        """Calculate how complete the answer is"""
        score = 0
        
        # Word count scoring (optimal: 50-150 words)
        if word_count < 20:
            score += 30
        elif word_count < 50:
            score += 60
        elif word_count <= 150:
            score += 100
        else:
            score += 80  # Too long
        
        # Sentence structure (optimal: 3-6 sentences)
        if sentence_count >= 3:
            score += min(sentence_count * 10, 40)
        
        return min(score // 2, 100)
    
    def _calculate_clarity(self, answer: str, word_count: int) -> int:
        """Calculate clarity of the answer"""
        score = 70  # Base score
        
        # Check for filler words
        filler_words = ["um", "uh", "like", "you know", "so", "actually", "basically"]
        filler_count = sum(answer.lower().count(filler) for filler in filler_words)
        filler_ratio = filler_count / word_count if word_count > 0 else 0
        
        # Penalize excessive fillers
        if filler_ratio > 0.1:
            score -= 30
        elif filler_ratio > 0.05:
            score -= 15
        
        # Reward proper sentence structure
        if ". " in answer or "? " in answer:
            score += 15
        
        return max(min(score, 100), 0)
    
    def _generate_feedback(
        self, 
        overall: int, 
        relevance: int, 
        completeness: int, 
        clarity: int
    ) -> str:
        """Generate human-readable feedback"""
        feedback_parts = []
        
        if overall >= 80:
            feedback_parts.append("Excellent answer!")
        elif overall >= 60:
            feedback_parts.append("Good answer.")
        else:
            feedback_parts.append("Answer needs improvement.")
        
        if relevance < 60:
            feedback_parts.append("Try to address the question more directly.")
        
        if completeness < 60:
            feedback_parts.append("Provide more details and examples.")
        
        if clarity < 60:
            feedback_parts.append("Work on reducing filler words and speaking more clearly.")
        
        return " ".join(feedback_parts)
    
    def calculate_overall_knowledge_score(self, answer_results: List[Dict]) -> Dict:
        """
        Calculate overall knowledge score from all answers
        
        Returns:
            Dictionary with overall score and breakdown
        """
        if not answer_results:
            return {
                "overall_score": 0,
                "technical_score": 0,
                "behavioral_score": 0,
                "total_questions": 0,
                "answered_questions": 0
            }
        
        total_score = sum(result["score"] for result in answer_results)
        avg_score = total_score / len(answer_results)
        
        # Calculate category scores
        technical_scores = [r["score"] for r in answer_results if r.get("type") == "technical"]
        behavioral_scores = [r["score"] for r in answer_results if r.get("type") == "behavioral"]
        
        return {
            "overall_score": int(avg_score),
            "technical_score": int(sum(technical_scores) / len(technical_scores)) if technical_scores else 0,
            "behavioral_score": int(sum(behavioral_scores) / len(behavioral_scores)) if behavioral_scores else 0,
            "total_questions": len(answer_results),
            "answered_questions": len([r for r in answer_results if r["score"] > 0])
        }


# Singleton instance
ai_interviewer = AIInterviewer()
