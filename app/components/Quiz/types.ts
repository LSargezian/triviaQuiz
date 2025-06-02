export interface QuizQuestion {
    id: string;
    question: string;
    all_answers: string[];
}

export interface QuestionCardProps {
    question: QuizQuestion;
    selectedAnswer?: string;
    index: number;
    onAnswer: (questionId: string, answer: string) => void;
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

export interface ResultsSummaryProps {
    results: QuizResults;
    onReset: () => void;
}

export interface FormattedAnswer {
    questionId: string;
    answer: string;
}
