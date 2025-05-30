import type { Route } from "./+types/home";
import React from 'react';
import { useSelector } from 'react-redux';
import CategoryDropdown from '~/components/CategoryDropdown/CategoryDropdown';
import Difficulty from '~/components/Difficulty/Difficulty';
import AmountDropdown from '~/components/Amount/Amount';
import StartQuizContainer from '~/components/StartQuizButton/StartQuizContainer';
import QuizContainer from '~/components/Quiz/QuizContainer';
import type {RootState} from '~/redux/store/store';
import {WelcomeMessage} from "~/components/Welcome/WelcomeMessage";

export function meta({}: Route.MetaArgs) {

  return [
    { title: "Trivia QuizContainer App" },
    { name: "description", content: "Welcome to Trivia QuizContainer App!" },
  ];
}

export default function Home() {
    const quizState = useSelector((state: RootState) => state.quiz);

    if (quizState.questions.length > 0) {
        return <QuizContainer />;
    }

    return (
        <div className="space-y-6 max-w-md mx-auto p-4">
            <WelcomeMessage/>
            <CategoryDropdown/>
            <Difficulty/>
            <AmountDropdown/>
            <StartQuizContainer/>
        </div>
    );
}