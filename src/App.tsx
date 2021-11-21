import React, { useState } from "react";
import "./App.css";

type quizOption = {
  text: string;
  options?: { yes: number[]; no: number[] }; // 1st option is yes, 2nd is no
};

type Stage = 1 | 2 | 3 | 4;

const questions: Record<Stage, quizOption[]> = {
  1: [
    {
      text: "have you been on more than one date?",
      options: { no: [2, 1], yes: [2, 0] },
    },
  ],
  2: [
    {
      text: "are they creeping you out?",
      options: { yes: [3, 0], no: [3, 1] },
    },
    {
      text: "have they asked to meet up again?",
      options: { yes: [3, 2], no: [3, 3] },
    },
  ],
  3: [
    { text: "GHOST " },
    {
      text: "have you been on more than 4 dates",
      options: { yes: [4, 1], no: [4, 0] },
    },
    {
      text: "are they creeping you out?",
      options: { yes: [4, 2], no: [4, 3] },
    },
    {
      text: "is it someone you know in real life (i.e not a tinder date)?",
      options: { yes: [4, 4], no: [4, 5] },
    },
  ],
  4: [
    { text: "give them a call to say you aren't interested" },
    {
      text: "unfortunately you will have to tell them in person that you want to stop seeing them",
    },
    { text: "ghost away" },
    {
      text: "message them to tell them you aren't interested",
    },
    { text: "shoot them a message or it can get awkward" },
    { text: "GHOST" },
  ],
};

const getNextOption = (
  _currentOption: quizOption,
  yes: boolean
): quizOption | undefined => {
  if (_currentOption.options) {
    if (yes) {
      const nextStage = _currentOption.options.yes[0];
      const questionNumber = _currentOption.options.yes[1];
      return questions[nextStage as Stage][questionNumber];
    }
    const nextStage = _currentOption.options.no[0];
    const questionNumber = _currentOption.options.no[1];
    return questions[nextStage as Stage][questionNumber];
  }
};

function App() {
  const [currentOption, setCurrentOption] = useState(questions[1][0]);

  const handleButtonClick = (yes: boolean) => {
    const newOption = getNextOption(currentOption, yes);
    newOption && setCurrentOption(newOption);
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src="ghost.png" className="App-logo" alt="logo" />
        <h1>should you ghost them</h1>
        <p>{currentOption.text}</p>
        {currentOption.options ? (
          <div>
            <button onClick={() => handleButtonClick(true)}> yes </button>
            <button onClick={() => handleButtonClick(false)}> no </button>
          </div>
        ) : (
          <button onClick={() => setCurrentOption(questions[1][0])}>
            {" "}
            start again{" "}
          </button>
        )}
      </header>
    </div>
  );
}

export default App;
