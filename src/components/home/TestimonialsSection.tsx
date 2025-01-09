import React from 'react';
import { Quote } from 'lucide-react';

interface TestimonialProps {
  content: string;
  author: string;
  role: string;
  delay: string;
}

function TestimonialCard({ content, author, role, delay }: TestimonialProps) {
  return (
    <div 
      className="glass-card rounded-2xl p-8 hover:scale-105 transition-all duration-500"
      style={{ animationDelay: delay }}
    >
      <Quote className="h-8 w-8 text-primary mb-6" />
      <p className="text-lg text-muted-foreground mb-6">{content}</p>
      <div>
        <div className="font-semibold">{author}</div>
        <div className="text-sm text-muted-foreground">{role}</div>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  const testimonials = [
    {
      content: "StoryVerse has transformed how I write and collaborate with other authors. The AI assistance is like having a creative partner!",
      author: "Sarah Mitchell",
      role: "Fantasy Author",
      delay: "0ms"
    },
    {
      content: "The collaborative features make it easy to build complex story universes with other writers. It's revolutionized my writing process.",
      author: "James Chen",
      role: "Sci-Fi Writer",
      delay: "200ms"
    },
    {
      content: "I've found an incredible community of writers here. The feedback and support have helped me grow tremendously as an author.",
      author: "Emily Rodriguez",
      role: "Mystery Writer",
      delay: "400ms"
    }
  ];

  return (
    <div className="relative py-32 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background/80" />
      
      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-primary to-accent text-transparent bg-clip-text mb-4">
            Writer Stories
          </h2>
          <p className="text-xl text-muted-foreground">
            Hear from our community of storytellers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
      </div>
    </div>
  );
}