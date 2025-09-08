// src/pages/Terms.jsx
import React from 'react';
import StaticPageLayout from '../layouts/StaticPageLayout';

// A reusable component for each section (can be moved to a shared file)
const PolicySection = ({ title, children }) => (
  <div className="mb-6">
    <h2 className="text-2xl font-semibold text-primary mb-3">{title}</h2>
    <div className="space-y-4">{children}</div>
  </div>
);

const Terms = () => {
  return (
    <StaticPageLayout
      title="Terms & Conditions 📜"
      subtitle="By using OutFytly, you agree to follow our guidelines. Please read carefully before renting, buying, or listing items."
    >
      <p className="text-sm text-lavender/60 !mb-6">Last Updated: September 8, 2025</p>

      <PolicySection title="1. User Agreement">
        <p>
          This agreement is a binding contract between you and OutFytly. By accessing or using our services, you agree to be bound by these terms. If you do not agree, you may not use our services. You must be at least 18 years old to create an account.
        </p>
      </PolicySection>

      <PolicySection title="2. Item Rentals">
        <p>
          All rentals are subject to availability and the terms set by the item's owner (the "Lister"). The rental period begins when the item is delivered and ends when it is postmarked for return. Items must be returned in the same condition they were received, barring normal wear and tear.
        </p>
      </PolicySection>
      
      <PolicySection title="3. Damages and Liability">
        <p>
          Renters are solely responsible for any damage, loss, or theft of rented items. Fees equivalent to the full retail value of the item may be charged for items that are not returned or are returned with significant damage.
        </p>
      </PolicySection>

      <PolicySection title="4. Policy Updates">
        <p>
          We reserve the right to modify these terms at any time. We will notify users of any significant changes, but it is your responsibility to review this page periodically. Continued use of the service after changes constitutes your acceptance of the new terms.
        </p>
      </PolicySection>
    </StaticPageLayout>
  );
};

export default Terms;