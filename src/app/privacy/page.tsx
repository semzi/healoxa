import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-freight text-5xl md:text-6xl font-bold italic text-gray-900 dark:text-white mb-6">
            Privacy Policy
          </h1>
          <p className="font-crimson text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
            Last updated: March 14, 2026
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8">
          <section className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-md">
            <h2 className="font-freight text-2xl md:text-3xl font-bold italic text-gray-900 dark:text-white mb-4">
              1. Information We Collect
            </h2>
            <p className="font-crimson text-gray-700 dark:text-gray-300 leading-relaxed">
              We collect information that you provide directly to us when you create an account, 
              subscribe to our newsletter, or communicate with us. This may include your name, 
              email address, and any other information you choose to provide.
            </p>
          </section>

          <section className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-md">
            <h2 className="font-freight text-2xl md:text-3xl font-bold italic text-gray-900 dark:text-white mb-4">
              2. How We Use Your Information
            </h2>
            <p className="font-crimson text-gray-700 dark:text-gray-300 leading-relaxed">
              We use the information we collect to operate, maintain, and improve our website, 
              process transactions, send you related information, respond to your comments and 
              questions, and provide customer service.
            </p>
          </section>

          <section className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-md">
            <h2 className="font-freight text-2xl md:text-3xl font-bold italic text-gray-900 dark:text-white mb-4">
              3. Information Sharing
            </h2>
            <p className="font-crimson text-gray-700 dark:text-gray-300 leading-relaxed">
              We do not sell, trade, or otherwise transfer your personal information to outside 
              parties without your consent, except as described in this policy or as required by law.
            </p>
          </section>

          <section className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-md">
            <h2 className="font-freight text-2xl md:text-3xl font-bold italic text-gray-900 dark:text-white mb-4">
              4. Data Security
            </h2>
            <p className="font-crimson text-gray-700 dark:text-gray-300 leading-relaxed">
              We implement appropriate security measures to protect your personal information. 
              However, no method of transmission over the Internet is 100% secure, and we cannot 
              guarantee absolute security.
            </p>
          </section>

          <section className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-md">
            <h2 className="font-freight text-2xl md:text-3xl font-bold italic text-gray-900 dark:text-white mb-4">
              5. Cookies
            </h2>
            <p className="font-crimson text-gray-700 dark:text-gray-300 leading-relaxed">
              We use cookies to enhance your browsing experience, analyze site traffic, and 
              personalize content. You can control cookie settings through your browser preferences.
            </p>
          </section>

          <section className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-md">
            <h2 className="font-freight text-2xl md:text-3xl font-bold italic text-gray-900 dark:text-white mb-4">
              6. Your Rights
            </h2>
            <p className="font-crimson text-gray-700 dark:text-gray-300 leading-relaxed">
              You have the right to access, update, or delete your personal information. 
              Contact us at privacy@healoxa.com for any privacy-related requests or concerns.
            </p>
          </section>
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
            href="/terms"
            className="font-walsheim px-8 py-3 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-medium uppercase tracking-wider rounded-lg transition-colors"
          >
            Terms & Conditions
          </Link>
        </div>
      </div>
    </div>
  );
}
