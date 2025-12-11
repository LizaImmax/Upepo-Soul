import Link from 'next/link';
import { LucideIcon, ArrowRight } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
  color: string;
}

export default function FeatureCard({ icon: Icon, title, description, href, color }: FeatureCardProps) {
  return (
    <Link
      href={href}
      className="group relative p-8 rounded-3xl bg-white/60 backdrop-blur-sm border-2 border-sand-300 hover:border-gold-500 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
    >
      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
        <Icon className="w-8 h-8 text-white" />
      </div>
      
      <h3 className="text-2xl font-serif font-bold mb-3 bg-gradient-to-r from-gold-600 to-orchid-600 bg-clip-text text-transparent">
        {title}
      </h3>
      
      <p className="text-gray-600 mb-4 leading-relaxed">
        {description}
      </p>
      
      <div className="flex items-center text-orchid-600 font-medium group-hover:text-gold-500 transition-colors">
        <span>Explore</span>
        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
      </div>

      {/* Decorative element */}
      <div className={`absolute -z-10 inset-0 rounded-3xl bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 transition-opacity blur-xl`} />
    </Link>
  );
}
