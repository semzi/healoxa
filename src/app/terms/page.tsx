import Link from "next/link";

export default function TermsPage() {
  const sections = [
    {
      title: "1. Acceptance of Terms",
      content: `By accessing and using Healoxa ("the Website"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by these terms, please do not use this website.

These terms may be modified at any time without prior notice. By continuing to use the website after changes are made, you agree to be bound by the revised terms.`,
    },
    {
      title: "2. Use License",
      content: `Permission is granted to temporarily access the materials (information or software) on Healoxa's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:

• Modify or copy the materials
• Use the materials for any commercial purpose or public display
• Attempt to decompile or reverse engineer any software contained on the website
• Remove any copyright or other proprietary notations from the materials
• Transfer the materials to another person or mirror the materials on any other server

This license shall automatically terminate if you violate any of these restrictions and may be terminated by Healoxa at any time.`,
    },
    {
      title: "3. Medical Disclaimer",
      content: `The content provided on Healoxa is for informational and educational purposes only. It is not intended to provide medical advice or to take the place of such advice or treatment from a qualified healthcare provider.

All content, including text, images, graphics, video, and audio, is for general information purposes only. You should always consult with a qualified healthcare professional before making any health-related decisions, starting any new diet or exercise program, or taking any supplements or medications.

Healoxa does not recommend or endorse any specific tests, physicians, products, procedures, opinions, or other information that may be mentioned on the website. Reliance on any information provided by Healoxa is solely at your own risk.`,
    },
    {
      title: "4. User Responsibilities",
      content: `As a user of Healoxa, you agree to:

• Use the website in accordance with all applicable laws and regulations
• Not post or transmit any harmful, offensive, or inappropriate content
• Not attempt to gain unauthorized access to any portion of the website
• Not interfere with or disrupt the integrity or performance of the website
• Not collect or store personal data about other users
• Respect the intellectual property rights of Healoxa and third parties

You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.`,
    },
    {
      title: "5. Intellectual Property",
      content: `All content on this website, including but not limited to articles, images, graphics, logos, icons, videos, audio clips, and written material, is the property of Healoxa or its content suppliers and is protected by international copyright, trademark, and other intellectual property laws.

You may not reproduce, distribute, modify, create derivative works of, publicly display, or publicly perform any of the content on this website without the prior written permission of Healoxa.

Trademarks, logos, and service marks displayed on this website are the registered and unregistered trademarks of Healoxa or their respective owners. Nothing contained on this website should be construed as granting any right to use any trademark without the prior written permission of the trademark owner.`,
    },
    {
      title: "6. User Comments and Content",
      content: `By posting comments, reviews, or other content on Healoxa, you represent and warrant that you have all necessary rights to such content and that it does not violate these terms.

You grant Healoxa a non-exclusive, royalty-free, perpetual, irrevocable, and fully sublicensable right to use, reproduce, modify, adapt, publish, translate, create derivative works from, distribute, and display such content throughout the world in any media.

Healoxa reserves the right to remove any content that violates these terms or is otherwise objectionable, without prior notice.`,
    },
    {
      title: "7. Limitation of Liability",
      content: `In no event shall Healoxa, its owners, employees, contractors, affiliates, agents, or licensors be liable for any damages of any kind arising out of or relating to your use of or inability to use this website, including but not limited to direct, indirect, incidental, special, consequential, or exemplary damages.

This includes, without limitation, damages for loss of profits, goodwill, use, data, or other intangible losses, even if we have been advised of the possibility of such damages.

Your sole remedy for dissatisfaction with the website is to stop using the website.`,
    },
    {
      title: "8. Indemnification",
      content: `You agree to indemnify, defend, and hold harmless Healoxa and its owners, officers, directors, employees, agents, licensors, and suppliers from and against all claims, losses, expenses, damages, and costs, including reasonable attorneys' fees, resulting from any violation of these terms or any activity related to your account or use of the website.`,
    },
    {
      title: "9. Third-Party Links",
      content: `The website may contain links to third-party websites or services that are not owned or controlled by Healoxa. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services.

We strongly advise you to read the terms and conditions and privacy policies of any third-party websites that you visit.`,
    },
    {
      title: "10. Termination",
      content: `We may terminate or suspend your access to our service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.

Upon termination, your right to use the website will immediately cease. All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability.`,
    },
    {
      title: "11. Governing Law",
      content: `These Terms shall be governed and construed in accordance with the laws of the jurisdiction where Healoxa operates, without regard to its conflict of law provisions.

Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect.`,
    },
    {
      title: "12. Changes to Terms",
      content: `We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect.

What constitutes a material change will be determined at our sole discretion. By continuing to access or use our service after those revisions become effective, you agree to be bound by the revised terms.`,
    },
    {
      title: "13. Contact Information",
      content: `If you have any questions about these Terms and Conditions, please contact us:

Email: legal@healoxa.com
Address: Healoxa Headquarters

Your privacy is important to us. Please review our Privacy Policy, which also governs your visit to Healoxa, to understand our practices regarding the collection and use of personal information.`,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-freight text-5xl md:text-6xl font-bold italic text-gray-900 dark:text-white mb-6">
            Terms & Conditions
          </h1>
          <p className="font-crimson text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
            Last updated: March 14, 2026
          </p>
          <p className="font-crimson text-lg text-gray-600 dark:text-gray-400 mt-4">
            Please read these terms carefully before using our website.
          </p>
        </div>

        {/* Introduction Box */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg mb-12 border-l-4 border-green-500">
          <p className="font-crimson text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
            Welcome to Healoxa. These Terms and Conditions govern your use of our website and 
            services. By accessing or using Healoxa, you agree to be bound by these terms. 
            If you disagree with any part of these terms, please do not use our services.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-md hover:shadow-lg transition-shadow"
            >
              <h2 className="font-freight text-2xl md:text-3xl font-bold italic text-gray-900 dark:text-white mb-6">
                {section.title}
              </h2>
              <div className="font-crimson text-gray-700 dark:text-gray-300 space-y-4 leading-relaxed whitespace-pre-line">
                {section.content.split("\n\n").map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Important Notice */}
        <div className="mt-12 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 rounded-lg p-6">
          <h3 className="font-walsheim text-lg font-bold uppercase tracking-wider text-yellow-800 dark:text-yellow-400 mb-3">
            Important Notice
          </h3>
          <p className="font-crimson text-gray-700 dark:text-gray-300 leading-relaxed">
            The content on Healoxa is for informational purposes only and does not constitute 
            medical advice. Always consult with a qualified healthcare provider before making 
            any health-related decisions or changes to your lifestyle.
          </p>
        </div>

        {/* Navigation */}
        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/"
            className="font-walsheim px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-medium uppercase tracking-wider rounded-lg transition-colors"
          >
            Back to Home
          </Link>
          <Link
            href="/about"
            className="font-walsheim px-8 py-3 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-medium uppercase tracking-wider rounded-lg transition-colors"
          >
            About Us
          </Link>
          <Link
            href="/news"
            className="font-walsheim px-8 py-3 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-medium uppercase tracking-wider rounded-lg transition-colors"
          >
            Read Articles
          </Link>
        </div>

        {/* Footer Note */}
        <div className="mt-16 text-center">
          <p className="font-crimson text-gray-600 dark:text-gray-400 text-sm">
            For more information, please see our{" "}
            <Link
              href="/privacy"
              className="text-green-600 dark:text-green-400 hover:underline"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
