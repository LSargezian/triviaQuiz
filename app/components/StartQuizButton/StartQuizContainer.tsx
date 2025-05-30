import React from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '~/redux/store/hooks';
import { fetchQuiz } from '~/redux/reducers/quizSlice';
import type { RootState } from '~/redux/store/store';
import StartQuizButton from './StartQuizButton';

function StartQuizContainer() {
    const dispatch = useAppDispatch();
    const { categoryId, difficulty, amount } = useSelector((state: RootState) => state.quizSettings);

    const canStart = categoryId !== null && difficulty !== null && amount > 0;

    const handleStart = () => {
        if (canStart) {
            dispatch(fetchQuiz({
                categoryId: categoryId!,
                difficulty: difficulty!,
                amount,
            }));
        }
    };

    return (
        <StartQuizButton onClick={handleStart} disabled={!canStart} />
    );
}

export default StartQuizContainer;
