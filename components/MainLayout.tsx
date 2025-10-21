import React, { useState } from 'react';
import type { PatientData } from '../types';
import DashboardIcon from './icons/DashboardIcon';
import ChartBarIcon from './icons/ChartBarIcon';
import BotIcon from './icons/BotIcon';
import TrophyIcon from './icons/TrophyIcon';
import Dashboard from './Dashboard';
import ProgressTracker from './ProgressTracker';
import SideEffectTracker from './SideEffectTracker';
import Achievements from './Achievements';
// Fix: Import FlameIcon to resolve reference error.
import FlameIcon from './icons/FlameIcon';

interface MainLayoutProps {
    patientData: PatientData;
    onTaskComplete: (taskId: string, points: number) => void;
    addWeightEntry: (weight: number) => void;
    addSideEffect: (effect: string, severity: number) => Promise<string>;
    updateSideEffectGuidance: (id: string, guidance: string) => void;
}

type View = 'dashboard' | 'progress' | 'side-effects' | 'achievements';

const MainLayout: React.FC<MainLayoutProps> = (props) => {
    const { patientData } = props;
    const [activeView, setActiveView] = useState<View>('dashboard');

    const navItems = [
        { id: 'dashboard', label: 'Dashboard', icon: DashboardIcon },
        { id: 'progress', label: 'Progress', icon: ChartBarIcon },
        { id: 'side-effects', label: 'AI Support', icon: BotIcon },
        { id: 'achievements', label: 'Achievements', icon: TrophyIcon },
    ];
    
    const renderContent = () => {
        switch(activeView) {
            case 'dashboard':
                return <Dashboard patientData={patientData} onTaskComplete={props.onTaskComplete} />;
            case 'progress':
                return <ProgressTracker patientData={patientData} addWeightEntry={props.addWeightEntry} />;
            case 'side-effects':
                return <SideEffectTracker logs={patientData.sideEffectLogs} addSideEffect={props.addSideEffect} updateSideEffectGuidance={props.updateSideEffectGuidance} />;
            case 'achievements':
                return <Achievements patientData={patientData} />;
            default:
                return <Dashboard patientData={patientData} onTaskComplete={props.onTaskComplete} />;
        }
    };

    return (
        <div className="flex min-h-screen bg-brand-light">
            {/* Sidebar */}
            <aside className="w-64 bg-white p-6 flex-shrink-0 flex flex-col justify-between">
                <div>
                    <div className="flex items-center gap-2 mb-10 h-8">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-primary" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                        </svg>
                        <span className="text-2xl font-bold text-brand-dark">HealthLoop</span>
                    </div>
                    <nav className="space-y-2">
                        {navItems.map(item => {
                            const Icon = item.icon;
                            const isActive = activeView === item.id;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveView(item.id as View)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left font-semibold transition-colors ${isActive ? 'bg-brand-primary text-white' : 'text-gray-600 hover:bg-brand-light'}`}
                                >
                                    <Icon className="w-6 h-6" />
                                    <span>{item.label}</span>
                                </button>
                            );
                        })}
                    </nav>
                </div>
                 <div className="p-4 bg-brand-light rounded-lg text-center">
                    <p className="text-sm font-semibold text-brand-dark">Level {patientData.level}</p>
                    <div className="w-full bg-gray-300 rounded-full h-2.5 mt-2">
                         <div className="bg-brand-secondary h-2.5 rounded-full" style={{ width: `${(patientData.points % 1000) / 10}%` }}></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{patientData.points % 1000} / 1000 points to next level</p>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 lg:p-10 overflow-y-auto">
                <header className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-brand-dark">Hello, {patientData.name.split(' ')[0]}!</h1>
                        <p className="text-gray-500">Let's continue your journey to a healthier you.</p>
                    </div>
                     <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-orange-500">
                            <FlameIcon className="w-6 h-6"/>
                            <span className="font-bold text-lg">{patientData.dailyStreak} Day Streak</span>
                        </div>
                        <div className="flex items-center gap-2 text-yellow-500">
                            <TrophyIcon className="w-6 h-6" />
                            <span className="font-bold text-lg">{patientData.points} Points</span>
                        </div>
                    </div>
                </header>
                {renderContent()}
            </main>
        </div>
    );
};

export default MainLayout;