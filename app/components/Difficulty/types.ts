export const DIFFICULTY_LEVELS = ['easy', 'medium', 'hard'] as const;

export type Difficulty = typeof DIFFICULTY_LEVELS[number];

export type NullableDifficulty = Difficulty | null;

export interface DifficultyRadioGroupProps {
    value: NullableDifficulty;
    onChange: (difficulty: Difficulty) => void;
}
