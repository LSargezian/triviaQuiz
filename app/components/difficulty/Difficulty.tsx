// src/components/Difficulty.tsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDifficulty } from '~/redux/reducers/quizSettingsSlice';
import type {RootState} from '~/redux/store/store';
import {useAppDispatch} from "~/redux/store/hooks";

const difficulties = ['easy', 'medium', 'hard'] as const;

const Difficulty: React.FC = () => {
    const dispatch = useAppDispatch();  // Use typed dispatch here
    const selected = useSelector((state: RootState) => state.quizSettings.difficulty);

    return (
        <fieldset className="max-w-sm mx-auto">
            <legend className="text-sm font-medium text-gray-700 mb-2">Select Difficulty</legend>
            <div className="flex space-x-6">
                {difficulties.map((level) => (
                    <label
                        key={level}
                        className="inline-flex items-center cursor-pointer text-gray-700"
                    >
                        <input
                            type="radio"
                            name="difficulty"
                            value={level}
                            checked={selected === level}
                            onChange={() => dispatch(setDifficulty(level))}
                            className="form-radio text-indigo-600"
                        />
                        <span className="ml-2 capitalize">{level}</span>
                    </label>
                ))}
            </div>
        </fieldset>
    );
};

export default Difficulty;
