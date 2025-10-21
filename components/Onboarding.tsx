import React, { useState } from 'react';
import type { PatientData } from '../types';
import { ALL_ACHIEVEMENTS } from '../lib/achievements';

interface OnboardingProps {
    onOnboardingComplete: (data: PatientData) => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onOnboardingComplete }) => {
    const [name, setName] = useState('');
    const [medication, setMedication] = useState('Ozempic');
    const [dose, setDose] = useState('0.25 mg');
    const [injectionDay, setInjectionDay] = useState('1'); // Monday
    const [startingWeight, setStartingWeight] = useState('');
    const [targetWeight, setTargetWeight] = useState('');
    const [motivation, setMotivation] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const today = new Date();
        const firstAchievement = ALL_ACHIEVEMENTS.find(a => a.id === 'onboarded');

        const newPatientData: PatientData = {
            name,
            medication,
            dose,
            injectionDay: parseInt(injectionDay, 10),
            startingWeight: parseFloat(startingWeight),
            targetWeight: parseFloat(targetWeight),
            motivation,
            weightHistory: [],
            sideEffectLogs: [],
            dailyStreak: 0,
            lastCheckinDate: null,
            refillDueDate: new Date(new Date().setDate(today.getDate() + 28)).toISOString().split('T')[0],
            points: 100,
            level: 1,
            achievements: firstAchievement ? [firstAchievement.id] : [],
            completedTasksToday: [],
        };
        onOnboardingComplete(newPatientData);
    };

    const isFormValid = name && startingWeight && targetWeight && motivation;

    return (
        <div className="min-h-screen bg-brand-light flex items-center justify-center p-4">
            <div className="max-w-xl w-full bg-white p-8 rounded-2xl shadow-lg">
                <div className="flex flex-col items-center text-center mb-6">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-brand-primary" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                    </svg>
                    <h1 className="text-3xl font-bold text-brand-dark mt-2">Welcome to HealthLoop</h1>
                    <p className="text-gray-600 mt-1">Let's set you up for success on your new journey.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Form fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Your Name</label>
                            <input type="text" value={name} onChange={e => setName(e.target.value)} required className="mt-1 w-full p-2 border border-gray-300 rounded-lg"/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Medication</label>
                            <select value={medication} onChange={e => setMedication(e.target.value)} className="mt-1 w-full p-2 border border-gray-300 rounded-lg bg-white">
                                <option>Ozempic</option>
                                <option>Wegovy</option>
                                <option>Mounjaro</option>
                                <option>Other</option>
                            </select>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Dose</label>
                            <input type="text" value={dose} onChange={e => setDose(e.target.value)} required className="mt-1 w-full p-2 border border-gray-300 rounded-lg" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Weekly Injection Day</label>
                            <select value={injectionDay} onChange={e => setInjectionDay(e.target.value)} className="mt-1 w-full p-2 border border-gray-300 rounded-lg bg-white">
                                <option value="0">Sunday</option>
                                <option value="1">Monday</option>
                                <option value="2">Tuesday</option>
                                <option value="3">Wednesday</option>
                                <option value="4">Thursday</option>
                                <option value="5">Friday</option>
                                <option value="6">Saturday</option>
                            </select>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Starting Weight (lbs)</label>
                            <input type="number" step="0.1" value={startingWeight} onChange={e => setStartingWeight(e.target.value)} required className="mt-1 w-full p-2 border border-gray-300 rounded-lg"/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Target Weight (lbs)</label>
                            <input type="number" step="0.1" value={targetWeight} onChange={e => setTargetWeight(e.target.value)} required className="mt-1 w-full p-2 border border-gray-300 rounded-lg"/>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">What's your motivation?</label>
                        <textarea value={motivation} onChange={e => setMotivation(e.target.value)} required placeholder="e.g., To feel healthier and have more energy for my family." rows={3} className="mt-1 w-full p-2 border border-gray-300 rounded-lg"></textarea>
                    </div>

                    <button type="submit" disabled={!isFormValid} className="w-full mt-4 py-3 bg-brand-primary text-white font-bold rounded-lg hover:bg-brand-dark disabled:bg-gray-400">
                        Start My Journey
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Onboarding;