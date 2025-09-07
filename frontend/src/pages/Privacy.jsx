// src/pages/Privacy.jsx
import React from 'react';
import StaticPageLayout from '../layouts/StaticPageLayout';

const PolicySection = ({ title, children }) => (
  <div className="mb-6">
    <h2 className="text-2xl font-semibold text-primary mb-3">{title}</h2>
    <div className="space-y-4">{children}</div>
  </div>
);

const Privacy = () => {
  return (
    <StaticPageLayout
      title="Privacy Policy 🔒"
      subtitle="Your privacy is critically important to us. Here’s a breakdown of how we collect, use, and protect your information."
    >
      <p className="text-sm text-lavender/60 !mb-6">Last Updated: September 8, 2025</p>

      <PolicySection title="1. Information We Collect">
        <p>
          We collect information you provide directly to us when you create an account, list an item, make a purchase, or communicate with us. This may include your name, email address, shipping address, and phone number.
        </p>
      </PolicySection>

      <PolicySection title="2. Data Security">
        <p>
          We are committed to protecting your information. We use a variety of security measures, including SSL encryption and secure server hosting, to maintain the safety of your personal data.
        </p>
      </PolicySection>
      
      <PolicySection title="3. Third-Party Sharing">
        <p>
          We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties without your consent, except for trusted partners who assist us in operating our services.
        </p>
      </PolicySection>
    </StaticPageLayout>
  );
};

export default Privacy;