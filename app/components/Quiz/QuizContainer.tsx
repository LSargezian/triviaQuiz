import React from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '~/redux/store/hooks';
import { selectAnswer, resetQuiz } from '~/redux/reducers/quizSlice';
import { submitScore, resetScore } from '~/redux/reducers/scoreSlice';
import type { RootState } from '~/redux/store/store';
import QuestionCard from './QuestionCard';
import ResultsSummary from './ResultsSummary';

function QuizContainer() {
    const dispatch = useAppDispatch();
    const { questions, answers, loading } = useSelector((state: RootState) => state.quiz);
    const { results, loading: scoreLoading } = useSelector((state: RootState) => state.score);

    const allAnswered = questions.length > 0 && questions.every(q => answers[q.id]);

    const handleAnswer = (questionId: string, answer: string) => {
        dispatch(selectAnswer({ questionId, answer }));
    };

    const handleSubmit = () => {
        const formattedAnswers = Object.entries(answers).map(([questionId, answer]) => ({ questionId, answer }));
        dispatch(submitScore(formattedAnswers));
    };

    const handleReset = () => {
        dispatch(resetScore());
        dispatch(resetQuiz());
    };

    if (loading) return <p className="text-center mt-4">Loading questions...</p>;

    return (
        <div className="max-w-3xl mx-auto space-y-6 p-4">
            {!results ? (
                <>
                    {questions.map((q, idx) => (
                        <QuestionCard
                            key={q.id}
                            index={idx}
                            question={q}
                            selectedAnswer={answers[q.id]}
                            onAnswer={handleAnswer}
                        />
                    ))}
                    <button
                        onClick={handleSubmit}
                        disabled={!allAnswered || scoreLoading}
                        className={`w-full py-2 rounded-md text-white text-lg font-medium transition 
                            ${allAnswered && !scoreLoading ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-gray-400 cursor-not-allowed'}
                        `}
                    >
                        {scoreLoading ? 'Submitting...' : 'Submit Answers'}
                    </button>
                </>
            ) : (
                <ResultsSummary results={results} onReset={handleReset} />
            )}
        </div>
    );
}

export default QuizContainer;
