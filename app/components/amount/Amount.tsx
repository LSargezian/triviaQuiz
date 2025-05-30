// src/components/AmountDropdown.tsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAmount } from '~/redux/reducers/quizSettingsSlice';
import type {RootState} from '~/redux/store/store';
import {useAppDispatch} from "~/redux/store/hooks";

const AmountDropdown: React.FC = () => {
    const dispatch = useAppDispatch();  // Use typed dispatch here
    const amount = useSelector((state: RootState) => state.quizSettings.amount);

    return (
        <div className="max-w-sm mx-auto">
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                Select Number of Questions
            </label>
            <select
                id="amount"
                value={amount}
                onChange={(e) => dispatch(setAmount(Number(e.target.value)))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 text-sm"
            >
                {[...Array(5).keys()].map((n) => {
                    const val = n + 1;
                    return (
                        <option key={val} value={val}>
                            {val}
                        </option>
                    );
                })}
            </select>
        </div>
    );
};

export default AmountDropdown;
