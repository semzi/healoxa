"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// Hero Section
function HeroSection() {
  const wellnessImages = [
    "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=200&h=250&fit=crop", // Woman meditating
    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=250&fit=crop", // Person working out
    "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=200&h=250&fit=crop", // Yoga pose
    "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=200&h=250&fit=crop", // Fitness training
    "https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?w=200&h=250&fit=crop", // Healthy eating
    "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=200&h=250&fit=crop", // Meditation
    "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=200&h=250&fit=crop", // Gym workout
    "https://images.unsplash.com/photo-1549476464-37392f717541?w=200&h=250&fit=crop", // Wellness lifestyle
  ];

  return (
    <section className="relative overflow-hidden bg-white min-h-[65vh] py-16 pt-24 dark:bg-gray-950">
      {/* Background Images Layer with Scroll Effect */}
      <div className="absolute inset-0 flex items-center justify-center px-16 lg:px-24">
        {/* Left Side Scrolling Images - 2 Columns (Counter-scrolling) */}
        <div className="hidden lg:flex lg:flex-row gap-4 h-[600px] overflow-hidden mr-auto">
          {/* Left Column - Scrolls Down */}
          <div className="animate-scroll-slow flex flex-col gap-4">
            {[...Array(8)].map((_, rowIndex) => (
              <div key={`left-col1-${rowIndex}`} className="h-40 w-28 flex-shrink-0 overflow-hidden rounded-lg opacity-30">
                <Image 
                  src={wellnessImages[rowIndex * 2 % wellnessImages.length]} 
                  alt="" 
                  width={112} 
                  height={160} 
                  className="h-full w-full object-cover" 
                />
              </div>
            ))}
            {/* Duplicate for seamless loop */}
            {[...Array(8)].map((_, rowIndex) => (
              <div key={`left-col1-dup-${rowIndex}`} className="h-40 w-28 flex-shrink-0 overflow-hidden rounded-lg opacity-30">
                <Image 
                  src={wellnessImages[rowIndex * 2 % wellnessImages.length]} 
                  alt="" 
                  width={112} 
                  height={160} 
                  className="h-full w-full object-cover" 
                />
              </div>
            ))}
          </div>
          {/* Right Column - Scrolls Up (Counter) */}
          <div className="animate-scroll-counter flex flex-col gap-4">
            {[...Array(8)].map((_, rowIndex) => (
              <div key={`left-col2-${rowIndex}`} className="h-40 w-28 flex-shrink-0 overflow-hidden rounded-lg opacity-30">
                <Image 
                  src={wellnessImages[(rowIndex * 2 + 1) % wellnessImages.length]} 
                  alt="" 
                  width={112} 
                  height={160} 
                  className="h-full w-full object-cover" 
                />
              </div>
            ))}
            {/* Duplicate for seamless loop */}
            {[...Array(8)].map((_, rowIndex) => (
              <div key={`left-col2-dup-${rowIndex}`} className="h-40 w-28 flex-shrink-0 overflow-hidden rounded-lg opacity-30">
                <Image 
                  src={wellnessImages[(rowIndex * 2 + 1) % wellnessImages.length]} 
                  alt="" 
                  width={112} 
                  height={160} 
                  className="h-full w-full object-cover" 
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right Side Scrolling Images - 2 Columns (Counter-scrolling) */}
        <div className="hidden lg:flex lg:flex-row gap-4 h-[600px] overflow-hidden ml-auto">
          {/* Left Column - Scrolls Down */}
          <div className="animate-scroll-slow flex flex-col gap-4">
            {[...Array(8)].map((_, rowIndex) => (
              <div key={`right-col1-${rowIndex}`} className="h-40 w-28 flex-shrink-0 overflow-hidden rounded-lg opacity-30">
                <Image 
                  src={wellnessImages[(rowIndex * 2 + 4) % wellnessImages.length]} 
                  alt="" 
                  width={112} 
                  height={160} 
                  className="h-full w-full object-cover" 
                />
              </div>
            ))}
            {/* Duplicate for seamless loop */}
            {[...Array(8)].map((_, rowIndex) => (
              <div key={`right-col1-dup-${rowIndex}`} className="h-40 w-28 flex-shrink-0 overflow-hidden rounded-lg opacity-30">
                <Image 
                  src={wellnessImages[(rowIndex * 2 + 4) % wellnessImages.length]} 
                  alt="" 
                  width={112} 
                  height={160} 
                  className="h-full w-full object-cover" 
                />
              </div>
            ))}
          </div>
          {/* Right Column - Scrolls Up (Counter) */}
          <div className="animate-scroll-counter flex flex-col gap-4">
            {[...Array(8)].map((_, rowIndex) => (
              <div key={`right-col2-${rowIndex}`} className="h-40 w-28 flex-shrink-0 overflow-hidden rounded-lg opacity-30">
                <Image 
                  src={wellnessImages[(rowIndex * 2 + 5) % wellnessImages.length]} 
                  alt="" 
                  width={112} 
                  height={160} 
                  className="h-full w-full object-cover" 
                />
              </div>
            ))}
            {/* Duplicate for seamless loop */}
            {[...Array(8)].map((_, rowIndex) => (
              <div key={`right-col2-dup-${rowIndex}`} className="h-40 w-28 flex-shrink-0 overflow-hidden rounded-lg opacity-30">
                <Image 
                  src={wellnessImages[(rowIndex * 2 + 5) % wellnessImages.length]} 
                  alt="" 
                  width={112} 
                  height={160} 
                  className="h-full w-full object-cover" 
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content Layer */}
      <div className="relative z-10">
        <div className="mx-auto flex max-w-7xl items-center justify-center px-4 sm:px-6 lg:px-8">
          {/* Center Content */}
          <div className="text-center">
            <h1 className="font-freight mb-2 text-4xl font-bold italic text-black dark:text-white md:text-6xl">
              Over <span className="text-lime-500">780</span>
            </h1>
            <p className="font-freight mb-6 text-4xl font-bold italic text-black dark:text-white md:text-6xl">
              Articles on <span className="bg-lime-200 px-2 dark:text-gray-900"> Wellness,</span>  <br /> <span className="bg-lime-200 dark:text-gray-900 px-2"> & Health</span>
            </p>
            <Link
              href="/news"
              className="font-walsheim inline-flex items-center gap-2 rounded-full bg-lime-500 px-10 py-4 text-sm font-bold uppercase tracking-widest text-gray-900 hover:bg-lime-600 transition-all shadow-lg active:scale-95"
            >
              Explore Now
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// Trending News Section
function TrendingNews() {
  const [trendingIndex, setTrendingIndex] = useState(0);
  const [happeningIndex, setHappeningIndex] = useState(0);

  const trendingData = [
    {
      label: "Trending",
      tag: "SCAM ALERT",
      title: "Fraud, Forgery And Fortune: Trinidadian Couple Faces Major Lawsuit In Canada",
      author: "Insider Lens",
      date: "April 17, 2024",
      location: "Toronto",
      image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=300&h=400&fit=crop"
    },
    {
      label: "Trending",
      tag: "WELLNESS",
      title: "How to Build a Sustainable Morning Routine for Optimal Health",
      author: "Wellness Team",
      date: "May 2, 2024",
      location: "New York",
      image: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=300&h=400&fit=crop"
    },
    {
      label: "Trending",
      tag: "FITNESS",
      title: "The Ultimate Guide to Starting a Running Routine in Your 40s",
      author: "Sarah Jones",
      date: "June 15, 2024",
      location: "London",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=400&fit=crop"
    },
    {
      label: "Trending",
      tag: "NUTRITION",
      title: "5 Superfoods You Should Be Eating Every Single Day",
      author: "Dr. Mark Wilson",
      date: "July 8, 2024",
      location: "Los Angeles",
      image: "https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?w=300&h=400&fit=crop"
    }
  ];

  const happeningData = [
    {
      category: "Politics",
      title: "Elon Musk at White House",
      status: "Live",
      image: "https://images.unsplash.com/photo-1533745848184-3db07256e163?w=400&h=300&fit=crop"
    },
    {
      category: "Tech",
      title: "Tech Giants Announce AI Coalition",
      status: "Live",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop"
    },
    {
      category: "Health",
      title: "Global Summit on Public Health Starts Today",
      status: "Live",
      image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=400&h=300&fit=crop"
    },
    {
      category: "Climate",
      title: "New Agreements Reached at Climate Conference",
      status: "Live",
      image: "https://images.unsplash.com/photo-1611273426858-450d8ceaba87?w=400&h=300&fit=crop"
    }
  ];

  const nextTrending = () => setTrendingIndex((prev) => (prev + 1) % trendingData.length);
  const prevTrending = () => setTrendingIndex((prev) => (prev - 1 + trendingData.length) % trendingData.length);

  const nextHappening = () => setHappeningIndex((prev) => (prev + 1) % happeningData.length);
  const prevHappening = () => setHappeningIndex((prev) => (prev - 1 + happeningData.length) % happeningData.length);

  const currentTrending = trendingData[trendingIndex];
  const currentHappening = happeningData[happeningIndex];

  return (
    <section className="bg-gray-50 py-12 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Trending News */}
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-freight text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Trending News</h2>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {trendingData.map((_, idx) => (
                    <span 
                      key={idx} 
                      className={`h-1 rounded-full transition-all duration-300 ${
                        idx === trendingIndex ? 'w-4 bg-lime-400' : 'w-1 bg-lime-300'
                      }`}
                    />
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={prevTrending} className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800" aria-label="Previous">
                    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M15 18l-6-6 6-6" />
                    </svg>
                  </button>
                  <button onClick={nextTrending} className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800" aria-label="Next">
                    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div className="group flex h-[220px] items-stretch gap-5 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-100 transition-all hover:shadow-md dark:bg-gray-800/80 dark:ring-gray-700">
              <div className="relative w-40 flex-shrink-0 overflow-hidden rounded-xl sm:w-48">
                <Image
                  src={currentTrending.image}
                  alt={currentTrending.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="font-walsheim absolute bottom-2 left-2 rounded-md bg-lime-500 px-3 py-1 text-[9px] font-bold uppercase tracking-widest text-gray-900 backdrop-blur-sm">
                  {currentTrending.label}
                </div>
              </div>
              <div className="flex flex-col py-1">
                <span className="font-walsheim mb-2 text-[9px] font-bold uppercase tracking-widest text-lime-600 dark:text-lime-400">{currentTrending.tag}</span>
                <h3 className="font-walsheim mb-3 text-base font-semibold leading-snug text-gray-900 line-clamp-3 dark:text-white sm:text-lg">
                  {currentTrending.title}
                </h3>
                <div className="mt-auto">
                  <div className="font-walsheim flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] text-gray-500 dark:text-gray-400">
                    <span className="font-medium text-gray-900 dark:text-gray-200">{currentTrending.author}</span>
                    <span>•</span>
                    <span>{currentTrending.date}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Happening Now */}
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-freight text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Happening Now</h2>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {happeningData.map((_, idx) => (
                    <span 
                      key={idx} 
                      className={`h-1 rounded-full transition-all duration-300 ${
                        idx === happeningIndex ? 'w-4 bg-lime-400' : 'w-1 bg-lime-300'
                      }`}
                    />
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={prevHappening} className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800" aria-label="Previous">
                    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M15 18l-6-6 6-6" />
                    </svg>
                  </button>
                  <button onClick={nextHappening} className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800" aria-label="Next">
                    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div className="group flex h-[220px] flex-col rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-100 transition-all hover:shadow-md dark:bg-gray-800/80 dark:ring-gray-700">
              <div className="mb-4 flex-1 relative rounded-xl bg-gray-100 overflow-hidden dark:bg-gray-900">
                <Image
                  src={currentHappening.image}
                  alt={currentHappening.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex items-center justify-between px-1">
                <div className="min-w-0 flex-1 pr-3">
                  <span className="font-walsheim mb-1 block text-[9px] font-bold uppercase tracking-widest text-lime-600 dark:text-lime-400">{currentHappening.category}</span>
                  <h3 className="font-walsheim truncate text-sm font-semibold text-gray-900 dark:text-white">{currentHappening.title}</h3>
                </div>
                <div className="font-walsheim flex flex-shrink-0 items-center gap-1.5 rounded-full bg-orange-50 px-2.5 py-1 text-[9px] font-bold text-orange-600 dark:bg-orange-500/10 dark:text-orange-400">
                  <span className="h-1.5 w-1.5 rounded-full animate-pulse bg-current" />
                  <span className="uppercase tracking-widest">{currentHappening.status}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Find News Section
function FindNews() {
  const newsItems = [
    { title: "Gun Attack at White House", date: "Mar 12, 2024", category: "Politics" },
    { title: "Gun Attack at White House", date: "Mar 12, 2024", category: "Politics" },
    { title: "Elections at White House", date: "Mar 12, 2024", category: "Politics" },
    { title: "Eco News: What&apos;s New", date: "Mar 12, 2024", category: "Environment" },
    { title: "Gun Attack at White House", date: "Mar 12, 2024", category: "Politics", hasImage: true },
    { title: "Elections at White House", date: "Mar 12, 2024", category: "Politics" },
  ];

  const latestItems = [
    { title: "Elon Musk at White House", date: "Apr 25, 2025", category: "Politics" },
    { title: "Elon Musk at White House", date: "Apr 25, 2025", category: "Politics" },
    { title: "Elon Musk at White House", date: "Apr 25, 2025", category: "Politics" },
    { title: "Elon Musk at White House", date: "Apr 25, 2025", category: "Politics" },
  ];

  return (
    <section className="bg-gray-50 py-8 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[3fr_2fr]">
          <div className="flex items-center justify-between">
            <h2 className="font-freight text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Find News</h2>
            <div className="flex items-center gap-3">
              <button className="flex h-7 w-7 items-center justify-center rounded-md border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800" aria-label="Filter">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 3H2l8 9v7l4 2v-9l8-9z" />
                </svg>
              </button>
              <button className="flex h-7 w-7 items-center justify-center rounded-md border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800" aria-label="Layout">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h7v7H4z" />
                  <path d="M13 4h7v7h-7z" />
                  <path d="M4 13h7v7H4z" />
                  <path d="M13 13h7v7h-7z" />
                </svg>
              </button>
              <Link href="#" className="font-walsheim uppercase text-[11px] text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300">
                See All
              </Link>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <h2 className="font-freight text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Latest News</h2>
            <Link href="#" className="font-walsheim uppercase text-[11px] text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300">
              See All
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {newsItems.map((item, i) => (
              <div key={i} className="rounded-xl bg-white p-3 shadow-sm dark:bg-gray-800">
                {item.hasImage ? (
                  <div className="mb-3 aspect-square overflow-hidden rounded-lg bg-lime-100">
                    <Image
                      src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=300&h=200&fit=crop"
                      alt="Eco news"
                      width={300}
                      height={300}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="mb-3 aspect-square rounded-lg bg-gray-100 dark:bg-gray-700" />
                )}
                <span className="font-walsheim block text-[10px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">{item.category}</span>
                <h3 className="font-walsheim mt-1 text-sm font-semibold leading-snug text-black dark:text-white">{item.title}</h3>
                <span className="font-walsheim mt-1 block text-[11px] text-gray-400 dark:text-gray-500">{item.date}</span>
              </div>
            ))}
          </div>

          <div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-100 dark:bg-gray-800 dark:ring-gray-700">
            {latestItems.map((item, i) => (
              <div
                key={i}
                className={`flex items-center gap-4 p-4 ${
                  i === 0 ? "" : "border-t border-gray-100 dark:border-gray-700"
                }`}
              >
                <div className="h-14 w-14 flex-shrink-0 rounded-lg bg-gray-100 dark:bg-gray-700" />
                <div className="min-w-0">
                  <span className="font-walsheim block text-[10px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                    {item.category}
                  </span>
                  <h3 className="font-walsheim mt-1 truncate text-sm font-semibold leading-snug text-black dark:text-white">
                    {item.title}
                  </h3>
                  <span className="font-walsheim mt-1 block text-[11px] text-gray-400 dark:text-gray-500">
                    {item.date}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Latest News Section
function LatestNews() {
  const latestItems = [
    { title: "Gun Attack at White House", date: "Mar 12, 2024" },
    { title: "Gun Attack at White House", date: "Mar 12, 2024" },
    { title: "Gun Attack at White House", date: "Mar 12, 2024" },
    { title: "Gun Attack at White House", date: "Mar 12, 2024" },
  ];

  return (
    <section className="bg-gray-50 py-8 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Latest News List */}
          <div className="lg:col-span-2">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-freight text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Latest News</h2>
              <div className="flex gap-1">
                <button className="flex h-6 w-6 items-center justify-center rounded border border-gray-300 text-xs dark:border-gray-600 dark:text-gray-200">←</button>
                <button className="flex h-6 w-6 items-center justify-center rounded border border-gray-300 text-xs dark:border-gray-600 dark:text-gray-200">→</button>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {latestItems.map((item, i) => (
                <div key={i} className="flex gap-3 rounded-lg bg-white p-3 shadow-sm dark:bg-gray-800">
                  <div className="h-16 w-16 flex-shrink-0 rounded-lg bg-gray-100 dark:bg-gray-700"></div>
                  <div>
                    <h3 className="font-walsheim mb-1 text-sm font-medium text-black dark:text-white">{item.title}</h3>
                    <span className="text-xs text-gray-400 dark:text-gray-500">{item.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Ad Banner */}
          <div className="flex items-center justify-center">
            <div className="w-full max-w-xs rounded-lg bg-purple-900 p-6 text-white">
              <div className="mb-4 flex items-center gap-2">
                <div className="h-8 w-8 rounded bg-white/20"></div>
                <span className="font-freight font-semibold">Kuda.</span>
              </div>
              <h3 className="font-freight mb-4 text-xl font-bold">We&apos;re the bank of the free.</h3>
              <div className="flex gap-2">
                <div className="rounded bg-black px-3 py-2 text-xs">App Store</div>
                <div className="rounded bg-black px-3 py-2 text-xs">Google Play</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Newsletter Section
function Newsletter() {
  return (
    <section className="w-full bg-gray-50 py-12 dark:bg-gray-900">
      <div className="w-full">
        <div className="mx-auto w-full  bg-lime-100 px-8 py-16 text-center dark:bg-lime-100/40">
          <h2 className="font-freight mb-2 text-4xl font-bold italic text-black dark:text-white md:text-6xl">Stay on top <br/> of the spa world.</h2>
          <p className="mb-6 text-sm text-gray-600 dark:text-gray-300">The Best Health News, delivered to your inbox weekly.</p>
          <div className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-md border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:border-lime-500 focus:outline-none dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-500"
            />
            <button className="font-walsheim rounded-full bg-lime-500 px-10 py-3 text-sm font-bold uppercase tracking-widest text-gray-900 hover:bg-lime-600 transition-all shadow-md active:scale-95">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// END
export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <HeroSection />
      <TrendingNews />
      <FindNews />
      <Newsletter />
    </div>
  );
}
