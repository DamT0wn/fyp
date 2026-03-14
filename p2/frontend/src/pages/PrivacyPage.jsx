import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        
        <div className="space-y-6 text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">1. Information We Collect</h2>
            <p>We collect the following types of information:</p>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-2">
              <li><strong>Account Information:</strong> Email, username, name, and authentication credentials</li>
              <li><strong>Interview Data:</strong> Video recordings, audio recordings, transcripts, and responses</li>
              <li><strong>Analytics Data:</strong> Performance scores, feedback, and usage statistics</li>
              <li><strong>Technical Data:</strong> IP address, browser type, device information, and cookies</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">2. How We Use Your Information</h2>
            <p>We use collected information to:</p>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-2">
              <li>Provide and improve our AI-powered interview analysis services</li>
              <li>Generate personalized feedback and recommendations</li>
              <li>Maintain and secure your account</li>
              <li>Analyze platform usage and improve user experience</li>
              <li>Communicate important updates and service information</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">3. Data Storage and Security</h2>
            <p>
              We implement industry-standard security measures to protect your data. Your interview recordings and 
              personal information are stored securely and encrypted. We retain your data only as long as necessary 
              to provide our services or as required by law.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">4. Data Sharing</h2>
            <p>
              We respect your privacy and do not sell your personal information to third parties. We may share data only in these circumstances:
            </p>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-2">
              <li>With your explicit consent</li>
              <li>To comply with legal obligations</li>
              <li>With service providers who assist in platform operations (under strict confidentiality agreements)</li>
              <li>In anonymized, aggregated form for research and analytics</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">5. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-2">
              <li>Access your personal data</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Export your data</li>
              <li>Opt-out of marketing communications</li>
              <li>Withdraw consent for data processing</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">6. Cookies and Tracking</h2>
            <p>
              We use cookies and similar technologies to enhance your experience, remember preferences, and analyze 
              platform usage. You can control cookie settings through your browser. See our Cookie Policy for details.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">7. Children's Privacy</h2>
            <p>
              Our service is not intended for users under 13 years of age. We do not knowingly collect personal 
              information from children under 13.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">8. Changes to Privacy Policy</h2>
            <p>
              We may update this privacy policy periodically. We will notify users of significant changes via email 
              or platform notification.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">9. Contact Us</h2>
            <p>
              For privacy-related questions or to exercise your rights, please contact our privacy team through 
              the support channels.
            </p>
          </section>

          <p className="text-sm text-gray-500 mt-12">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
