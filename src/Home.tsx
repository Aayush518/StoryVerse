import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, PenTool, Sparkles, Star, Compass, Users, Zap, Wand2 } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center">
        {/* Dynamic Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518932945647-7a1c969f8be2?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-[0.07] dark:opacity-[0.05]" />
          
          {/* Animated Gradients */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-[1000px] h-[1000px] rounded-full bg-primary/20 mix-blend-multiply filter animate-blob" />
            <div className="absolute bottom-0 right-0 w-[800px] h-[800px] rounded-full bg-purple-500/20 mix-blend-multiply filter animate-blob animation-delay-2000" />
            <div className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-pink-500/20 mix-blend-multiply filter animate-blob animation-delay-4000" />
          </div>
          
          {/* Particle Effects */}
          <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 50% 50%, transparent 0%, rgba(0,0,0,0.3) 100%)' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 text-center">
          {/* Animated Logo */}
          <div className="mb-16 inline-block relative">
            <div className="relative animate-pulse-ring">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary via-purple-500 to-pink-500 animate-glow opacity-75 blur-2xl" />
              <div className="relative glass-card p-8 rounded-full group hover:scale-105 transition-transform duration-500">
                <BookOpen className="h-24 w-24 sm:h-32 sm:w-32 text-primary animate-float" />
              </div>
            </div>
          </div>

          {/* Hero Content */}
          <div className="space-y-8">
            <h1 className="text-7xl sm:text-9xl font-bold tracking-tight">
              <span className="block bg-gradient-to-r from-primary via-purple-500 to-pink-500 text-transparent bg-clip-text animate-shimmer pb-2">
                Unleash Your
              </span>
              <span className="block bg-gradient-to-r from-pink-500 via-purple-500 to-primary text-transparent bg-clip-text animate-shimmer">
                Imagination
              </span>
            </h1>

            <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Where stories transcend reality and imagination knows no bounds
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
              <Link
                to="/create"
                className="group relative px-8 py-4 glass-card hover:scale-105 transition-all duration-500"
              >
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                <div className="relative flex items-center justify-center gap-3 text-foreground group-hover:text-white">
                  <span className="font-semibold text-lg">Start Creating</span>
                  <Wand2 className="h-5 w-5 group-hover:rotate-45 transition-transform duration-500" />
                </div>
              </Link>
              
              <Link
                to="/explore"
                className="group px-8 py-4 glass-card hover:scale-105 transition-all duration-500 flex items-center justify-center gap-3"
              >
                <span className="font-semibold text-lg">Explore Worlds</span>
                <Compass className="h-5 w-5 group-hover:animate-spin-slow" />
              </Link>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 animate-float">
            <Star className="h-8 w-8 text-primary/40" />
          </div>
          <div className="absolute top-1/3 right-1/4 animate-float animation-delay-2000">
            <Sparkles className="h-6 w-6 text-purple-500/40" />
          </div>
          <div className="absolute bottom-1/4 left-1/3 animate-float animation-delay-4000">
            <Zap className="h-7 w-7 text-pink-500/40" />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative py-32">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={PenTool}
              title="AI-Enhanced Writing"
              description="Transform your ideas into captivating stories with our intelligent writing assistant"
              gradient="from-primary to-purple-600"
            />
            <FeatureCard
              icon={Users}
              title="Collaborative Worlds"
              description="Build expansive universes together with writers from around the globe"
              gradient="from-purple-600 to-pink-600"
            />
            <FeatureCard
              icon={Sparkles}
              title="Endless Possibilities"
              description="Let your creativity soar with powerful world-building tools and features"
              gradient="from-pink-600 to-primary"
            />
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="relative py-32">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <StatCard value="50K+" label="Active Writers" />
            <StatCard value="100K+" label="Stories Created" />
            <StatCard value="5K+" label="Story Universes" />
            <StatCard value="1M+" label="Monthly Readers" />
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description, gradient }: {
  icon: React.ElementType;
  title: string;
  description: string;
  gradient: string;
}) {
  return (
    <div className="group glass-card rounded-2xl p-8 hover:scale-105 glass-hover">
      <div className={`bg-gradient-to-br ${gradient} rounded-xl w-16 h-16 flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-500`}>
        <Icon className="h-8 w-8 text-white" />
      </div>
      <h3 className={`text-2xl font-bold mb-4 bg-gradient-to-r ${gradient} text-transparent bg-clip-text`}>
        {title}
      </h3>
      <p className="text-muted-foreground">
        {description}
      </p>
    </div>
  );
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="group glass-card rounded-2xl p-8 hover:scale-105 glass-hover">
      <div className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 text-transparent bg-clip-text group-hover:scale-110 transition-transform duration-500">
        {value}
      </div>
      <p className="text-muted-foreground mt-2">{label}</p>
    </div>
  );
}