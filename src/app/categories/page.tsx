import Link from "next/link";
import { ArrowRight } from "lucide-react";

const CATEGORIES = [
  {
    slug: "health-wellness",
    label: "Health & Wellness",
    count: 24,
    description: "Science-backed habits for a fuller, more energised life.",
    gradient: "from-lime-600 to-emerald-800",
    bg: "from-lime-50 to-emerald-50 dark:from-lime-900/10 dark:to-emerald-900/10",
    border: "border-lime-100 dark:border-lime-900/30",
  },
  {
    slug: "fitness",
    label: "Fitness",
    count: 18,
    description: "Training plans, workout science and expert movement tips.",
    gradient: "from-orange-600 to-orange-800",
    bg: "from-orange-50 to-orange-100/50 dark:from-orange-950/20 dark:to-orange-900/20",
    border: "border-orange-100 dark:border-orange-900/30",
  },
  {
    slug: "nutrition",
    label: "Nutrition",
    count: 21,
    description: "Practical guidance — from meal planning to the latest research.",
    gradient: "from-green-600 to-green-800",
    bg: "from-green-50 to-green-100/50 dark:from-green-950/20 dark:to-green-900/20",
    border: "border-green-100 dark:border-green-900/30",
  },
  {
    slug: "mental-health",
    label: "Mental Health",
    count: 15,
    description: "Tools and stories for resilience, mindfulness and a healthier mind.",
    gradient: "from-purple-600 to-purple-800",
    bg: "from-purple-50 to-purple-100/50 dark:from-purple-950/20 dark:to-purple-900/20",
    border: "border-purple-100 dark:border-purple-900/30",
  },
  {
    slug: "lifestyle",
    label: "Lifestyle",
    count: 30,
    description: "Inspiration to design a life that feels rich and intentional.",
    gradient: "from-sky-600 to-sky-800",
    bg: "from-sky-50 to-sky-100/50 dark:from-sky-950/20 dark:to-sky-900/20",
    border: "border-sky-100 dark:border-sky-900/30",
  },
];

export default function AllCategoriesPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* ── Page Header (Centered Style) ── */}
      <header className="bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-gray-900 pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          <div className="max-w-3xl">
            <h1 className="font-freight text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-[1.1] tracking-tight">
              All Topics
            </h1>
            <p className="font-crimson text-xl md:text-2xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl">
              Dive deep into the specialized areas of health, fitness, and mental wellness that matter to you.
            </p>
          </div>
        </div>
      </header>

      {/* Category Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/categories/${cat.slug}`}
              className="group relative rounded-2xl overflow-hidden border shadow-sm hover:shadow-lg transition-all duration-300 h-full flex flex-col"
              style={{ background: "transparent" }}
            >
              <div className={`bg-gradient-to-br ${cat.bg} border ${cat.border} p-6 h-full flex flex-col`}>
                {/* Content */}
                <div className="flex-1">
                  <div className="flex flex-col mb-3">
                    <h2 className="font-freight text-2xl font-bold text-gray-900 dark:text-white leading-tight mb-1 group-hover:text-lime-600 transition-colors">
                      {cat.label}
                    </h2>
                    <span className="font-walsheim text-xs font-bold text-gray-400 dark:text-gray-500">
                      {cat.count} articles
                    </span>
                  </div>
                  <p className="font-crimson text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                {/* CTA */}
                <div className="flex items-center gap-2 mt-4 font-walsheim text-xs font-bold uppercase tracking-widest text-gray-500 group-hover:text-lime-600 transition-colors">
                  Explore Topic
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
