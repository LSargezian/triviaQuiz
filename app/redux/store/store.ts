// src/store.ts
import { configureStore } from '@reduxjs/toolkit';
import quizSettingsReducer from '../reducers/quizSettingsSlice';
import quizReducer from '../reducers/quizSlice';
import scoreReducer from '../reducers/scoreSlice';

export const store = configureStore({
    reducer: {
        quizSettings: quizSettingsReducer,
        quiz: quizReducer,
        score: scoreReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
