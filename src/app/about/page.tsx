import Image from "next/image";
import Link from "next/link";
import { Heart, Users, Award, Target } from "lucide-react";

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Dr. Emily Roberts",
      role: "Founder & Chief Wellness Officer",
      avatar: "https://i.pravatar.cc/300?img=5",
      bio: "PhD in Nutritional Science with 15+ years of experience in holistic health.",
    },
    {
      name: "Michael Chen",
      role: "Head of Fitness Programming",
      avatar: "https://i.pravatar.cc/300?img=12",
      bio: "Certified personal trainer and former Olympic athlete passionate about accessible fitness.",
    },
    {
      name: "Sarah Johnson",
      role: "Mental Health Advocate",
      avatar: "https://i.pravatar.cc/300?img=9",
      bio: "Licensed therapist specializing in stress management and mindfulness practices.",
    },
    {
      name: "Dr. James Williams",
      role: "Medical Advisor",
      avatar: "https://i.pravatar.cc/300?img=11",
      bio: "Board-certified physician dedicated to evidence-based wellness information.",
    },
  ];

  const values = [
    {
      icon: Heart,
      title: "Health First",
      description: "Every article is reviewed by medical professionals to ensure accuracy and safety.",
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "We listen to our community and create content that addresses real health concerns.",
    },
    {
      icon: Award,
      title: "Evidence-Based",
      description: "All our content is backed by scientific research and expert insights.",
    },
    {
      icon: Target,
      title: "Accessible Wellness",
      description: "We believe everyone deserves access to quality health information, regardless of background.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1920&h=1080&fit=crop"
            alt="Wellness background"
            fill
            className="object-cover opacity-10 dark:opacity-5"
          />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-freight text-5xl md:text-7xl font-bold italic text-gray-900 dark:text-white mb-6">
            Your Partner in <span className="text-green-600">Wellness</span>
          </h1>
          <p className="font-crimson text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Empowering you to live a healthier, stronger life through evidence-based information and practical guidance.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-freight text-4xl md:text-5xl font-bold italic text-gray-900 dark:text-white mb-6">
                Our Story
              </h2>
              <div className="font-crimson text-gray-700 dark:text-gray-300 space-y-4 text-lg leading-relaxed">
                <p>
                  Healoxa was born from a simple belief: everyone deserves access to reliable, 
                  easy-to-understand health and wellness information. In a world flooded with 
                  conflicting advice and quick-fix solutions, we stand for science-backed 
                  wisdom that actually works.
                </p>
                <p>
                  Founded in 2024 by a team of healthcare professionals, fitness experts, 
                  and wellness enthusiasts, Healoxa has grown into a trusted resource for 
                  thousands seeking to improve their physical and mental well-being.
                </p>
                <p>
                  We&apos;re not just sharing information—we&apos;re building a movement toward 
                  sustainable, healthy living that fits into real life. No extreme diets, 
                  no impossible workout routines, just practical habits that compound into 
                  remarkable results over time.
                </p>
              </div>
            </div>
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=1000&fit=crop"
                alt="Our story"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-freight text-4xl md:text-5xl font-bold italic text-gray-900 dark:text-white mb-4">
              Our Mission & Values
            </h2>
            <p className="font-crimson text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              We&apos;re guided by principles that keep us focused on what truly matters: your health and well-being.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-14 h-14 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mb-6">
                  <value.icon className="w-7 h-7 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="font-walsheim text-xl font-bold uppercase tracking-wider text-gray-900 dark:text-white mb-3">
                  {value.title}
                </h3>
                <p className="font-crimson text-gray-700 dark:text-gray-300 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-freight text-4xl md:text-5xl font-bold italic text-gray-900 dark:text-white mb-4">
              Meet Our Team
            </h2>
            <p className="font-crimson text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              Expert professionals dedicated to bringing you the best wellness content.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="group text-center"
              >
                <div className="relative w-full aspect-square mb-6 overflow-hidden rounded-2xl shadow-lg group-hover:shadow-xl transition-shadow">
                  <Image
                    src={member.avatar}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="font-walsheim text-lg font-bold uppercase tracking-wider text-gray-900 dark:text-white mb-2">
                  {member.name}
                </h3>
                <p className="font-walsheim text-sm text-green-600 dark:text-green-400 uppercase tracking-wider mb-3">
                  {member.role}
                </p>
                <p className="font-crimson text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-24 bg-green-600 dark:bg-green-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="font-freight text-5xl md:text-6xl font-bold italic text-white mb-2">
                780+
              </p>
              <p className="font-walsheim text-sm uppercase tracking-wider text-green-100">
                Articles Published
              </p>
            </div>
            <div>
              <p className="font-freight text-5xl md:text-6xl font-bold italic text-white mb-2">
                50K+
              </p>
              <p className="font-walsheim text-sm uppercase tracking-wider text-green-100">
                Monthly Readers
              </p>
            </div>
            <div>
              <p className="font-freight text-5xl md:text-6xl font-bold italic text-white mb-2">
                100%
              </p>
              <p className="font-walsheim text-sm uppercase tracking-wider text-green-100">
                Evidence-Based
              </p>
            </div>
            <div>
              <p className="font-freight text-5xl md:text-6xl font-bold italic text-white mb-2">
                24/7
              </p>
              <p className="font-walsheim text-sm uppercase tracking-wider text-green-100">
                Free Access
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-freight text-4xl md:text-5xl font-bold italic text-gray-900 dark:text-white mb-6">
            Join Our Wellness Community
          </h2>
          <p className="font-crimson text-xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
            Get weekly wellness tips, expert insights, and exclusive content delivered straight to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-crimson focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <button className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-walsheim font-medium uppercase tracking-wider rounded-lg transition-colors whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
