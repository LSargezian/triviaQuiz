import React from "react";

export interface CategoryDropdownProps {
    id: string;
    value: string | number;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    options: Category[];
}

export interface Category {
    id: number;
    name: string;
}

export interface QuizSettings {
    categoryId: number | null;
    difficulty: 'easy' | 'medium' | 'hard' | null;
    amount: number;
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

export interface QuizAnswer {
    questionId: string;
    answer: string;
}

export interface Question {
    id: string;
    question: string;
    all_answers: string[];
}

export interface QuizState {
    questions: Question[];
    answers: Record<string, string>;
    loading: boolean;
    error: string | null;
}
