// src/features/quiz/quizSlice.ts
import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import client from "~/apollo/client";

import { GET_QUIZ } from '~/graphql/queries';

interface Question {
    id: string;
    question: string;
    all_answers: string[];
}

interface QuizState {
    questions: Question[];
    answers: Record<string, string>; // questionId -> selected answer
    loading: boolean;
    error: string | null;
}

const initialState: QuizState = {
    questions: [],
    answers: {},
    loading: false,
    error: null,
};

export const fetchQuiz = createAsyncThunk(
    'quiz/fetchQuiz',
    async (params: { categoryId: number; difficulty: string; amount: number }) => {
        const { categoryId, difficulty, amount } = params;
        const { data } = await client.query({
            query: GET_QUIZ,
            variables: { category: categoryId, difficulty, amount },
            fetchPolicy: 'no-cache',
        });
        return data.quiz.questions;
    }
);

const quizSlice = createSlice({
    name: 'quiz',
    initialState,
    reducers: {
        selectAnswer(state, action: PayloadAction<{ questionId: string; answer: string }>) {
            state.answers[action.payload.questionId] = action.payload.answer;
        },
        resetQuiz(state) {
            state.questions = [];
            state.answers = {};
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchQuiz.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.questions = [];
                state.answers = {};
            })
            .addCase(fetchQuiz.fulfilled, (state, action) => {
                state.loading = false;
                state.questions = action.payload;
            })
            .addCase(fetchQuiz.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? 'Failed to load quiz';
            });
    },
});

export const { selectAnswer, resetQuiz } = quizSlice.actions;
export default quizSlice.reducer;
