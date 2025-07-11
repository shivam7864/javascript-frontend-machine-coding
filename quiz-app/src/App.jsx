import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Question from './components/Question'
import questions from "./constants/question.json";
import Result from './components/Result'

function App() {
 const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);

  const handleAnswer = (isCorrect) =>{
    setCurrentQuestion(currentQuestion + 1);
    setUserAnswers([...userAnswers, isCorrect]);
  }
  const resetQuiz = () => {
    setCurrentQuestion(0);
    setUserAnswers([]);
  };


  return (
    <>
    <h1>General Awareness Quiz</h1>
    {currentQuestion<questions.length && <Question question={questions[currentQuestion]} onAnswerClick={handleAnswer}/>}
    {currentQuestion === questions.length && (
        <Result
          userAnswers={userAnswers}
          questions={questions}
          resetQuiz={resetQuiz}
        />
      )}
    </>
  )
}

export default App
