import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_QUIZ } from '~/graphql/queries';
import type {QuizResponse} from '~/types';

interface Props {
    category: number;
    difficulty: string;
    amount: number;
}

const Quiz: React.FC<Props> = ({ category, difficulty, amount }) => {
    const { data, loading, error } = useQuery<{ quiz: QuizResponse }>(GET_QUIZ, {
        variables: { category, difficulty, amount },
    });

    if (loading) return <p>Loading quiz...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            {data?.quiz.questions.map(q => (
                <div key={q.id}>
                    <p>{q.question}</p>
                    <ul>
                        {q.all_answers.map((ans, i) => (
                            <li key={i}>{ans}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default Quiz;
