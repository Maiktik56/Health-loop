import type { Achievement } from '../types';
import WeightIcon from '../components/icons/WeightIcon';
import FlameIcon from '../components/icons/FlameIcon';
import CheckIcon from '../components/icons/CheckIcon';
import TrophyIcon from '../components/icons/TrophyIcon';
import SyringeIcon from '../components/icons/SyringeIcon';

export const ALL_ACHIEVEMENTS: Achievement[] = [
    {
        id: 'onboarded',
        name: 'Journey Begins',
        description: 'You\'ve set up your profile and are ready to go!',
        icon: TrophyIcon,
    },
    {
        id: 'first-weigh-in',
        name: 'First Weigh-in',
        description: 'You logged your first weight. The first step is the most important!',
        icon: WeightIcon,
    },
    {
        id: 'first-injection',
        name: 'Injection Pro',
        description: 'You completed your first injection task. Well done!',
        icon: SyringeIcon,
    },
     {
        id: 'perfect-day',
        name: 'Perfect Day',
        description: 'Completed all of your tasks for the day. Great job!',
        icon: CheckIcon,
    },
    {
        id: 'streak-3-days',
        name: 'On a Roll',
        description: 'Completed your daily check-in 3 days in a row.',
        icon: FlameIcon,
    },
    {
        id: 'streak-7-days',
        name: 'Week Warrior',
        description: 'Completed your daily check-in for a whole week!',
        icon: FlameIcon,
    },
    {
        id: 'first-side-effect',
        name: 'Vigilant Victor',
        description: 'Logged your first side effect. Staying aware is key!',
        icon: CheckIcon,
    },
    {
        id: 'lose-5-lbs',
        name: '5 lbs Lighter!',
        description: 'You\'ve lost your first 5 pounds. Amazing progress!',
        icon: TrophyIcon,
    },
    {
        id: 'lose-10-lbs',
        name: 'Double Digits!',
        description: 'You\'ve lost 10 pounds. Keep up the great work!',
        icon: TrophyIcon,
    },
];
