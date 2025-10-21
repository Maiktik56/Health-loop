import React, { useState } from 'react';
import type { SideEffectLog } from '../types';
import { COMMON_SIDE_EFFECTS } from '../types';
import { getSideEffectGuidance } from '../services/geminiService';
import BotIcon from './icons/BotIcon';

interface SideEffectTrackerProps {
    logs: SideEffectLog[];
    addSideEffect: (effect: string, severity: number) => Promise<string>;
    updateSideEffectGuidance: (id: string, guidance: string) => void;
}

const SideEffectTracker: React.FC<SideEffectTrackerProps> = ({ logs, addSideEffect, updateSideEffectGuidance }) => {
    const [selectedEffect, setSelectedEffect] = useState<string>(COMMON_SIDE_EFFECTS[0]);
    const [customEffect, setCustomEffect] = useState('');
    const [severity, setSeverity] = useState(5);

    const handleLogEffect = async () => {
        const effectToLog = selectedEffect === 'Other' ? customEffect : selectedEffect;
        if (!effectToLog) return;

        const newLogId = await addSideEffect(effectToLog, severity);
        
        // Fetch guidance
        const guidance = await getSideEffectGuidance(effectToLog, severity);
        updateSideEffectGuidance(newLogId, guidance);

        // Reset form
        setSelectedEffect(COMMON_SIDE_EFFECTS[0]);
        setCustomEffect('');
        setSeverity(5);
    };

    return (
        <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-md h-fit">
                <div className="flex items-center gap-3 mb-4">
                    <BotIcon className="w-8 h-8 text-brand-primary" />
                    <h2 className="text-xl font-bold text-brand-dark">Log an Effect</h2>
                </div>

                <div className="bg-brand-light p-4 rounded-lg space-y-4">
                    <p className="text-sm text-gray-700">Feeling unwell? Log your side effects to get personalized tips from our AI.</p>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Side Effect</label>
                        <select
                            value={selectedEffect}
                            onChange={(e) => setSelectedEffect(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                        >
                            {COMMON_SIDE_EFFECTS.map(effect => <option key={effect} value={effect}>{effect}</option>)}
                            <option value="Other">Other...</option>
                        </select>
                    </div>
                    {selectedEffect === 'Other' && (
                        <input
                            type="text"
                            value={customEffect}
                            onChange={(e) => setCustomEffect(e.target.value)}
                            placeholder="Describe your symptom"
                            className="w-full p-2 border border-gray-300 rounded-lg"
                        />
                    )}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Severity: {severity}/10</label>
                        <input
                            type="range"
                            min="1"
                            max="10"
                            value={severity}
                            onChange={(e) => setSeverity(parseInt(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-secondary"
                        />
                    </div>
                    <button
                        onClick={handleLogEffect}
                        disabled={(selectedEffect === 'Other' && !customEffect) || !selectedEffect}
                        className="w-full px-4 py-2 bg-brand-primary text-white font-semibold rounded-lg hover:bg-brand-dark disabled:bg-gray-300"
                    >
                        Log & Get AI Guidance
                    </button>
                </div>
            </div>
            
            <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-md">
                <h3 className="text-xl font-bold text-brand-dark mb-4">Your Log History</h3>
                <div className="space-y-4 max-h-[75vh] overflow-y-auto pr-2">
                    {logs.length === 0 ? (
                        <p className="text-gray-500 text-center py-10">No side effects logged yet.</p>
                    ) : (
                        [...logs].reverse().map(log => (
                            <div key={log.id} className="p-4 border border-gray-200 rounded-lg">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="font-semibold text-gray-800">{log.effect}</p>
                                        <p className="text-sm text-gray-500">
                                            {new Date(log.date).toLocaleString()} - Severity: {log.severity}/10
                                        </p>
                                    </div>
                                </div>
                                {log.isLoadingGuidance ? (
                                    <div className="mt-2 text-sm text-gray-500 animate-pulse">Getting guidance...</div>
                                ) : log.guidance && (
                                     <div className="prose prose-sm mt-2 text-gray-600 border-t pt-2" dangerouslySetInnerHTML={{ __html: log.guidance.replace(/\n/g, '<br />') }} />
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default SideEffectTracker;
