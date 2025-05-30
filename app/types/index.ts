// src/types.ts
export interface Category {
    id: number;
    name: string;
}

export interface Question {
    id: string;
    question: string;
    all_answers: string[];
}

export interface ScoreInput {
    questionId: string;
    answer: string;
}

export interface CorrectAnswer {
    question: string;
    correctAnswer: string;
    userAnswer: string;
}

export interface QuizScore {
    correctCount: number;
    totalCount: number;
    correctAnswers: CorrectAnswer[];
}
