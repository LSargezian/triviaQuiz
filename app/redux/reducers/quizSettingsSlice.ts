// src/features/quizSettings/quizSettingsSlice.ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface QuizSettings {
    categoryId: number | null;
    difficulty: 'easy' | 'medium' | 'hard' | null;
    amount: number;
}

const initialState: QuizSettings = {
    categoryId: null,
    difficulty: null,
    amount: 1,
};

const quizSettingsSlice = createSlice({
    name: 'quizSettings',
    initialState,
    reducers: {
        setCategory(state, action: PayloadAction<number>) {
            state.categoryId = action.payload;
        },
        setDifficulty(state, action: PayloadAction<'easy' | 'medium' | 'hard'>) {
            state.difficulty = action.payload;
        },
        setAmount(state, action: PayloadAction<number>) {
            state.amount = action.payload;
        },
        resetSettings(state) {
            state.categoryId = null;
            state.difficulty = null;
            state.amount = 1;
        },
    },
});

export const { setCategory, setDifficulty, setAmount, resetSettings } = quizSettingsSlice.actions;
export default quizSettingsSlice.reducer;
