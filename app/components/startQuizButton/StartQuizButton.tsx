// src/components/StartQuizButton.tsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuiz } from '~/redux/reducers/quizSlice';
import type {RootState} from '~/redux/store/store';
import {useAppDispatch} from "~/redux/store/hooks";

const StartQuizButton: React.FC = () => {
    const dispatch = useAppDispatch();  // Use typed dispatch here
    const { categoryId, difficulty, amount } = useSelector((state: RootState) => state.quizSettings);

    const canStart = categoryId !== null && difficulty !== null && amount > 0;

    return (
        <div className="max-w-sm mx-auto">
            <button
                disabled={!canStart}
                onClick={() => dispatch(fetchQuiz({ categoryId: categoryId!, difficulty: difficulty!, amount }))}
                className={`w-full py-2 rounded-md text-white ${
                    canStart ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-gray-400 cursor-not-allowed'
                }`}
            >
                Start Quiz
            </button>
        </div>
    );
};

export default StartQuizButton;
