import React from 'react';
import type { PatientData } from '../types';
import { ALL_ACHIEVEMENTS } from '../lib/achievements';
import TrophyIcon from './icons/TrophyIcon';

interface AchievementsProps {
    patientData: PatientData;
}

const Achievements: React.FC<AchievementsProps> = ({ patientData }) => {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-md">
            <div className="flex items-center gap-3 mb-4">
                <TrophyIcon className="w-8 h-8 text-brand-primary" />
                <h2 className="text-xl font-bold text-brand-dark">Achievements</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {ALL_ACHIEVEMENTS.map(ach => {
                    const isUnlocked = patientData.achievements.includes(ach.id);
                    const Icon = ach.icon;
                    return (
                        <div key={ach.id} className={`p-4 rounded-lg text-center transition-opacity ${isUnlocked ? 'bg-amber-100 border-amber-300 border' : 'bg-gray-100 opacity-50'}`}>
                            <Icon className={`w-12 h-12 mx-auto ${isUnlocked ? 'text-amber-500' : 'text-gray-400'}`} />
                            <h3 className={`mt-2 font-bold ${isUnlocked ? 'text-amber-800' : 'text-gray-600'}`}>{ach.name}</h3>
                            <p className="text-xs text-gray-500">{ach.description}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Achievements;
