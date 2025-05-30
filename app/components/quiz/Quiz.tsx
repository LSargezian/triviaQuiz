// src/components/Quiz.tsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type {RootState} from '~/redux/store/store';
import { selectAnswer } from '~/redux/reducers/quizSlice';
import { submitScore } from '~/redux/reducers/scoreSlice';
import {useAppDispatch} from "~/redux/store/hooks";

const Quiz: React.FC = () => {
    const dispatch = useAppDispatch(); // typed dispatch
    const { questions, answers, loading } = useSelector((state: RootState) => state.quiz);
    const scoreLoading = useSelector((state: RootState) => state.score.loading);

    if (loading) return <p className="text-center mt-4">Loading questions...</p>;

    // Check if all questions have been answered
    const allAnswered = questions.length > 0 && questions.every(q => answers[q.id]);

    const handleAnswer = (questionId: string, answer: string) => {
        dispatch(selectAnswer({ questionId, answer }));
    };

    const handleSubmit = () => {
        // Convert answers into input format for backend
        const formattedAnswers = Object.entries(answers).map(([questionId, answer]) => ({
            questionId,
            answer,
        }));
        dispatch(submitScore(formattedAnswers));
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            {questions.map((q, idx) => (
                <div key={q.id} className="p-4 border rounded-md shadow-sm">
                    <p className="font-semibold mb-3">
                        {idx + 1}. {q.question}
                    </p>
                    <div className="flex flex-col space-y-2">
                        {q.all_answers.map((answer) => (
                            <label
                                key={answer}
                                className="inline-flex items-center cursor-pointer rounded-md border px-3 py-2 hover:bg-indigo-50"
                            >
                                <input
                                    type="radio"
                                    name={q.id}
                                    value={answer}
                                    checked={answers[q.id] === answer}
                                    onChange={() => handleAnswer(q.id, answer)}
                                    className="form-radio text-indigo-600"
                                />
                                <span className="ml-2">{answer}</span>
                            </label>
                        ))}
                    </div>
                </div>
            ))}

            <button
                onClick={handleSubmit}
                disabled={!allAnswered || scoreLoading}
                className={`w-full py-2 rounded-md text-white ${
                    allAnswered && !scoreLoading ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-gray-400 cursor-not-allowed'
                }`}
            >
                {scoreLoading ? 'Submitting...' : 'Submit Answers'}
            </button>
        </div>
    );
};

export default Quiz;
