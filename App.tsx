import React, { useState, useEffect } from 'react';
import type { PatientData, WeightEntry, SideEffectLog } from './types';
import Onboarding from './components/Onboarding';
import MainLayout from './components/MainLayout';
import { ALL_ACHIEVEMENTS } from './lib/achievements';

const App: React.FC = () => {
    const [patientData, setPatientData] = useState<PatientData | null>(() => {
        try {
            const savedData = localStorage.getItem('healthLoopPatientData');
            return savedData ? JSON.parse(savedData) : null;
        } catch (error) {
            console.error("Failed to parse patient data from localStorage", error);
            return null;
        }
    });

    useEffect(() => {
        if (patientData) {
            localStorage.setItem('healthLoopPatientData', JSON.stringify(patientData));
        } else {
            localStorage.removeItem('healthLoopPatientData');
        }
    }, [patientData]);

    // Clear completed tasks for a new day
    useEffect(() => {
        if (!patientData) return;
        const today = new Date().toISOString().split('T')[0];
        if (patientData.lastCheckinDate !== today && patientData.completedTasksToday.length > 0) {
             setPatientData(prev => prev ? ({ ...prev, completedTasksToday: [] }) : null);
        }
    }, []);


    const checkForNewAchievements = (updatedData: PatientData): PatientData => {
        const newAchievements: string[] = [];
        const currentAchievements = new Set(updatedData.achievements);

        const getTasksForToday = (data: PatientData) => {
            const tasks = ['log-weight', 'check-symptoms'];
            if (new Date().getDay() === data.injectionDay) {
                tasks.push('injection');
            }
            return tasks;
        };

        // First weigh-in
        if (updatedData.weightHistory.length > 0 && !currentAchievements.has('first-weigh-in')) {
            newAchievements.push('first-weigh-in');
        }
        // First side effect log
        if (updatedData.sideEffectLogs.length > 0 && !currentAchievements.has('first-side-effect')) {
            newAchievements.push('first-side-effect');
        }
        // First injection
        if (updatedData.completedTasksToday.includes('injection') && !currentAchievements.has('first-injection')) {
            newAchievements.push('first-injection');
        }
        // Streaks
        if (updatedData.dailyStreak >= 3 && !currentAchievements.has('streak-3-days')) {
            newAchievements.push('streak-3-days');
        }
        if (updatedData.dailyStreak >= 7 && !currentAchievements.has('streak-7-days')) {
            newAchievements.push('streak-7-days');
        }
        // Weight loss
        const lastWeight = updatedData.weightHistory.length > 0 ? updatedData.weightHistory[updatedData.weightHistory.length - 1].weight : updatedData.startingWeight;
        const weightLost = updatedData.startingWeight - lastWeight;
        if (weightLost >= 5 && !currentAchievements.has('lose-5-lbs')) {
            newAchievements.push('lose-5-lbs');
        }
        if (weightLost >= 10 && !currentAchievements.has('lose-10-lbs')) {
            newAchievements.push('lose-10-lbs');
        }

        // Perfect Day
        const tasksForToday = getTasksForToday(updatedData);
        const allTasksDone = tasksForToday.every(task => updatedData.completedTasksToday.includes(task));
        if (allTasksDone && !currentAchievements.has('perfect-day')) {
             newAchievements.push('perfect-day');
        }
        
        if (newAchievements.length > 0) {
            const achievementPoints = newAchievements.length * 100; // 100 points per achievement
            return {
                ...updatedData,
                achievements: [...updatedData.achievements, ...newAchievements],
                points: updatedData.points + achievementPoints,
            };
        }
        
        return updatedData;
    };

    const handleOnboardingComplete = (data: PatientData) => {
        setPatientData(data);
    };

    const handleTaskComplete = (taskId: string, points: number) => {
        setPatientData(prevData => {
            if (!prevData || prevData.completedTasksToday.includes(taskId)) return prevData;
            
            const today = new Date().toISOString().split('T')[0];
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayStr = yesterday.toISOString().split('T')[0];

            let newStreak = prevData.dailyStreak;
            // Only update streak on the first task of the day
            if (!prevData.completedTasksToday.length) {
                if (prevData.lastCheckinDate === yesterdayStr) {
                    newStreak = prevData.dailyStreak + 1; // Continue streak
                } else {
                    newStreak = 1; // Reset streak
                }
            }

            let updatedData: PatientData = { 
                ...prevData, 
                completedTasksToday: [...prevData.completedTasksToday, taskId],
                lastCheckinDate: today,
                dailyStreak: newStreak,
            };
            
            // Add points and check level up
            const newPoints = updatedData.points + points;
            const newLevel = Math.floor(newPoints / 1000) + 1;
            updatedData.points = newPoints;
            updatedData.level = newLevel;

            // Check for new achievements after all state updates
            updatedData = checkForNewAchievements(updatedData);
            
            return updatedData;
        });
    };
    
    const addWeightEntry = (weight: number) => {
        setPatientData(prevData => {
            if (!prevData) return null;
            const newEntry: WeightEntry = {
                date: new Date().toISOString(),
                weight,
            };
            let updatedData = {
                ...prevData,
                weightHistory: [...prevData.weightHistory, newEntry],
            };

            const newPoints = updatedData.points + 25; // 25 points for logging
            const newLevel = Math.floor(newPoints / 1000) + 1;
            updatedData.points = newPoints;
            updatedData.level = newLevel;
            
            const dataWithAchievements = checkForNewAchievements(updatedData);

            return dataWithAchievements;
        });
    };
    
    const addSideEffect = async (effect: string, severity: number): Promise<string> => {
        const newLog: SideEffectLog = {
            id: `${Date.now()}-${Math.random()}`,
            date: new Date().toISOString(),
            effect,
            severity,
            isLoadingGuidance: true,
        };

        setPatientData(prevData => {
            if (!prevData) return null;
            let updatedData = {
                ...prevData,
                sideEffectLogs: [...prevData.sideEffectLogs, newLog],
            };

            const dataWithAchievements = checkForNewAchievements(updatedData);

            return dataWithAchievements;
        });
        
        return newLog.id;
    };

    const updateSideEffectGuidance = (id: string, guidance: string) => {
        setPatientData(prevData => {
            if (!prevData) return null;
            return {
                ...prevData,
                sideEffectLogs: prevData.sideEffectLogs.map(log =>
                    log.id === id ? { ...log, guidance, isLoadingGuidance: false } : log
                ),
            };
        });
    };

    if (!patientData) {
        return <Onboarding onOnboardingComplete={handleOnboardingComplete} />;
    }

    return <MainLayout 
        patientData={patientData} 
        onTaskComplete={handleTaskComplete}
        addWeightEntry={addWeightEntry}
        addSideEffect={addSideEffect}
        updateSideEffectGuidance={updateSideEffectGuidance}
    />;
};

export default App;
