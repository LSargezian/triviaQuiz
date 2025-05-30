import { gql } from '@apollo/client';

export const SCORE_QUIZ = gql`
    mutation ScoreQuiz($answers: [ScoreInput!]!) {
        scoreQuiz(answers: $answers) {
            score
            total
            detailed {
                question
                selected
                correct
                isCorrect
            }
        }
    }
`;
