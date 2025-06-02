import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import client from '~/apollo/client';
import { GET_QUIZ } from '~/graphql/operations/queries/getQuiz';
import type {QuizState} from "~/types";

const initialState: QuizState = {
    questions: [],
    answers: {},
    loading: false,
    error: null,
};

export const fetchQuiz = createAsyncThunk(
    'QuizContainer/fetchQuiz',
    async (params: { categoryId: number; difficulty: string; amount: number }) => {
        console.log('GraphQL query variables:', params);
        const { data } = await client.query({
            query: GET_QUIZ,
            variables: {
                category: params.categoryId,
                difficulty: params.difficulty,
                amount: params.amount,
            },
            fetchPolicy: 'no-cache',
        });
        console.log('GraphQL response:', data);
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
    extraReducers: builder => {
        builder
            .addCase(fetchQuiz.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchQuiz.fulfilled, (state, action) => {
                state.loading = false;
                state.questions = action.payload;
            })
            .addCase(fetchQuiz.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? 'Error fetching QuizContainer';
            });
    },
});

export const { selectAnswer, resetQuiz } = quizSlice.actions;
export default quizSlice.reducer;
