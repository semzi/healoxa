"use client";
import { useState } from "react";
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from "lucide-react";

interface Comment {
  id: number;
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
  upvotes: number;
  downvotes: number;
  replies: Comment[];
}

export default function NewsArticle() {
  const [upvotes, setUpvotes] = useState(234);
  const [downvotes, setDownvotes] = useState(12);
  const [userVote, setUserVote] = useState<"up" | "down" | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      author: "Sarah Johnson",
      avatar: "https://i.pravatar.cc/150?img=1",
      content: "This is such an insightful article! I've been trying similar habits for the past few months and the results have been amazing. The key is consistency.",
      timestamp: "2 hours ago",
      upvotes: 45,
      downvotes: 2,
      replies: [],
    },
    {
      id: 2,
      author: "Michael Chen",
      avatar: "https://i.pravatar.cc/150?img=2",
      content: "Great breakdown of the science behind these habits. Would love to see more articles on nutrition and how it complements these practices.",
      timestamp: "4 hours ago",
      upvotes: 32,
      downvotes: 1,
      replies: [
        {
          id: 3,
          author: "Emma Williams",
          avatar: "https://i.pravatar.cc/150?img=3",
          content: "I second this! Nutrition is such an important part of overall health.",
          timestamp: "3 hours ago",
          upvotes: 12,
          downvotes: 0,
          replies: [],
        },
      ],
    },
  ]);

  const handleVote = (type: "up" | "down") => {
    if (userVote === type) {
      // Remove vote
      if (type === "up") {
        setUpvotes(upvotes - 1);
      } else {
        setDownvotes(downvotes - 1);
      }
      setUserVote(null);
    } else {
      // Change or add vote
      if (userVote === "up") {
        setUpvotes(upvotes - 1);
      } else if (userVote === "down") {
        setDownvotes(downvotes - 1);
      }
      
      if (type === "up") {
        setUpvotes(upvotes + 1);
      } else {
        setDownvotes(downvotes + 1);
      }
      setUserVote(type);
    }
  };

  const handleSubmitComment = () => {
    if (!commentText.trim()) return;
    
    const newComment: Comment = {
      id: comments.length + 1,
      author: "You",
      avatar: "https://i.pravatar.cc/150?img=8",
      content: commentText,
      timestamp: "Just now",
      upvotes: 0,
      downvotes: 0,
      replies: [],
    };
    
    setComments([newComment, ...comments]);
    setCommentText("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16 flex flex-col lg:flex-row gap-12">
        {/* Left Column - Main Content */}
        <div className="w-full lg:w-[75%] lg:pr-4 text-left">
          {/* Article Header */}
          <header className="mb-8">
            <p className="font-walsheim text-sm md:text-base mb-4 text-lime-600 dark:text-lime-400 font-bold uppercase tracking-widest">
              Health & Wellness
            </p>
            <h1 className="font-freight text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight text-gray-900 dark:text-white">
              5 Simple Daily Habits That Will Transform Your Health in 30 Days
            </h1>
            <div className="flex items-center gap-4 font-walsheim">
              <div className="flex items-center gap-3">
                <img
                  src="https://i.pravatar.cc/150?img=5"
                  alt="Author"
                  className="w-12 h-12 rounded-full border border-gray-200 dark:border-gray-700 shadow-sm"
                />
                <div className="text-left">
                  <p className="text-sm font-bold text-gray-900 dark:text-white">Dr. Emily Roberts</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">March 14, 2026 · 8 min read</p>
                </div>
              </div>
            </div>
          </header>

          {/* Article Hero Image */}
          <div className="w-full mb-10">
            <div className="w-full relative overflow-hidden rounded-2xl shadow-md ring-1 ring-gray-100 dark:ring-gray-800">
              <img
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1080&h=720&fit=crop"
                alt="Health and wellness"
                className="w-full object-cover max-h-[40vh] md:max-h-[450px]"
              />
            </div>
          </div>

          {/* Article Content */}
          <main className="py-2">
        {/* Article Body */}
        <article className="prose prose-lg dark:prose-invert max-w-none">
          <p className="font-crimson text-xl md:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed mb-8 italic">
            Discover the science-backed habits that can revolutionize your physical and mental well-being in just one month. No gym membership required.
          </p>

          <div className="font-crimson text-gray-800 dark:text-gray-200 space-y-6">
            <p className="text-lg leading-relaxed">
              In today&apos;s fast-paced world, finding time for health can feel impossible. But what if small, consistent changes could dramatically improve your well-being in just 30 days? Research shows that it takes about 30 days to form a habit, and these five simple practices can transform your health without requiring hours at the gym or a complete lifestyle overhaul.
            </p>

            <h2 className="font-freight text-3xl md:text-4xl font-bold mt-12 mb-6 text-gray-900 dark:text-white">
              1. Morning Hydration Ritual
            </h2>
            <p className="text-lg leading-relaxed">
              Start each day with 16 ounces of water before your morning coffee. After a night&apos;s sleep, your body is dehydrated, and rehydrating immediately helps kickstart your metabolism, improves cognitive function, and supports natural detoxification processes.
            </p>
            <p className="text-lg leading-relaxed">
              A study published in the <span className="font-walsheim italic text-gray-700 dark:text-gray-400">Journal of Clinical Endocrinology & Metabolism</span> found that drinking water increased metabolic rate by 30% within 10 minutes, with the maximum effect occurring after 30-40 minutes.
            </p>

            <h2 className="font-freight text-3xl md:text-4xl font-bold mt-12 mb-6 text-gray-900 dark:text-white">
              2. Ten-Minute Movement Breaks
            </h2>
            <p className="text-lg leading-relaxed">
              Incorporate three 10-minute movement sessions throughout your day. These don&apos;t need to be intense workouts—brisk walking, stretching, or light bodyweight exercises can significantly impact your cardiovascular health, mood, and energy levels.
            </p>
            <p className="text-lg leading-relaxed">
              Research from <span className="font-walsheim italic text-gray-700 dark:text-gray-400">Medicine & Science in Sports & Exercise</span> demonstrates that short bursts of activity spread throughout the day can be as effective as one longer workout session for improving blood sugar control and reducing cardiovascular risk.
            </p>

            <blockquote className="border-l-4 border-green-500 pl-6 my-8 italic text-xl text-gray-700 dark:text-gray-300">
              &ldquo;The key to lasting health isn&apos;t perfection—it&apos;s consistency. Small habits done daily compound into remarkable results.&rdquo;
            </blockquote>

            <h2 className="font-freight text-3xl md:text-4xl font-bold mt-12 mb-6 text-gray-900 dark:text-white">
              3. Mindful Eating Practice
            </h2>
            <p className="text-lg leading-relaxed">
              Dedicate at least one meal per day to mindful eating. This means eliminating distractions (no phones, TV, or computers), chewing slowly, and paying attention to hunger and fullness cues. This practice can improve digestion, reduce overeating, and enhance your relationship with food.
            </p>

            <h2 className="font-freight text-3xl md:text-4xl font-bold mt-12 mb-6 text-gray-900 dark:text-white">
              4. Evening Digital Sunset
            </h2>
            <p className="text-lg leading-relaxed">
              Power down all screens 60 minutes before bedtime. The blue light emitted by phones, tablets, and computers suppresses melatonin production, disrupting your circadian rhythm and sleep quality. Replace screen time with reading, gentle stretching, journaling, or conversation.
            </p>
            <p className="text-lg leading-relaxed">
              Harvard Medical School research indicates that blue light exposure at night can shift your circadian rhythm by up to three hours, making it harder to fall asleep and wake up naturally.
            </p>

            <h2 className="font-freight text-3xl md:text-4xl font-bold mt-12 mb-6 text-gray-900 dark:text-white">
              5. Gratitude Journaling
            </h2>
            <p className="text-lg leading-relaxed">
              End each day by writing down three things you&apos;re grateful for. This simple practice has been shown to reduce stress, improve sleep quality, and boost overall life satisfaction. The mental health benefits are just as important as physical health when it comes to long-term wellness.
            </p>

            <h2 className="font-freight text-3xl md:text-4xl font-bold mt-12 mb-6 text-gray-900 dark:text-white">
              The Compound Effect
            </h2>
            <p className="text-lg leading-relaxed">
              While each of these habits is powerful on its own, their true magic lies in how they work together. Better hydration improves your energy for movement. Regular activity enhances sleep quality. Quality sleep makes mindful eating easier. And gratitude practice reduces the stress that often leads to poor health choices.
            </p>
            <p className="text-lg leading-relaxed">
              Start with one habit if that feels manageable, then gradually add others. Remember, progress—not perfection—is the goal. In 30 days, you&apos;ll be amazed at how different you feel.
            </p>
          </div>
        </article>

        {/* Tags */}
        <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-800">
          <div className="flex flex-wrap gap-2">
            {["Health", "Wellness", "Fitness", "Nutrition", "Mental Health", "Lifestyle"].map((tag) => (
              <span
                key={tag}
                className="font-walsheim px-5 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-2xl text-xs font-bold uppercase tracking-widest hover:border-lime-400 hover:text-lime-600 dark:hover:text-lime-400 cursor-pointer transition-all shadow-sm hover:shadow-md"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Interaction Bar (Instagram Style) */}
        <div className="mt-8 pt-4 border-t border-gray-100 dark:border-gray-800">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-4">
              <button
                onClick={() => handleVote("up")}
                className="group p-1 -ml-1 transition-transform active:scale-95"
              >
                <Heart
                  className={`w-7 h-7 transition-all ${
                    userVote === "up"
                      ? "fill-red-500 stroke-red-500"
                      : "stroke-gray-900 dark:stroke-white group-hover:stroke-gray-600 dark:group-hover:stroke-gray-300"
                  }`}
                />
              </button>
              <button className="group p-1 transition-transform active:scale-95" onClick={() => {
                const el = document.getElementById('comment-input');
                if(el) { el.focus(); el.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
              }}>
                <MessageCircle className="w-7 h-7 stroke-gray-900 dark:stroke-white group-hover:stroke-gray-600 dark:group-hover:stroke-gray-300" />
              </button>
              <button className="group p-1 transition-transform active:scale-95">
                <Send className="w-7 h-7 stroke-gray-900 dark:stroke-white group-hover:stroke-gray-600 dark:group-hover:stroke-gray-300 -mt-0.5" />
              </button>
            </div>
            <button
              onClick={() => setIsBookmarked(!isBookmarked)}
              className="group p-1 -mr-1 transition-transform active:scale-95"
            >
              <Bookmark
                className={`w-7 h-7 transition-all ${
                  isBookmarked
                    ? "fill-gray-900 stroke-gray-900 dark:fill-white dark:stroke-white"
                    : "stroke-gray-900 dark:stroke-white group-hover:stroke-gray-600 dark:group-hover:stroke-gray-300"
                }`}
              />
            </button>
          </div>
          <div className="font-walsheim font-bold text-sm text-gray-900 dark:text-white mb-2">
            {upvotes.toLocaleString()} likes
          </div>
        </div>

        {/* Comments Section */}
        <section className="mt-4">
          {/* Comments List */}
          <div className="space-y-4 mb-6">
            {comments.map((comment) => (
              <CommentItem key={comment.id} comment={comment} />
            ))}
          </div>

          {/* Comment Form (Instagram Style) */}
          <div className="flex items-center gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
            <img
              src="https://i.pravatar.cc/150?img=8"
              alt="Your avatar"
              className="w-8 h-8 rounded-full"
            />
            <div className="flex-1 relative flex items-center">
              <input
                id="comment-input"
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyDown={(e) => { if(e.key === 'Enter') handleSubmitComment(); }}
                placeholder="Add a comment..."
                className="w-full bg-transparent border-none focus:ring-0 px-0 text-sm font-walsheim text-gray-900 dark:text-white placeholder-gray-500"
              />
              {commentText.trim() && (
                <button
                  onClick={handleSubmitComment}
                  className="absolute right-0 text-lime-600 dark:text-lime-400 font-walsheim font-bold text-sm tracking-wide hover:text-lime-700 dark:hover:text-lime-300 transition-colors"
                >
                  Post
                </button>
              )}
            </div>
          </div>
        </section>
          </main>
        </div>

        {/* Right Column - Ads Sidebar */}
        <aside className="w-full lg:w-[25%] lg:min-w-[280px] lg:max-w-sm space-y-8 mt-12 lg:mt-0">
          <div className="sticky top-8 space-y-8">
            {/* Demo Ad 1: Fintech / Banner */}
            <div className="w-full rounded-2xl bg-purple-900 p-6 text-white shadow-md ring-1 ring-purple-800/50">
              <div className="mb-4 flex items-center gap-2">
                <div className="h-8 w-8 rounded bg-white/20"></div>
                <span className="font-freight font-semibold text-lg">Kuda.</span>
              </div>
              <h3 className="font-freight mb-6 text-2xl font-bold leading-snug">We&apos;re the bank of the free.</h3>
              <div className="flex flex-col gap-3 xl:flex-row">
                <button className="rounded-lg bg-black px-4 py-2 text-sm font-semibold hover:bg-gray-900 transition-colors text-center w-full">App Store</button>
                <button className="rounded-lg bg-black px-4 py-2 text-sm font-semibold hover:bg-gray-900 transition-colors text-center w-full">Google Play</button>
              </div>
            </div>

            {/* Demo Ad 2: Placeholder Block */}
            <div className="w-full h-[320px] rounded-2xl bg-gray-100 dark:bg-gray-800 flex flex-col items-center justify-center p-6 text-center shadow-sm relative overflow-hidden ring-1 ring-gray-200 dark:ring-gray-700">
              <span className="absolute top-3 right-4 font-walsheim text-[9px] font-bold uppercase tracking-widest text-gray-400">Sponsored</span>
              <div className="w-16 h-16 bg-lime-100 dark:bg-lime-900/30 rounded-full flex items-center justify-center mb-5">
                <Bookmark className="w-6 h-6 text-lime-600 dark:text-lime-400" />
              </div>
              <h4 className="font-freight text-2xl font-bold text-gray-900 dark:text-white mb-2">Space Available</h4>
              <p className="font-walsheim text-sm text-gray-500 dark:text-gray-400 max-w-[200px]">Promote your brand here and reach thousands of readers daily.</p>
              <button className="mt-6 font-walsheim rounded-lg border-2 border-gray-300 dark:border-gray-600 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 transition">Contact Us</button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

// Comment Component with voting
// Comment Component with Instagram-style compact voting
function CommentItem({ comment }: { comment: Comment }) {
  const [userVote, setUserVote] = useState<"up" | null>(null);
  const totalLikes = comment.upvotes + (userVote === "up" ? 1 : 0);

  const toggleLike = () => {
    setUserVote(userVote === "up" ? null : "up");
  };

  return (
    <div className="flex gap-3 text-sm font-walsheim group">
      <img
        src={comment.avatar}
        alt={comment.author}
        className="w-8 h-8 rounded-full flex-shrink-0 mt-0.5"
      />
      <div className="flex-1 min-w-0">
        <p className="text-gray-900 dark:text-gray-100 leading-tight mb-1">
          <span className="font-bold mr-2 text-[13px]">{comment.author}</span>
          <span className="font-crimson text-[15px]">{comment.content}</span>
        </p>
        <div className="flex items-center gap-4 mt-1 text-[11px] text-gray-500 dark:text-gray-400 font-medium font-walsheim">
          <span>{comment.timestamp}</span>
          {totalLikes > 0 && <span className="font-bold">{totalLikes} likes</span>}
          <button className="font-bold hover:text-gray-900 dark:hover:text-gray-200">Reply</button>
          <button className="opacity-0 group-hover:opacity-100 transition-opacity">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
        
        {/* Replies */}
        {comment.replies && comment.replies.length > 0 && (
          <div className="mt-3 space-y-4">
            <button className="flex items-center gap-3 text-xs font-bold text-gray-500 dark:text-gray-400 mb-2">
              <div className="w-6 border-b border-gray-300 dark:border-gray-600"></div>
              View replies ({comment.replies.length})
            </button>
            {/* Displaying one reply as an example structure, normally you'd map comment.replies */}
            {comment.replies.map((reply) => (
              <CommentItem key={reply.id} comment={reply} />
            ))}
          </div>
        )}
      </div>
      <div className="flex-shrink-0 pt-1 flex items-start pl-2">
        <button onClick={toggleLike} className="active:scale-95 transition-transform">
          <Heart className={`w-3.5 h-3.5 ${userVote === "up" ? "fill-red-500 stroke-red-500" : "stroke-gray-400 dark:stroke-gray-500"}`} />
        </button>
      </div>
    </div>
  );
}
