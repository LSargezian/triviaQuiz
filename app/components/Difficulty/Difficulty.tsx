import React from 'react';
import { useSelector } from 'react-redux';
import { setDifficulty } from '~/redux/reducers/quizSettingsSlice';
import { type RootState } from '~/redux/store/store';
import { useAppDispatch } from '~/redux/store/hooks';
import type { DifficultyRadioGroupProps } from '~/types';

const DIFFICULTY_LEVELS = ['easy', 'medium', 'hard'] as const;

function QuizDifficultySelect() {
    const dispatch = useAppDispatch();
    const selectedDifficulty = useSelector((state: RootState) => state.quizSettings.difficulty);

    const handleChange = (difficulty: 'easy' | 'medium' | 'hard') => {
        dispatch(setDifficulty(difficulty));
    };

    return (
        <DifficultyRadioGroup value={selectedDifficulty} onChange={handleChange} />
    );
}

const DifficultyRadioGroup: React.FC<DifficultyRadioGroupProps> = ({ value, onChange }) => (
    <fieldset className="max-w-sm mx-auto">
        <legend className="text-sm font-medium text-gray-700 mb-2">Select Difficulty</legend>
        <div className="flex space-x-6">
            {DIFFICULTY_LEVELS.map((level) => (
                <label
                    key={level}
                    className="inline-flex items-center cursor-pointer text-gray-700"
                >
                    <input
                        type="radio"
                        name="difficulty"
                        value={level}
                        checked={value === level}
                        onChange={() => onChange(level)}
                        className="form-radio text-indigo-600"
                    />
                    <span className="ml-2 capitalize">{level}</span>
                </label>
            ))}
        </div>
    </fieldset>
);

export default QuizDifficultySelect;
