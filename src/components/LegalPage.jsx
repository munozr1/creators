import React from 'react';

function LegalPage() {
  return (
    <div className="max-w-4xl mx-auto p-6 sm:p-10 text-gray-800 font-sans">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-900">Legal Information</h1>

      <section className="mb-10 p-6 border border-gray-200 rounded-lg bg-white shadow-sm">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900">Terms of Service</h2>
        <p className="mb-3 text-sm text-gray-600">Last Updated: {new Date().toLocaleDateString()}</p>

        <h3 className="text-lg font-semibold mt-4 mb-2 text-gray-800">1. Acceptance of Terms</h3>
        <p className="mb-3 text-gray-700">
          By accessing or using CreatorQ (the "Service"), you agree to be bound by these Terms of Service ("Terms").
          If you disagree with any part of the terms, then you may not access the Service.
        </p>

        <h3 className="text-lg font-semibold mt-4 mb-2 text-gray-800">2. Description of Service</h3>
        <p className="mb-3 text-gray-700">
          CreatorQ provides users with analytics and insights related to social media content creation and performance.
          Features may include data tracking, audience analysis, content suggestions, and reporting tools (the "Features").
          The Features may change over time at our discretion.
        </p>

        <h3 className="text-lg font-semibold mt-4 mb-2 text-gray-800">3. User Accounts</h3>
        <p className="mb-3 text-gray-700">
          To access certain features of the Service, you may be required to register for an account. You agree to
          provide accurate, current, and complete information during the registration process and to update such
          information to keep it accurate, current, and complete. You are responsible for safeguarding your password
          and for any activities or actions under your account.
        </p>

        <h3 className="text-lg font-semibold mt-4 mb-2 text-gray-800">4. Use of Service</h3>
        <p className="mb-3 text-gray-700">
          You agree not to use the Service for any purpose that is illegal or prohibited by these Terms. You agree not
          to misuse the Service, including but not limited to: attempting unauthorized access, interfering with the
          Service's operation, scraping data, or violating any applicable laws or regulations.
        </p>

         <h3 className="text-lg font-semibold mt-4 mb-2 text-gray-800">5. Intellectual Property</h3>
        <p className="mb-3 text-gray-700">
          The Service and its original content, features, and functionality are and will remain the exclusive property
          of CreatorQ and its licensors. The Service is protected by copyright, trademark, and other laws of both the
          United States and foreign countries.
        </p>

        <h3 className="text-lg font-semibold mt-4 mb-2 text-gray-800">6. Termination</h3>
        <p className="mb-3 text-gray-700">
          We may terminate or suspend your account and bar access to the Service immediately, without prior notice or
          liability, under our sole discretion, for any reason whatsoever and without limitation, including but not
          limited to a breach of the Terms.
        </p>

        <h3 className="text-lg font-semibold mt-4 mb-2 text-gray-800">7. Limitation of Liability</h3>
        <p className="mb-3 text-gray-700">
          In no event shall CreatorQ, nor its directors, employees, partners, agents, suppliers, or affiliates, be
          liable for any indirect, incidental, special, consequential or punitive damages, including without limitation,
          loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of
          or inability to access or use the Service; (ii) any conduct or content of any third party on the Service;
          (iii) any content obtained from the Service; and (iv) unauthorized access, use or alteration of your
          transmissions or content, whether based on warranty, contract, tort (including negligence) or any other legal
          theory, whether or not we have been informed of the possibility of such damage.
        </p>

        <h3 className="text-lg font-semibold mt-4 mb-2 text-gray-800">8. Disclaimer</h3>
         <p className="mb-3 text-gray-700">
          Your use of the Service is at your sole risk. The Service is provided on an "AS IS" and "AS AVAILABLE" basis.
          The Service is provided without warranties of any kind, whether express or implied, including, but not limited
          to, implied warranties of merchantability, fitness for a particular purpose, non-infringement or course of
          performance.
        </p>

        <h3 className="text-lg font-semibold mt-4 mb-2 text-gray-800">9. Governing Law</h3>
        <p className="mb-3 text-gray-700">
          These Terms shall be governed and construed in accordance with the laws of [Your State/Country, e.g., California, United States],
          without regard to its conflict of law provisions.
        </p>

        <h3 className="text-lg font-semibold mt-4 mb-2 text-gray-800">10. Changes to Terms</h3>
        <p className="mb-3 text-gray-700">
          We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide
          notice of any changes by posting the new Terms on this page. Your continued use of the Service after any such
          changes constitutes your acceptance of the new Terms.
        </p>

        <h3 className="text-lg font-semibold mt-4 mb-2 text-gray-800">11. Contact Us</h3>
        <p className="mb-3 text-gray-700">
          If you have any questions about these Terms, please contact us at [Your Contact Email/Method].
        </p>
      </section>

      <section className="p-6 border border-gray-200 rounded-lg bg-white shadow-sm">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900">Privacy Policy</h2>
        <p className="mb-3 text-sm text-gray-600">Last Updated: {new Date().toLocaleDateString()}</p>

        <h3 className="text-lg font-semibold mt-4 mb-2 text-gray-800">1. Introduction</h3>
        <p className="mb-3 text-gray-700">
          CreatorQ ("we", "us", or "our") is committed to protecting your privacy. This Privacy Policy explains how we
          collect, use, disclose, and safeguard your information when you use our Service.
        </p>

        <h3 className="text-lg font-semibold mt-4 mb-2 text-gray-800">2. Information We Collect</h3>
        <p className="mb-3 text-gray-700">
          We may collect personal information that you provide directly to us, such as when you create an account (e.g.,
          name, email address, social media profile information linked via authentication). We may also collect
          information automatically when you use the Service, such as usage data, device information, IP address, and
          analytics data related to your connected social media accounts (subject to the permissions you grant).
        </p>

        <h3 className="text-lg font-semibold mt-4 mb-2 text-gray-800">3. How We Use Your Information</h3>
        <p className="mb-1 text-gray-700">
          We use the information we collect to:
        </p>
        <ul className="list-disc list-inside ml-4 mb-3 text-gray-700">
          <li>Provide, operate, and maintain our Service</li>
          <li>Improve, personalize, and expand our Service</li>
          <li>Understand and analyze how you use our Service</li>
          <li>Develop new products, services, features, and functionality</li>
          <li>Communicate with you, including for customer service and updates</li>
          <li>Process your transactions (if applicable)</li>
          <li>Find and prevent fraud</li>
          <li>Comply with legal obligations</li>
        </ul>

        <h3 className="text-lg font-semibold mt-4 mb-2 text-gray-800">4. How We Share Your Information</h3>
        <p className="mb-3 text-gray-700">
          We do not sell your personal information. We may share information with third-party vendors and service
          providers that perform services for us (e.g., hosting, analytics, authentication providers like TikTok),
          as required by law, or in connection with a business transfer (like a merger or acquisition). Information
          retrieved from connected platforms (like TikTok) is subject to their respective privacy policies and the
          permissions you granted.
        </p>

         <h3 className="text-lg font-semibold mt-4 mb-2 text-gray-800">5. Data Security</h3>
        <p className="mb-3 text-gray-700">
          We use administrative, technical, and physical security measures to help protect your personal information.
          While we have taken reasonable steps to secure the personal information you provide to us, please be aware
          that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission
          can be guaranteed against any interception or other type of misuse.
        </p>

         <h3 className="text-lg font-semibold mt-4 mb-2 text-gray-800">6. Your Data Rights</h3>
        <p className="mb-3 text-gray-700">
          Depending on your location, you may have certain rights regarding your personal information, such as the right
          to access, correct, or delete your data. Please contact us to exercise these rights.
        </p>

        <h3 className="text-lg font-semibold mt-4 mb-2 text-gray-800">7. Third-Party Links</h3>
        <p className="mb-3 text-gray-700">
           The Service may contain links to third-party websites or services that are not owned or controlled by CreatorQ.
           We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any
           third-party websites or services.
        </p>

        <h3 className="text-lg font-semibold mt-4 mb-2 text-gray-800">8. Changes to This Privacy Policy</h3>
        <p className="mb-3 text-gray-700">
          We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new
          Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
        </p>

        <h3 className="text-lg font-semibold mt-4 mb-2 text-gray-800">9. Contact Us</h3>
        <p className="mb-3 text-gray-700">
          If you have any questions about this Privacy Policy, please contact us at [Your Contact Email/Method].
        </p>

      </section>
    </div>
  );
}

export default LegalPage; 
