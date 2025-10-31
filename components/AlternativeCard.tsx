
import React from 'react';
import type { Alternative } from '../types';
import { CheckCircleIcon, ExternalLinkIcon, InfoIcon, XCircleIcon } from './icons';

interface AlternativeCardProps {
  alternative: Alternative;
}

const categoryColors: Record<string, string> = {
  'Open-Source': 'bg-green-500/20 text-green-300 border-green-500/30',
  'Commercial': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  'Specialized': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
};

const ListItem: React.FC<{ icon: React.ReactNode; text: string }> = ({ icon, text }) => (
    <li className="flex items-start">
        <span className="mr-2 mt-1 flex-shrink-0">{icon}</span>
        <span>{text}</span>
    </li>
);

export const AlternativeCard: React.FC<AlternativeCardProps> = ({ alternative }) => {
  const categoryColor = categoryColors[alternative.category] || 'bg-slate-500/20 text-slate-300';
  
  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-xl shadow-lg flex flex-col h-full transition-all duration-300 hover:border-cyan-500/50 hover:shadow-cyan-500/10 hover:-translate-y-1">
      <div className="p-5 flex-grow">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-2xl font-bold text-slate-100">{alternative.name}</h3>
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${categoryColor}`}>{alternative.category}</span>
        </div>
        <p className="text-lg font-medium text-cyan-400 mb-4">{alternative.pricing}</p>

        <div className="space-y-5 text-sm">
          <div>
            <h4 className="font-semibold text-slate-300 mb-2 flex items-center"><InfoIcon className="w-4 h-4 mr-2" /> Key Features</h4>
            <ul className="space-y-1 text-slate-400 list-inside">
              {alternative.keyFeatures.map((feature, i) => <li key={i}>- {feature}</li>)}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-slate-300 mb-2 flex items-center"><CheckCircleIcon className="w-4 h-4 mr-2 text-green-400" /> Pros</h4>
            <ul className="space-y-1.5 text-slate-400">
              {alternative.pros.map((pro, i) => <ListItem key={i} icon={<CheckCircleIcon className="w-4 h-4 text-green-400" />} text={pro} />)}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-slate-300 mb-2 flex items-center"><XCircleIcon className="w-4 h-4 mr-2 text-red-400" /> Cons</h4>
            <ul className="space-y-1.5 text-slate-400">
              {alternative.cons.map((con, i) => <ListItem key={i} icon={<XCircleIcon className="w-4 h-4 text-red-400" />} text={con} />)}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-slate-300 mb-2">Getting Started</h4>
            <p className="text-slate-400">{alternative.howToGetStarted}</p>
          </div>
        </div>
      </div>
      <div className="p-5 border-t border-slate-700 mt-auto bg-slate-800 rounded-b-xl">
        <a 
          href={`https://${alternative.website}`} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center justify-center w-full transition-colors"
        >
          Visit Website <ExternalLinkIcon className="w-4 h-4 ml-2" />
        </a>
      </div>
    </div>
  );
};
