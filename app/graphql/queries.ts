import { gql } from '@apollo/client';

export const GET_CATEGORIES = gql`
    query GetCategories {
        categories {
            id
            name
        }
    }
`;

export const GET_QUIZ = gql`
    query GetQuiz($category: Int, $difficulty: String, $amount: Int) {
        quiz(category: $category, difficulty: $difficulty, amount: $amount) {
            questions {
                id
                category
                difficulty
                question
                all_answers
            }
        }
    }
`;
