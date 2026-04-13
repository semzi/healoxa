import Link from "next/link";
import { usePathname } from "next/navigation";
import { Facebook, Twitter, Instagram, Mail, Heart } from "lucide-react";

export default function Footer() {
  const pathname = usePathname();

  return (
    <footer className="bg-gray-900 dark:bg-black text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <img
              src="/logo-full-white.png"
              alt="Healoxa"
              className="h-10 w-auto mb-4"
            />
            <p className="font-walsheim text-gray-400 leading-relaxed mb-6">
              Simple habits for a healthier, stronger you. Expert-backed wellness
              tips to help you live your best life.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="p-2 bg-gray-800 hover:bg-green-600 rounded-lg transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-2 bg-gray-800 hover:bg-green-600 rounded-lg transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-2 bg-gray-800 hover:bg-green-600 rounded-lg transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-walsheim font-semibold text-lg mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="font-walsheim text-gray-400 hover:text-green-400 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/news"
                  className="font-walsheim text-gray-400 hover:text-green-400 transition-colors"
                >
                  Articles
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="font-walsheim text-gray-400 hover:text-green-400 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="font-walsheim text-gray-400 hover:text-green-400 transition-colors"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-walsheim font-semibold text-lg mb-4">
              Categories
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#"
                  className="font-walsheim text-gray-400 hover:text-green-400 transition-colors"
                >
                  Health & Wellness
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="font-walsheim text-gray-400 hover:text-green-400 transition-colors"
                >
                  Fitness
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="font-walsheim text-gray-400 hover:text-green-400 transition-colors"
                >
                  Nutrition
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="font-walsheim text-gray-400 hover:text-green-400 transition-colors"
                >
                  Mental Health
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="font-walsheim text-gray-400 hover:text-green-400 transition-colors"
                >
                  Lifestyle
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-walsheim font-semibold text-lg mb-4">
              Newsletter
            </h3>
            <p className="font-walsheim text-gray-400 mb-4">
              Subscribe for weekly wellness tips and health insights.
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-white placeholder-gray-500 font-walsheim"
              />
              <button
                type="submit"
                className="w-full px-5 py-3 bg-green-600 hover:bg-green-700 text-white font-walsheim font-medium rounded-lg transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-walsheim text-gray-400 text-sm text-center md:text-left">
              © 2026 Healoxa. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="/privacy"
                className="font-walsheim text-gray-400 hover:text-green-400 text-sm transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="font-walsheim text-gray-400 hover:text-green-400 text-sm transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/cookie-policy"
                className="font-walsheim text-gray-400 hover:text-green-400 text-sm transition-colors"
              >
                Cookie Policy
              </Link>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <span className="font-walsheim text-sm">Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <span className="font-walsheim text-sm">by Healoxa</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
