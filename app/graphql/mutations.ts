// src/graphql/mutations.ts
import { gql } from '@apollo/client';

export const SCORE_QUIZ = gql`
    mutation ScoreQuiz($answers: [AnswerInput!]!) {
        scoreQuiz(answers: $answers) {
            correctCount
            totalCount
            correctAnswers {
                question
                correctAnswer
                userAnswer
            }
        }
    }
`;
