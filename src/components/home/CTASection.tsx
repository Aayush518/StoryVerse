import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function CTASection() {
  return (
    <div className="relative py-32 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1516414447565-b14be0adf13e?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-[0.07]" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background/80" />
      </div>

      <div className="relative max-w-4xl mx-auto text-center">
        <div className="glass-card rounded-3xl p-12 backdrop-blur-xl">
          <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-primary to-accent text-transparent bg-clip-text mb-6">
            Start Your Writing Journey
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join our community of writers and unleash your creativity with powerful tools and endless possibilities.
          </p>
          <Link
            to="/create"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-primary hover:bg-primary/90 text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105"
          >
            <Sparkles className="h-5 w-5" />
            <span>Begin Your Story</span>
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}