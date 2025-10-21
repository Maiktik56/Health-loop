import React from 'react';
import type { PatientData } from '../types';

const JourneyProgress: React.FC<{ patientData: PatientData }> = ({ patientData }) => {
    const { startingWeight, targetWeight, weightHistory } = patientData;
    const currentWeight = weightHistory.length > 0 ? weightHistory[weightHistory.length - 1].weight : startingWeight;
    const weightLost = startingWeight - currentWeight;
    const totalToLose = startingWeight - targetWeight;
    const progress = totalToLose > 0 ? Math.max(0, Math.min(100, (weightLost / totalToLose) * 100)) : 0;
    
    const circumference = 2 * Math.PI * 54; // 2 * pi * radius
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
        <div className="bg-white p-6 rounded-2xl shadow-md flex items-center gap-6">
            <div className="relative w-40 h-40">
                <svg className="w-full h-full" viewBox="0 0 120 120">
                    <circle className="text-gray-200" strokeWidth="12" stroke="currentColor" fill="transparent" r="54" cx="60" cy="60" />
                    <circle
                        className="text-brand-secondary"
                        strokeWidth="12"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="transparent"
                        r="54"
                        cx="60"
                        cy="60"
                        transform="rotate(-90 60 60)"
                        style={{ transition: 'stroke-dashoffset 0.5s ease-in-out' }}
                    />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-bold text-brand-dark">{progress.toFixed(0)}%</span>
                    <span className="text-sm text-gray-500">to goal</span>
                </div>
            </div>
            <div className="flex-1">
                <h2 className="text-xl font-bold text-brand-dark mb-4">Your Journey Progress</h2>
                <div className="grid grid-cols-3 gap-4 text-center">
                     <div>
                        <p className="text-gray-500 text-sm">Start</p>
                        <p className="text-2xl font-bold text-gray-700">{startingWeight.toFixed(1)}</p>
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm">Current</p>
                        <p className="text-2xl font-bold text-brand-dark">{currentWeight.toFixed(1)}</p>
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm">Lost</p>
                        <p className="text-2xl font-bold text-brand-secondary">{weightLost.toFixed(1)} lbs</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JourneyProgress;