import React from 'react';
import type { QuizQuestion } from '~/types';

interface QuestionCardProps {
    question: QuizQuestion;
    selectedAnswer?: string;
    index: number;
    onAnswer: (questionId: string, answer: string) => void;
}

const QuestionCard = React.memo(({ question, selectedAnswer, index, onAnswer }: QuestionCardProps) => {
    return (
        <div className="p-4 border rounded-lg shadow-sm bg-white">
            <p className="font-semibold mb-3 text-lg">
                {index + 1}. {question.question}
            </p>
            <div className="flex flex-col space-y-2">
                {question.all_answers.map((answer) => (
                    <label
                        key={answer}
                        className={`inline-flex items-center cursor-pointer rounded-md border px-4 py-2 transition 
                            ${selectedAnswer === answer ? 'bg-indigo-100 border-indigo-600' : 'hover:bg-indigo-50'}
                        `}
                    >
                        <input
                            type="radio"
                            name={question.id}
                            value={answer}
                            checked={selectedAnswer === answer}
                            onChange={() => onAnswer(question.id, answer)}
                            className="form-radio text-indigo-600"
                        />
                        <span className="ml-2">{answer}</span>
                    </label>
                ))}
            </div>
        </div>
    );
});

export default QuestionCard;
