// src/components/Score.tsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type {RootState} from '~/redux/store/store';
import { resetScore } from '~/redux/reducers/scoreSlice';
import { resetQuiz } from '~/redux/reducers/quizSlice';
import { resetSettings } from '~/redux/reducers/quizSettingsSlice';
import {useAppDispatch} from "~/redux/store/hooks";

const Score: React.FC = () => {
    const dispatch = useAppDispatch();  // Use typed dispatch here
    const results = useSelector((state: RootState) => state.score.results);

    if (!results) return null;

    const { correctCount, totalCount, correctAnswers } = results;

    const handleRestart = () => {
        dispatch(resetScore());
        dispatch(resetQuiz());
        dispatch(resetSettings());
    };

    return (
        <div className="max-w-2xl mx-auto space-y-4 text-center">
            <h2 className="text-2xl font-bold">Your Score: {correctCount} / {totalCount}</h2>

            <div className="space-y-3 text-left">
                {correctAnswers?.map(({ question, correctAnswer, userAnswer }, idx) => (
                    <div
                        key={idx}
                        className={`p-3 border rounded-md ${
                            userAnswer === correctAnswer ? 'bg-green-100 border-green-400' : 'bg-red-100 border-red-400'
                        }`}
                    >
                        <p className="font-semibold">{question}</p>
                        <p>
                            Your answer: <span className="font-medium">{userAnswer}</span>
                        </p>
                        {userAnswer !== correctAnswer && (
                            <p>
                                Correct answer: <span className="font-medium">{correctAnswer}</span>
                            </p>
                        )}
                    </div>
                ))}
            </div>

            <button
                onClick={handleRestart}
                className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
                Restart Quiz
            </button>
        </div>
    );
};

export default Score;
