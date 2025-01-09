import React from 'react';
import { Sparkles, Users, Globe, Zap, BookOpen, Star } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  gradient: string;
  delay: string;
}

function FeatureCard({ icon: Icon, title, description, gradient, delay }: FeatureCardProps) {
  return (
    <div 
      className="group glass-card rounded-2xl p-8 hover:scale-105 transition-all duration-500"
      style={{ animationDelay: delay }}
    >
      <div className={`bg-gradient-to-br ${gradient} rounded-xl w-16 h-16 flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-500`}>
        <Icon className="h-8 w-8 text-white" />
      </div>
      <h3 className={`text-2xl font-bold mb-4 bg-gradient-to-r ${gradient} text-transparent bg-clip-text`}>
        {title}
      </h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}

export default function FeaturesSection() {
  const features = [
    {
      icon: Sparkles,
      title: "AI-Enhanced Writing",
      description: "Transform your ideas into captivating stories with our intelligent writing assistant",
      gradient: "from-primary to-purple-600",
      delay: "0ms"
    },
    {
      icon: Users,
      title: "Collaborative Worlds",
      description: "Build expansive universes together with writers from around the globe",
      gradient: "from-purple-600 to-pink-600",
      delay: "200ms"
    },
    {
      icon: Globe,
      title: "Global Community",
      description: "Connect with writers worldwide and share your unique perspective",
      gradient: "from-pink-600 to-primary",
      delay: "400ms"
    },
    {
      icon: Zap,
      title: "Real-time Editing",
      description: "Collaborate with others in real-time with our powerful editing tools",
      gradient: "from-blue-600 to-cyan-600",
      delay: "600ms"
    },
    {
      icon: BookOpen,
      title: "Story Universes",
      description: "Create interconnected stories within rich, detailed universes",
      gradient: "from-cyan-600 to-green-600",
      delay: "800ms"
    },
    {
      icon: Star,
      title: "Achievement System",
      description: "Earn rewards and recognition for your creative accomplishments",
      gradient: "from-green-600 to-yellow-600",
      delay: "1000ms"
    }
  ];

  return (
    <div className="relative py-32 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80')] bg-fixed bg-cover bg-center opacity-5" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background/80" />
      
      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-primary to-accent text-transparent bg-clip-text mb-4">
            Extraordinary Features
          </h2>
          <p className="text-xl text-muted-foreground">
            Empowering your creative journey with cutting-edge tools
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </div>
  );
}