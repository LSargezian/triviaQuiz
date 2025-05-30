import type { Route } from "./+types/home";
import React from 'react';
import { useSelector } from 'react-redux';
import CategoryDropdown from '~/components/categoryList/CategoryDropdown';
import Difficulty from '~/components/difficulty/Difficulty';
import AmountDropdown from '~/components/amount/Amount';
import StartQuizButton from '~/components/startQuizButton/StartQuizButton';
import Quiz from '~/components/quiz/Quiz';
import Score from '~/components/score/Score';
import type {RootState} from '~/redux/store/store';
import {Welcome} from "~/components/welcome/welcome";

export function meta({}: Route.MetaArgs) {

  return [
    { title: "Trivia Quiz App" },
    { name: "description", content: "Welcome to Trivia Quiz App!" },
  ];
}

export default function Home() {
    const quizState = useSelector((state: RootState) => state.quiz);
    const scoreState = useSelector((state: RootState) => state.score);

    if (scoreState.results) {
        return <Score />;
    }

    if (quizState.questions.length > 0) {
        return <Quiz />;
    }

    return (
        <div className="space-y-6 max-w-md mx-auto p-4">
            <Welcome/>
            <CategoryDropdown/>
            <Difficulty/>
            <AmountDropdown/>
            <StartQuizButton/>
        </div>
    );
}