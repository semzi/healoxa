"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ChevronRight, Clock, ArrowRight, SlidersHorizontal, Flame, Search } from "lucide-react";

// --- Data Layer (replace with API call) ---
const CATEGORIES: Record<string, { label: string; description: string; color: string; gradient: string }> = {
  "health-wellness": {
    label: "Health & Wellness",
    description: "Science-backed insights to upgrade your everyday health habits and live a fuller, more energised life.",
    color: "lime",
    gradient: "from-lime-500 to-emerald-700",
  },
  fitness: {
    label: "Fitness",
    description: "Training plans, workout science, and expert tips to build strength, endurance and confidence.",
    color: "orange",
    gradient: "from-orange-500 to-orange-700",
  },
  nutrition: {
    label: "Nutrition",
    description: "Practical guidance on eating well — from meal planning to the latest nutritional research.",
    color: "green",
    gradient: "from-green-600 to-green-800",
  },
  "mental-health": {
    label: "Mental Health",
    description: "Tools and stories for emotional resilience, mindfulness and a healthier mind-body connection.",
    color: "purple",
    gradient: "from-purple-600 to-purple-800",
  },
  lifestyle: {
    label: "Lifestyle",
    description: "Inspiration to design a life that feels rich, intentional and deeply aligned with your values.",
    color: "sky",
    gradient: "from-sky-500 to-sky-700",
  },
};

const ARTICLES = [
  {
    id: 1,
    title: "5 Simple Daily Habits That Will Transform Your Health in 30 Days",
    excerpt: "Discover the science-backed habits that can revolutionize your physical and mental well-being in just one month.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop",
    author: "Dr. Emily Roberts",
    avatar: "https://i.pravatar.cc/150?img=5",
    date: "March 14, 2026",
    readTime: "8 min",
    featured: true,
  },
  {
    id: 2,
    title: "The Science of Sleep: Why 7–9 Hours Isn't Just a Recommendation",
    excerpt: "New research confirms the deep physiological effects of sleep deprivation — and how to fix your routine.",
    image: "https://images.unsplash.com/photo-1520206183501-b80df61043c2?w=600&h=400&fit=crop",
    author: "James Okafor",
    avatar: "https://i.pravatar.cc/150?img=12",
    date: "March 10, 2026",
    readTime: "6 min",
    featured: false,
  },
  {
    id: 3,
    title: "How Mindful Breathing Can Lower Cortisol in Minutes",
    excerpt: "Simple breathwork techniques that reset your nervous system and melt stress throughout the day.",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=400&fit=crop",
    author: "Amara Cole",
    avatar: "https://i.pravatar.cc/150?img=9",
    date: "March 6, 2026",
    readTime: "5 min",
    featured: false,
  },
  {
    id: 4,
    title: "Your Gut Microbiome Is Your Second Brain — Here's How to Feed It",
    excerpt: "The latest research on the gut-brain axis and the foods that cultivate a thriving microbiome.",
    image: "https://images.unsplash.com/photo-1546552768-9e3a94b38a59?w=600&h=400&fit=crop",
    author: "Dr. Emily Roberts",
    avatar: "https://i.pravatar.cc/150?img=5",
    date: "Feb 28, 2026",
    readTime: "9 min",
    featured: false,
  },
  {
    id: 5,
    title: "Cold Showers Every Morning: 30 Days In",
    excerpt: "One journalist's honest account of the benefits, struggles, and surprising mental shift from cold exposure.",
    image: "https://images.unsplash.com/photo-1484608856193-968d2be4080e?w=600&h=400&fit=crop",
    author: "Liam Osei",
    avatar: "https://i.pravatar.cc/150?img=15",
    date: "Feb 21, 2026",
    readTime: "7 min",
    featured: false,
  },
  {
    id: 6,
    title: "Walking 10,000 Steps: Myth or Medicine?",
    excerpt: "We look at the real evidence behind the iconic goal and what step count actually moves the needle for you.",
    image: "https://images.unsplash.com/photo-1542362567-b07e54358753?w=600&h=400&fit=crop",
    author: "Amara Cole",
    avatar: "https://i.pravatar.cc/150?img=9",
    date: "Feb 15, 2026",
    readTime: "6 min",
    featured: false,
  },
];

const SORT_OPTIONS = ["Latest", "Most Popular", "Oldest"];

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;
  const category = CATEGORIES[slug] ?? CATEGORIES["health-wellness"];

  const [sort, setSort] = useState("Latest");
  const [page, setPage] = useState(1);

  const featured = ARTICLES.find((a) => a.featured);
  const rest = ARTICLES.filter((a) => !a.featured);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* ── Category Header (Centered Style with Moving Mesh Gradient) ── */}
      <header className="relative bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-gray-900 pt-32 pb-16 overflow-hidden">
        {/* Animated Mesh Gradient Background Overlay */}
        <div className="absolute inset-0 opacity-40 dark:opacity-40 pointer-events-none">
          <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[80%] bg-lime-200/50 dark:bg-lime-900/30 rounded-full blur-[100px] animate-blob" />
          <div className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[80%] bg-emerald-200/50 dark:bg-emerald-900/30 rounded-full blur-[100px] animate-blob animation-delay-2000" />
          <div className="absolute top-[20%] left-[30%] w-[40%] h-[60%] bg-lime-100/40 dark:bg-emerald-800/20 rounded-full blur-[80px] animate-blob animation-delay-4000" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center relative z-10">
          <div className="max-w-3xl flex flex-col items-center">
            <div className="flex items-center gap-3 mb-4">
              <span className={`w-8 h-1 rounded-full bg-lime-500`} />
              <span className="font-walsheim text-xs font-bold uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500">
                Topic
              </span>
              <span className={`w-8 h-1 rounded-full bg-lime-500`} />
            </div>
            <h1 className="font-freight text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-[1.1] tracking-tight">
              {category.label}
            </h1>
            <p className="font-crimson text-xl md:text-2xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl mb-10">
              {category.description}
            </p>
            
            {/* ── Search Bar ── */}
            <div className="relative group w-full max-w-md">
              <input
                type="text"
                placeholder={`Search in ${category.label}...`}
                className="w-full bg-lime-50/50 dark:bg-lime-900/10 border-2 border-lime-100 dark:border-lime-900/30 focus:border-lime-500 rounded-full px-7 py-4 pr-14 font-walsheim text-sm text-gray-900 dark:text-white placeholder-lime-600/40 dark:placeholder-lime-400/30 shadow-sm transition-all outline-none"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-black dark:bg-white rounded-full flex items-center justify-center shadow-md cursor-pointer hover:scale-110 active:scale-95 transition-all">
                <Search className="w-4 h-4 text-white dark:text-black" />
              </div>
            </div>
          </div>
        </div>

        <style jsx global>{`
          @keyframes blob {
            0% { transform: translate(0px, 0px) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
            100% { transform: translate(0px, 0px) scale(1); }
          }
          .animate-blob {
            animation: blob 7s infinite;
          }
          .animation-delay-2000 {
            animation-delay: 2s;
          }
          .animation-delay-4000 {
            animation-delay: 4s;
          }
        `}</style>
      </header>

      {/* ── Main Content ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col lg:flex-row gap-12">

          {/* Left — Articles */}
          <main className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
              <h2 className="font-freight text-2xl font-bold text-gray-900 dark:text-white">
                All Articles
              </h2>
              <div className="flex items-center gap-3">
                <SlidersHorizontal className="w-4 h-4 text-gray-400" />
                <div className="flex items-center gap-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-1">
                  {SORT_OPTIONS.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setSort(opt)}
                      className={`font-walsheim text-xs font-bold px-4 py-2 rounded-lg transition-all ${
                        sort === opt
                          ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-sm"
                          : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Featured Article */}
            {featured && (
              <Link href="/news" className="group block mb-10">
                <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-gray-900 shadow-sm ring-1 ring-gray-100 dark:ring-gray-800 hover:shadow-xl transition-all duration-300">
                  <div className="relative h-72 md:h-96 overflow-hidden">
                    <img
                      src={featured.image}
                      alt={featured.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute top-4 left-4 flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-3 py-1.5">
                      <Flame className="w-3.5 h-3.5 text-orange-400" />
                      <span className="font-walsheim text-[10px] font-bold uppercase tracking-widest text-white">Featured</span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                      <h3 className="font-freight text-2xl md:text-3xl font-bold text-white leading-tight mb-3">
                        {featured.title}
                      </h3>
                      <p className="font-crimson text-white/80 text-lg leading-relaxed hidden md:block mb-4">
                        {featured.excerpt}
                      </p>
                      <div className="flex items-center gap-3">
                        <img src={featured.avatar} alt={featured.author} className="w-8 h-8 rounded-full ring-2 ring-white/30" />
                        <span className="font-walsheim text-xs font-bold text-white/80">{featured.author}</span>
                        <span className="text-white/40">·</span>
                        <Clock className="w-3.5 h-3.5 text-white/60" />
                        <span className="font-walsheim text-xs text-white/60">{featured.readTime} read</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            )}

            {/* Article Grid / List */}
            <div className="flex flex-col gap-10 md:grid md:grid-cols-2 lg:gap-8">
              {rest.map((article) => (
                <Link key={article.id} href="/news" className="group">
                  <article className="flex flex-col sm:flex-row md:flex-col bg-transparent md:bg-white dark:md:bg-gray-900 rounded-2xl overflow-hidden md:shadow-sm md:ring-1 md:ring-gray-100 dark:md:ring-gray-800 hover:shadow-lg transition-all duration-300 h-full">
                    <div className="relative w-full sm:w-40 md:w-full h-56 sm:h-32 md:h-48 overflow-hidden rounded-2xl md:rounded-b-none flex-shrink-0">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="py-5 md:p-6 flex flex-col flex-1 border-b border-gray-100 dark:border-gray-900 md:border-none">
                      <h3 className="font-freight text-xl font-bold text-gray-900 dark:text-white leading-snug mb-2 group-hover:text-lime-600 dark:group-hover:text-lime-400 transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="font-crimson text-base text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2 flex-1 mb-4">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center gap-2">
                          <img src={article.avatar} alt={article.author} className="w-7 h-7 rounded-full" />
                          <div>
                            <p className="font-walsheim text-xs font-bold text-gray-800 dark:text-gray-200">{article.author}</p>
                            <p className="font-walsheim text-[10px] text-gray-400">{article.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 font-walsheim text-xs text-gray-400">
                          <Clock className="w-3 h-3" />
                          {article.readTime}
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>

            {/* Pagination (Medium style) */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mt-20 pt-10 border-t border-gray-100 dark:border-gray-900">
              <div className="font-walsheim text-sm text-gray-400">
                Showing page <span className="font-bold text-gray-900 dark:text-white">{page}</span> of <span className="font-bold text-gray-900 dark:text-white">12</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-6 h-12 rounded-2xl font-walsheim text-sm font-bold border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:border-lime-400 disabled:opacity-30 disabled:hover:border-gray-200 transition-all active:scale-95"
                >
                  Previous
                </button>
                <div className="flex items-center gap-1 px-2">
                  {[1, 2, 3].map((p) => (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      className={`w-10 h-10 rounded-xl font-walsheim text-sm font-bold transition-all ${
                        page === p
                          ? "text-lime-700 dark:text-lime-500"
                          : "text-gray-400 hover:text-gray-900 dark:hover:text-white"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                  <span className="text-gray-300 mx-1">...</span>
                </div>
                <button
                  onClick={() => setPage(p => Math.min(12, p + 1))}
                  className="px-8 h-12 bg-lime-500 text-gray-900 rounded-full font-walsheim text-sm font-bold hover:bg-lime-600 transition-all shadow-md active:scale-95"
                >
                  Next
                </button>
              </div>
            </div>
          </main>

          {/* Right — Sidebar */}
          <aside className="w-full lg:w-72 lg:flex-shrink-0">
            <div className="sticky top-28 space-y-8">
              {/* Other Categories */}
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm ring-1 ring-gray-100 dark:ring-gray-800">
                <h3 className="font-freight text-xl font-bold text-gray-900 dark:text-white mb-4">Explore Topics</h3>
                <div className="space-y-1">
                  {Object.entries(CATEGORIES).map(([s, cat]) => (
                    <Link
                      key={s}
                      href={`/categories/${s}`}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl font-walsheim text-sm font-medium transition-all ${
                        s === slug
                          ? "bg-lime-50 dark:bg-lime-900/20 text-lime-700 dark:text-lime-400 font-bold"
                          : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
                      }`}
                    >
                      {cat.label}
                      {s === slug && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-lime-500" />}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Newsletter CTA */}
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 shadow-md">
                <p className="text-2xl mb-3">📬</p>
                <h3 className="font-freight text-xl font-bold text-white mb-2">Stay in the loop</h3>
                <p className="font-walsheim text-sm text-gray-400 mb-5 leading-relaxed">
                  Get the best Healoxa articles delivered to your inbox weekly. No spam, ever.
                </p>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 font-walsheim text-sm text-white placeholder-gray-500 focus:ring-2 focus:ring-lime-400/50 focus:border-lime-400 outline-none mb-3 transition-all"
                />
                <button className="w-full bg-lime-500 hover:bg-lime-600 text-gray-900 font-walsheim font-bold text-sm py-4 rounded-xl transition-all shadow-md hover:shadow-lg">
                  Subscribe
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
