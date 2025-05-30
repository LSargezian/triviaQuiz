import React from 'react';
import { useMutation } from '@apollo/client';
import { SCORE_QUIZ } from '~/graphql/mutations';
import type { ScoreInput, QuizScore } from '~/types';

interface Props {
    answers: ScoreInput[];
}

const Score: React.FC<Props> = ({ answers }) => {
    const [scoreQuiz, { data, loading, error }] = useMutation<
        { scoreQuiz: QuizScore },
        { answers: ScoreInput[] }
    >(SCORE_QUIZ);

    React.useEffect(() => {
        scoreQuiz({ variables: { answers } });
    }, [answers]);

    if (loading) return <p>Scoring...</p>;
    if (error) return <p>Error scoring: {error.message}</p>;

    return (
        <div>
            <p>Score: {data?.scoreQuiz.score}/{data?.scoreQuiz.total}</p>
            <ul>
                {data?.scoreQuiz.detailed.map((item, i) => (
                    <li key={i}>
                        Q: {item.question} - Your answer: {item.selected} - Correct: {item.correct}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Score;
