import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import client from "../../apollo/client";
import { SCORE_QUIZ } from '~/graphql/operations/mutations/scoreQuiz';

export interface ScoreInput {
    questionId: string;
    answer: string;
}

export interface QuizScore {
    score: number;
    total: number;
    detailed: {
        question: string;
        correct: string;
        selected: string;
        isCorrect: boolean;
    }[];
}


interface ScoreState {
    results: QuizScore | null;
    loading: boolean;
    error: string | null;
}

const initialState: ScoreState = {
    results: null,
    loading: false,
    error: null
};

export const submitScore = createAsyncThunk(
    'score/submitScore',
    async (answers: ScoreInput[], { rejectWithValue }) => {
        console.log("Submitting answers:", answers);

        try {
            const { data } = await client.mutate({
                mutation: SCORE_QUIZ,
                variables: { answers },
            });
            return data.scoreQuiz as QuizScore;
        } catch (error: any) {
            console.error('Score submission failed:', error);
            return rejectWithValue(error.message || 'Submission failed');
        }
    }
);

const scoreSlice = createSlice({
    name: 'score',
    initialState,
    reducers: {
        resetScore: state => {
            state.results = null;
            state.error = null;
            state.loading = false;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(submitScore.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(submitScore.fulfilled, (state, action) => {
                state.results = action.payload;
                state.loading = false;
            })
            .addCase(submitScore.rejected, (state, action) => {
                state.error = action.error.message || 'Error submitting score';
                state.loading = false;
            });
    }
});

export const { resetScore } = scoreSlice.actions;
export default scoreSlice.reducer;
