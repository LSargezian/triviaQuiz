export interface Category {
    id: number;
    name: string;
}

export interface Question {
    id: string;
    category: number;
    difficulty: string;
    question: string;
    all_answers: string[];
}

export interface QuizResponse {
    questions: Question[];
}

export interface ScoreInput {
    questionId: string;
    answer: string;
}

export interface QuizScore {
    score: number;
    total: number;
    detailed: {
        question: string;
        selected: string;
        correct: string;
        isCorrect: boolean;
    }[];
}
