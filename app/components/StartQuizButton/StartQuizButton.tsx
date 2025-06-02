import React from 'react';
import type { StartQuizButtonProps } from '~/components/StartQuizButton/types';

function StartQuizButton({ onClick, disabled }: StartQuizButtonProps) {
    return (
        <div className="max-w-sm mx-auto mt-4">
            <button
                disabled={disabled}
                onClick={onClick}
                className={`w-full py-2 rounded-md text-white ${
                    disabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
                }`}
            >
                Start Quiz
            </button>
        </div>
    );
}

export default StartQuizButton;
