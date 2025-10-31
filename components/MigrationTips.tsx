
import React from 'react';
import type { MigrationTip } from '../types';
import { LightBulbIcon } from './icons';

interface MigrationTipsProps {
  tips: MigrationTip[];
}

export const MigrationTips: React.FC<MigrationTipsProps> = ({ tips }) => {
  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-xl shadow-lg p-6">
      <ul className="space-y-4">
        {tips.map((tip, index) => (
          <li key={index} className="flex items-start p-4 bg-slate-800 rounded-lg">
            <div className="flex-shrink-0 mr-4">
              <span className="flex items-center justify-center w-10 h-10 bg-cyan-900/50 rounded-full">
                <LightBulbIcon className="w-6 h-6 text-cyan-400" />
              </span>
            </div>
            <div>
              <h4 className="font-bold text-lg text-slate-100">{tip.tip}</h4>
              <p className="text-slate-400">{tip.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
