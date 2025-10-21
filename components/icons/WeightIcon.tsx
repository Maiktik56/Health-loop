
import React from 'react';

const WeightIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 20.25c-1.472 0-2.882.265-4.185.75M12 20.25v-3.75m-3.75 3.75h7.5M12 3c-1.472 0-2.882.265-4.185.75M12 3c1.472 0 2.882.265 4.185.75M3.75 4.5c-1.472 0-2.882.265-4.185.75V20.25c1.472 0 2.882-.265 4.185-.75m11.25-15c-1.472 0-2.882.265-4.185.75V20.25c1.472 0 2.882-.265 4.185-.75" />
    </svg>
);

export default WeightIcon;
