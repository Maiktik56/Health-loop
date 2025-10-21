import React, { useState } from 'react';
import type { WeightEntry } from '../types';
import PlusIcon from './icons/PlusIcon';
import WeightIcon from './icons/WeightIcon';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';


interface ProgressTrackerProps {
    patientData: {
        weightHistory: WeightEntry[];
        startingWeight: number;
        targetWeight: number;
    };
    addWeightEntry: (weight: number) => void;
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({ patientData, addWeightEntry }) => {
    const { weightHistory, startingWeight, targetWeight } = patientData;
    const [newWeight, setNewWeight] = useState('');
    const [isLogging, setIsLogging] = useState(false);

    const currentWeight = weightHistory.length > 0 ? weightHistory[weightHistory.length - 1].weight : startingWeight;

    const formattedHistory = weightHistory.map(entry => ({
        ...entry,
        date: new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    })).reverse();

    const handleAddWeight = (e: React.FormEvent) => {
        e.preventDefault();
        const weightValue = parseFloat(newWeight);
        if (weightValue > 0) {
            addWeightEntry(weightValue);
            setNewWeight('');
            setIsLogging(false);
        }
    };
    
    return (
        <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-md">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <WeightIcon className="w-8 h-8 text-brand-primary" />
                        <h2 className="text-xl font-bold text-brand-dark">Weight Chart</h2>
                    </div>
                     <button onClick={() => setIsLogging(!isLogging)} className="flex items-center gap-2 px-4 py-2 bg-brand-primary text-white font-semibold rounded-lg hover:bg-brand-dark">
                        <PlusIcon className="w-5 h-5" />
                        <span>Log Weight</span>
                    </button>
                </div>
                
                {isLogging && (
                    <form onSubmit={handleAddWeight} className="flex gap-2 mb-4 p-4 bg-brand-light rounded-lg">
                        <input
                            type="number"
                            step="0.1"
                            value={newWeight}
                            onChange={(e) => setNewWeight(e.target.value)}
                            placeholder={`Current weight (e.g., ${currentWeight})`}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                        />
                        <button type="submit" className="px-4 py-2 bg-brand-primary text-white font-semibold rounded-lg hover:bg-brand-dark">
                            Save
                        </button>
                    </form>
                )}
                
                <div className="h-96">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={[...formattedHistory].reverse()} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis domain={['dataMin - 5', 'dataMax + 5']} />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="weight" stroke="#00A896" strokeWidth={3} activeDot={{ r: 8 }} name="Weight (lbs)" />
                             <Line type="monotone" dataKey={() => targetWeight} stroke="#015958" strokeWidth={2} strokeDasharray="5 5" name="Target" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
             <div className="bg-white p-6 rounded-2xl shadow-md">
                <h2 className="text-xl font-bold text-brand-dark mb-4">Log History</h2>
                <div className="max-h-96 overflow-y-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b">
                                <th className="p-2">Date</th>
                                <th className="p-2">Weight (lbs)</th>
                                <th className="p-2">Change</th>
                            </tr>
                        </thead>
                        <tbody>
                            {formattedHistory.map((entry, index) => {
                                const prevEntry = formattedHistory[index + 1] || { weight: startingWeight };
                                const change = entry.weight - prevEntry.weight;
                                return (
                                <tr key={entry.date} className="border-b last:border-0">
                                    <td className="p-2">{entry.date}</td>
                                    <td className="p-2 font-semibold">{entry.weight.toFixed(1)}</td>
                                    <td className={`p-2 ${change < 0 ? 'text-green-600' : change > 0 ? 'text-red-600' : 'text-gray-500'}`}>
                                        {change === 0 ? '-' : `${change > 0 ? '+' : ''}${change.toFixed(1)}`}
                                    </td>
                                </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ProgressTracker;