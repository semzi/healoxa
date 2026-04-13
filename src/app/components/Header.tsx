"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Sun, Moon, Search, ChevronDown } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileCatOpen, setIsMobileCatOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    const savedTheme = localStorage.getItem("theme");
    setIsDarkMode(savedTheme === "dark");
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
    setIsMobileCatOpen(false);
  }, [pathname]);

  const toggleTheme = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    setIsDarkMode(newTheme === "dark");
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    document.documentElement.classList.toggle("light", newTheme === "light");
  };

  const navLink = "font-walsheim text-sm font-medium uppercase tracking-wider text-gray-700 dark:text-gray-300 hover:text-lime-600 dark:hover:text-lime-400 transition-colors";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <img
              src={isDarkMode ? "/logo-full-white.png" : "/logo-full.png"}
              alt="Healoxa"
              className="h-8 md:h-10 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className={navLink}>Home</Link>
            <Link href="/news" className={navLink}>Articles</Link>

            {/* ── Hover-triggered Categories Dropdown ── */}
            <div className="relative group">
              {/* Trigger — link itself also routes to /categories */}
              <Link
                href="/categories"
                className={`${navLink} flex items-center gap-1`}
              >
                Categories
                <ChevronDown className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" />
              </Link>

              {/* Invisible bridge so hover doesn't break when moving to dropdown */}
              <div className="absolute top-full left-0 h-3 w-full" />

              {/* Dropdown panel */}
              <div className="absolute top-[calc(100%+12px)] left-0 w-60 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-2 group-hover:translate-y-0 transition-all duration-200">
                  <div className="p-1 space-y-0.5">
                    {[
                      { slug: "health-wellness", label: "Health & Wellness" },
                      { slug: "fitness", label: "Fitness" },
                      { slug: "nutrition", label: "Nutrition" },
                      { slug: "mental-health", label: "Mental Health" },
                    ].map((cat) => (
                      <Link
                        key={cat.slug}
                        href={`/categories/${cat.slug}`}
                        className="flex items-center px-4 py-2 font-walsheim text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-lime-50 dark:hover:bg-lime-900/20 hover:text-lime-700 dark:hover:text-lime-400 rounded-xl transition-all"
                      >
                        {cat.label}
                      </Link>
                    ))}
                  </div>
                <div className="border-t border-gray-100 dark:border-gray-800 p-1.5">
                  <Link
                    href="/categories"
                    className="flex items-center justify-center gap-2 px-4 py-3 font-walsheim text-xs font-bold uppercase tracking-widest text-lime-600 dark:text-lime-400 hover:bg-lime-50 dark:hover:bg-lime-900/20 rounded-xl transition-all"
                  >
                    View All Categories →
                  </Link>
                </div>
              </div>
            </div>

            <Link href="/about" className={navLink}>About</Link>
            <Link href="/admin" className={navLink}>Admin</Link>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-700 dark:text-gray-300 hover:text-lime-600 dark:hover:text-lime-400 transition-colors">
              <Search className="w-5 h-5" />
            </button>

            <button
              onClick={toggleTheme}
              className="p-2 text-gray-700 dark:text-gray-300 hover:text-lime-600 dark:hover:text-lime-400 transition-colors"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-700 dark:text-gray-300"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile Menu ── */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          isMenuOpen ? "max-h-screen" : "max-h-0"
        } bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800`}
      >
        <nav className="flex flex-col px-4 py-4 space-y-1">
          <Link href="/" className="flex items-center gap-3 font-walsheim text-base font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 px-4 py-3 rounded-xl hover:bg-lime-50 dark:hover:bg-lime-900/20 hover:text-lime-600 dark:hover:text-lime-400 transition-all">
            Home
          </Link>
          <Link href="/news" className="flex items-center gap-3 font-walsheim text-base font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 px-4 py-3 rounded-xl hover:bg-lime-50 dark:hover:bg-lime-900/20 hover:text-lime-600 dark:hover:text-lime-400 transition-all">
            Articles
          </Link>
          <Link href="/admin" className="flex items-center gap-3 font-walsheim text-base font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 px-4 py-3 rounded-xl hover:bg-lime-50 dark:hover:bg-lime-900/20 hover:text-lime-600 dark:hover:text-lime-400 transition-all">
            Admin
          </Link>

          {/* Mobile Categories Accordion */}
          <div>
            <button
              onClick={() => setIsMobileCatOpen(!isMobileCatOpen)}
              className="w-full flex items-center justify-between font-walsheim text-base font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 px-4 py-3 rounded-xl hover:bg-lime-50 dark:hover:bg-lime-900/20 hover:text-lime-600 dark:hover:text-lime-400 transition-all"
            >
              Categories
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isMobileCatOpen ? "rotate-180" : ""}`} />
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                isMobileCatOpen ? "max-h-80" : "max-h-0"
              }`}
            >
              <div className="ml-4 pl-4 border-l-2 border-gray-100 dark:border-gray-800 space-y-1 pb-2">
                {[
                  { slug: "health-wellness", label: "Health & Wellness" },
                  { slug: "fitness", label: "Fitness" },
                  { slug: "nutrition", label: "Nutrition" },
                  { slug: "mental-health", label: "Mental Health" },
                ].map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/categories/${cat.slug}`}
                    className="flex items-center font-walsheim text-sm text-gray-600 dark:text-gray-400 hover:text-lime-600 dark:hover:text-lime-400 transition-colors py-2"
                  >
                    {cat.label}
                  </Link>
                ))}
                <Link
                  href="/categories"
                  className="flex items-center gap-2 font-walsheim text-xs font-bold uppercase tracking-widest text-lime-600 dark:text-lime-400 py-2 border-t border-gray-100 dark:border-gray-800 mt-1 pt-3"
                >
                  View All →
                </Link>
              </div>
            </div>
          </div>

          <Link href="/about" className="flex items-center gap-3 font-walsheim text-base font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 px-4 py-3 rounded-xl hover:bg-lime-50 dark:hover:bg-lime-900/20 hover:text-lime-600 dark:hover:text-lime-400 transition-all">
            About
          </Link>
        </nav>
      </div>
    </header>
  );
}
