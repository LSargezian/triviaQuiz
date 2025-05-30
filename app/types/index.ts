import React from "react";

export interface QuizSettings {
    categoryId: number | null;
    difficulty: 'easy' | 'medium' | 'hard' | null;
    amount: number;
}

export interface Category {
    id: number;
    name: string;
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

export interface CategoryDropdownProps {
    id: string;
    value: string | number;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    options: Category[];
}

export interface DifficultyRadioGroupProps {
    value: 'easy' | 'medium' | 'hard' | null;
    onChange: (difficulty: 'easy' | 'medium' | 'hard') => void;
}

export interface QuizAnswer {
    questionId: string;
    answer: string;
}

export interface QuizQuestion {
    id: string;
    question: string;
    all_answers: string[];
}

export interface QuizResultEntry {
    question: string;
    selected: string;
    correct: string;
    isCorrect: boolean;
}

export interface QuizResults {
    score: number;
    total: number;
    detailed: QuizResultEntry[];
}
