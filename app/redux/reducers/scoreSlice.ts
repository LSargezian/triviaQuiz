// src/features/score/scoreSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import client from "~/apollo/client";
import { SCORE_QUIZ } from '~/graphql/mutations';
import type { ScoreInput, QuizScore } from '~/types';

interface ScoreState {
    results: QuizScore | null;
    loading: boolean;
    error: string | null;
}

const initialState: ScoreState = {
    results: null,
    loading: false,
    error: null,
};

export const submitScore = createAsyncThunk(
    'score/submitScore',
    async (answers: ScoreInput[]) => {
        const { data } = await client.mutate({
            mutation: SCORE_QUIZ,
            variables: { answers },
        });
        return data.scoreQuiz;
    }
);

const scoreSlice = createSlice({
    name: 'score',
    initialState,
    reducers: {
        resetScore(state) {
            state.results = null;
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(submitScore.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(submitScore.fulfilled, (state, action) => {
                state.loading = false;
                state.results = action.payload;
            })
            .addCase(submitScore.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? 'Failed to submit score';
            });
    },
});

export const { resetScore } = scoreSlice.actions;
export default scoreSlice.reducer;
