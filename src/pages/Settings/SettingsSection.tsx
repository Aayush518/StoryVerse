import React from 'react';
import { LucideIcon } from 'lucide-react';

interface SettingsSectionProps {
  icon: LucideIcon;
  title: string;
  children: React.ReactNode;
}

export default function SettingsSection({ icon: Icon, title, children }: SettingsSectionProps) {
  return (
    <div className="settings-section glass-card rounded-xl p-6 hover:bg-card/95 transition-all duration-300 hover:shadow-lg">
      <div className="flex items-center space-x-3 mb-4">
        <Icon className="h-6 w-6 text-primary" />
        <h2 className="text-xl font-bold text-foreground">{title}</h2>
      </div>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
}