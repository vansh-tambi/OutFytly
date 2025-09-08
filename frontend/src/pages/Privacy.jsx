// src/pages/Privacy.jsx
import React from 'react';
import StaticPageLayout from '../layouts/StaticPageLayout';
import { motion } from 'framer-motion';
import { Database, ShieldCheck, Users, Cookie, Mail } from 'lucide-react';

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

const Privacy = () => {
  return (
    <StaticPageLayout
      title="Privacy Policy 🔒"
      subtitle="Your privacy is critically important to us. Here’s a breakdown of how we collect, use, and protect your information."
    >
      <p className="text-sm text-lavender/60 !mb-8">Last Updated: September 9, 2025</p>

      <div className="space-y-6">
        <PolicySection title="Information We Collect" icon={Database} delay={0.1}>
          <p>
            When you create an account, list an item, or make a purchase, we collect information you provide, such as your name, email, shipping address, and phone number. We also gather anonymous data about your browsing activity to improve our service.
          </p>
        </PolicySection>

        <PolicySection title="Data Security" icon={ShieldCheck} delay={0.2}>
          <p>
            We are committed to protecting your information. We use a variety of industry-standard security measures, including SSL encryption and secure server hosting, to maintain the safety of your personal data from unauthorized access.
          </p>
        </PolicySection>
        
        <PolicySection title="Third-Party Sharing" icon={Users} delay={0.3}>
          <p>
            We do not sell or trade your personally identifiable information. We may share data with trusted third-party partners who assist us in operating our service (like payment processors and shipping carriers), provided they agree to keep this information confidential.
          </p>
        </PolicySection>

        <PolicySection title="Cookies" icon={Cookie} delay={0.4}>
            <p>
                Our site uses "cookies" to enhance your experience. These are small files that help us remember your preferences, process items in your shopping cart, and compile aggregate data about site traffic and interaction.
            </p>
        </PolicySection>

        <PolicySection title="Contacting Us" icon={Mail} delay={0.5}>
            <p>
                If you have any questions regarding this privacy policy, you may contact us using the information on our Contact page. We are happy to address any concerns you may have.
            </p>
        </PolicySection>
      </div>
    </StaticPageLayout>
  );
};

export default Privacy;