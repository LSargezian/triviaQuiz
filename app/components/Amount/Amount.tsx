import React from 'react';
import { useSelector } from 'react-redux';
import { setAmount } from '~/redux/reducers/quizSettingsSlice';
import { type RootState } from '~/redux/store/store';
import { useAppDispatch } from '~/redux/store/hooks';
import type { QuestionAmount } from '~/components/Amount/types';

const QUESTION_OPTIONS: QuestionAmount[] = [1, 2, 3, 4, 5];

function AmountDropdown() {
    const dispatch = useAppDispatch();
    const questionAmount = useSelector((state: RootState) => state.quizSettings.amount);

    const handleAmountChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedAmount = Number(event.target.value);
        dispatch(setAmount(selectedAmount));
    };

    return (
        <div className="max-w-sm mx-auto">
            <label htmlFor="question-amount" className="block text-sm font-medium text-gray-700 mb-1">
                Select Number of Questions
            </label>
            <select
                id="question-amount"
                value={questionAmount}
                onChange={handleAmountChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 text-sm"
            >
                {QUESTION_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
}


export default AmountDropdown;