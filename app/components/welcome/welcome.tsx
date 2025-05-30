export function Welcome() {
    return (
        <div className="flex flex-col items-center justify-center bg-gray-50 p-6">
            <h1 className="text-4xl font-bold text-blue-600 mb-4">Welcome to Trivia Quiz App!</h1>
            <p className="text-lg text-gray-700 max-w-2xl text-center mb-2">
                Pick a category, difficulty level, and number of questions to get started.
            </p>
            <p className="text-lg text-gray-700 max-w-2xl text-center">
                Check your answers and see your final score!
            </p>
        </div>
    );
}
