import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const CookiePage = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <h1 className="text-4xl font-bold mb-8">Cookie Policy</h1>
        
        <div className="space-y-6 text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">1. What Are Cookies?</h2>
            <p>
              Cookies are small text files stored on your device when you visit our website. They help us provide 
              a better user experience by remembering your preferences and analyzing how you use our platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">2. Types of Cookies We Use</h2>
            
            <div className="space-y-4 mt-4">
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Essential Cookies</h3>
                <p>
                  Required for the website to function properly. These include authentication tokens, session 
                  management, and security features. These cookies cannot be disabled.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Performance Cookies</h3>
                <p>
                  Help us understand how visitors interact with our website by collecting anonymous information 
                  about page visits, time spent, and navigation patterns.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Functionality Cookies</h3>
                <p>
                  Remember your preferences such as language, theme, and display settings to provide a personalized 
                  experience.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Analytics Cookies</h3>
                <p>
                  Help us analyze platform usage, identify popular features, and improve our services based on 
                  user behavior data.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">3. How We Use Cookies</h2>
            <p>We use cookies to:</p>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-2">
              <li>Keep you signed in to your account</li>
              <li>Remember your preferences and settings</li>
              <li>Analyze platform performance and usage</li>
              <li>Improve user experience and interface</li>
              <li>Provide personalized content and recommendations</li>
              <li>Ensure platform security and prevent fraud</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">4. Third-Party Cookies</h2>
            <p>
              We may use third-party services that set their own cookies, including:
            </p>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-2">
              <li><strong>Google Analytics:</strong> For website analytics and usage tracking</li>
              <li><strong>Firebase:</strong> For authentication and user management</li>
              <li><strong>OAuth Providers:</strong> For social login functionality</li>
            </ul>
            <p className="mt-2">
              These third parties have their own privacy policies governing their use of cookies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">5. Managing Cookies</h2>
            <p>
              You can control and manage cookies through your browser settings. Most browsers allow you to:
            </p>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-2">
              <li>View and delete cookies</li>
              <li>Block third-party cookies</li>
              <li>Block cookies from specific websites</li>
              <li>Block all cookies</li>
              <li>Delete all cookies when closing the browser</li>
            </ul>
            <p className="mt-4 text-yellow-400">
              Note: Blocking or deleting cookies may affect website functionality and your user experience.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">6. Cookie Consent</h2>
            <p>
              By continuing to use our website, you consent to our use of cookies as described in this policy. 
              You can withdraw consent at any time by adjusting your browser settings or contacting us.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">7. Updates to Cookie Policy</h2>
            <p>
              We may update this cookie policy to reflect changes in technology or legal requirements. Please 
              review this page periodically for updates.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">8. Contact Us</h2>
            <p>
              For questions about our use of cookies, please contact us through our support channels.
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

export default CookiePage;
