import React from 'react';
import type { PatientData } from '../types';
import DailyTasks from './DailyTasks';
import JourneyProgress from './JourneyProgress';
import SyringeIcon from './icons/SyringeIcon';
import Achievements from './Achievements';
import { ALL_ACHIEVEMENTS } from '../lib/achievements';

interface DashboardProps {
    patientData: PatientData;
    onTaskComplete: (taskId: string, points: number) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ patientData, onTaskComplete }) => {
    
    const { injectionDay, refillDueDate, completedTasksToday } = patientData;

    const today = new Date().getDay();
    const isInjectionDay = today === injectionDay;

    const timeDiff = new Date(refillDueDate).getTime() - new Date().getTime();
    const daysUntilRefill = Math.max(0, Math.ceil(timeDiff / (1000 * 3600 * 24)));

    const latestAchievements = ALL_ACHIEVEMENTS
        .filter(ach => patientData.achievements.includes(ach.id))
        .slice(-3)
        .reverse();

    return (
        <div className="space-y-6">
            <JourneyProgress patientData={patientData} />

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                     <DailyTasks 
                        isInjectionDay={isInjectionDay} 
                        completedTasks={completedTasksToday}
                        onTaskComplete={onTaskComplete} 
                    />
                </div>
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-2xl shadow-md">
                        <div className="flex items-center gap-3 mb-2">
                            <SyringeIcon className="w-8 h-8 text-brand-primary" />
                            <h2 className="text-xl font-bold text-brand-dark">Refill & Logistics</h2>
                        </div>
                        <p className="text-gray-600">
                            Your next refill is due in <span className="font-bold text-brand-dark">{daysUntilRefill} days</span>.
                        </p>
                        <button className="mt-4 w-full px-4 py-2 bg-brand-secondary text-white font-semibold rounded-lg hover:bg-opacity-90">
                            Track Shipment
                        </button>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-md">
                        <h2 className="text-xl font-bold text-brand-dark mb-3">Recent Achievements</h2>
                         {latestAchievements.length > 0 ? (
                            <div className="space-y-3">
                                {latestAchievements.map(ach => {
                                    const Icon = ach.icon;
                                    return (
                                        <div key={ach.id} className="flex items-center gap-3 p-2 bg-amber-50 rounded-lg">
                                            <Icon className="w-8 h-8 text-amber-500" />
                                            <div>
                                                <p className="font-semibold text-amber-800 text-sm">{ach.name}</p>
                                                <p className="text-xs text-amber-600">{ach.description}</p>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        ) : (
                            <p className="text-sm text-gray-500">Your first achievement is just around the corner!</p>
                        )}
                    </div>
                </div>
            </div>
             <div className="bg-brand-primary text-white p-6 rounded-2xl shadow-lg">
                <h2 className="text-2xl font-bold">Your Motivation</h2>
                <p className="mt-2 italic">"{patientData.motivation}"</p>
            </div>
        </div>
    );
};

export default Dashboard;