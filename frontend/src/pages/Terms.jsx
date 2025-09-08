// src/pages/Terms.jsx
import React from 'react';
import StaticPageLayout from '../layouts/StaticPageLayout';
import { motion } from 'framer-motion';
import { Gavel, Package, ShieldAlert, FileText } from 'lucide-react';

// Upgraded component with icons and a card-like design
const PolicySection = ({ icon: Icon, title, children, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.5 }}
    transition={{ duration: 0.6, delay: delay }}
    className="flex items-start gap-6 bg-plum/30 p-6 rounded-2xl border border-lavender/20"
  >
    <div className="bg-primary/10 text-primary p-3 rounded-full mt-1">
      <Icon size={24} />
    </div>
    <div>
      <h2 className="text-xl font-semibold text-white mb-2">{title}</h2>
      <div className="space-y-4 text-lavender/70 leading-relaxed text-sm">
        {children}
      </div>
    </div>
  </motion.div>
);

const Terms = () => {
  return (
    <StaticPageLayout
      title="Terms & Conditions 📜"
      subtitle="By using OutFytly, you agree to follow our guidelines. Please read carefully before renting, buying, or listing items."
    >
      <p className="text-sm text-lavender/60 !mb-8">Last Updated: September 9, 2025</p>

      <div className="space-y-6">
        <PolicySection title="1. User Agreement" icon={Gavel} delay={0.1}>
          <p>
            This agreement is a binding contract between you ("User") and OutFytly. By accessing or using our services, you agree to be bound by these terms. If you do not agree, you may not use our services. You must be at least 18 years old to create an account.
          </p>
        </PolicySection>

        <PolicySection title="2. Item Rentals & Sales" icon={Package} delay={0.2}>
          <p>
            All rentals and sales are subject to availability and the terms set by the item's owner (the "Lister"). The rental period begins upon delivery and ends when the item is postmarked for return. Items must be returned in the same condition they were received, barring normal wear and tear.
          </p>
        </PolicySection>
        
        <PolicySection title="3. Damages and Liability" icon={ShieldAlert} delay={0.3}>
          <p>
            Renters are solely responsible for any damage, loss, or theft of rented items. Fees equivalent to the full retail value of the item may be charged for items that are not returned or are returned with significant damage, as determined by the Lister and OutFytly.
          </p>
        </PolicySection>

        <PolicySection title="4. Policy Updates" icon={FileText} delay={0.4}>
            <p>
                We reserve the right to modify these terms at any time. We will notify users of any significant changes via email or on-site notifications, but it is your responsibility to review this page periodically. Continued use of the service after changes constitutes your acceptance of the new terms.
            </p>
        </PolicySection>
      </div>
    </StaticPageLayout>
  );
};

export default Terms;