import React from 'react';
import SyringeIcon from './icons/SyringeIcon';
import WeightIcon from './icons/WeightIcon';
import BotIcon from './icons/BotIcon';
import CheckIcon from './icons/CheckIcon';

interface DailyTasksProps {
    isInjectionDay: boolean;
    completedTasks: string[];
    onTaskComplete: (taskId: string, points: number) => void;
}

const DailyTasks: React.FC<DailyTasksProps> = ({ isInjectionDay, completedTasks, onTaskComplete }) => {
    
    const tasks = [
        ...(isInjectionDay ? [{ id: 'injection', title: 'Take your injection', description: 'Follow your doctor\'s instructions.', points: 50, icon: SyringeIcon }] : []),
        { id: 'log-weight', title: 'Log your weight', description: 'Track your progress consistently.', points: 15, icon: WeightIcon },
        { id: 'check-symptoms', title: 'Check-in on symptoms', description: 'Log any side effects you feel.', points: 20, icon: BotIcon },
    ];

    const completedCount = tasks.filter(task => completedTasks.includes(task.id)).length;
    const progress = tasks.length > 0 ? (completedCount / tasks.length) * 100 : 0;

    return (
        <div className="bg-white p-6 rounded-2xl shadow-md">
            <div className="mb-4">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold text-brand-dark">Today's Tasks</h2>
                    <span className="text-sm font-semibold text-brand-primary">{completedCount} / {tasks.length} Completed</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                    <div className="bg-brand-secondary h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
                </div>
            </div>
            <div className="space-y-3">
                {tasks.map(task => {
                    const isCompleted = completedTasks.includes(task.id);
                    const Icon = task.icon;
                    return (
                        <div key={task.id} className={`flex items-center justify-between p-4 rounded-lg ${isCompleted ? 'bg-green-50 text-gray-500' : 'bg-brand-light'}`}>
                            <div className="flex items-center gap-4">
                                <Icon className={`w-8 h-8 ${isCompleted ? 'text-green-400' : 'text-brand-primary'}`} />
                                <div>
                                    <h3 className={`font-bold ${isCompleted ? 'line-through' : 'text-brand-dark'}`}>{task.title}</h3>
                                    <p className="text-sm">{task.description}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => onTaskComplete(task.id, task.points)}
                                disabled={isCompleted}
                                className="flex items-center justify-center w-10 h-10 rounded-full transition-colors disabled:cursor-not-allowed text-white"
                                aria-label={isCompleted ? `Task ${task.title} completed` : `Complete task ${task.title}`}
                            >
                                {isCompleted ? (
                                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                                        <CheckIcon className="w-6 h-6" />
                                    </div>
                                ) : (
                                    <div className="w-10 h-10 border-2 border-brand-secondary rounded-full hover:bg-brand-secondary/20" />
                                )}
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default DailyTasks;
