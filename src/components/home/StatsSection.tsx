import React from 'react';
import { Users, BookOpen, Globe, Star } from 'lucide-react';

interface StatCardProps {
  icon: React.ElementType;
  value: string;
  label: string;
  gradient: string;
}

function StatCard({ icon: Icon, value, label, gradient }: StatCardProps) {
  return (
    <div className="group glass-card rounded-2xl p-8 hover:scale-105 transition-all duration-500">
      <Icon className={`h-8 w-8 mb-4 ${gradient}`} />
      <div className={`text-4xl font-bold ${gradient} group-hover:scale-110 transition-transform duration-500`}>
        {value}
      </div>
      <p className="text-muted-foreground mt-2">{label}</p>
    </div>
  );
}

export default function StatsSection() {
  const stats = [
    {
      icon: Users,
      value: "50K+",
      label: "Active Writers",
      gradient: "text-primary"
    },
    {
      icon: BookOpen,
      value: "100K+",
      label: "Stories Created",
      gradient: "text-purple-500"
    },
    {
      icon: Globe,
      value: "5K+",
      label: "Story Universes",
      gradient: "text-pink-500"
    },
    {
      icon: Star,
      value: "1M+",
      label: "Monthly Readers",
      gradient: "text-yellow-500"
    }
  ];

  return (
    <div className="relative py-32 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
      
      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>
      </div>
    </div>
  );
}