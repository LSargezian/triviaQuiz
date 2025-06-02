import React from 'react';
import type { ResultsSummaryProps } from '~/components/Quiz/types';

function getBarColor(score: number) {
    if (score <= 1) return 'bg-red-500';
    if (score <= 3) return 'bg-yellow-400';
    return 'bg-green-500';
}

function ResultsSummary({ results, onReset }: ResultsSummaryProps) {
    return (
        <div className="bg-white p-6 rounded-lg shadow space-y-4">
            <h2 className="text-xl font-bold text-center">
                You scored {results.score} out of {results.total}
            </h2>
            <div className="w-full h-3 rounded-full overflow-hidden bg-gray-200">
                <div
                    className={`h-full ${getBarColor(results.score)} transition-all`}
                    style={{ width: `${(results.score / results.total) * 100}%` }}
                />
            </div>
            <ul className="space-y-4">
                {results.detailed.map((entry, idx) => (
                    <li key={idx} className="p-4 border rounded-md bg-gray-50">
                        <p className="font-medium">{idx + 1}. {entry.question}</p>
                        <p>
                            Your answer:{' '}
                            <span className={entry.isCorrect ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
                                {entry.selected}
                            </span>
                        </p>
                        {!entry.isCorrect && (
                            <p>
                                Correct answer:{' '}
                                <span className="text-green-600 font-semibold">{entry.correct}</span>
                            </p>
                        )}
                    </li>
                ))}
            </ul>
            <button
                onClick={onReset}
                className="w-full py-2 mt-4 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-lg"
            >
                Start New Quiz
            </button>
        </div>
    );
}
export default ResultsSummary;
