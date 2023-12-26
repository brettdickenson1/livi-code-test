import React, { useEffect, useState } from "react";
import "./MainCard.scss";
import rawData from "../../data/rawData.json";
import OptionsBox from "../OptionsBox/OptionsBox";
import leftIcon from "../../assets/icons/chevron/left.svg";
import rightIcon from "../../assets/icons/chevron/right.svg";
import ProgressBar from "../ProgressBar/ProgressBar";
import MainBtn from "../MainBtn/MainBtn";

function MainCard() {
  const outcomes = rawData.outcomes;
  const questionData = rawData.questions;

  const [questions, setQuestions] = useState(0);
  const [completed, setCompleted] = useState(0);
  const [progressVal, setProgressVal] = useState(10);
  const [outcomeText, setOutcomeText] = useState("");
  const [userScoreArr, setUserScoreArr] = useState([]);
  const [bookingBtn, setBookingBtn] = useState(false);
  const [disableBtn, setDisableBtn] = useState(true);
  const [toggleColor1, setToggleColor1] = useState(false);
  const [toggleColor2, setToggleColor2] = useState(false);
  const [nextQuestion, setNextQuestion] = useState(questionData[0]?.id);
  const [currentQuestion, setCurrenQuestion] = useState(
    questionData[questions]
  );
  const [arr, setArr] = useState([questionData[questions]]);

  const count = rawData?.questions?.filter((obj) => obj.question_text).length;
  const currentAnswer = questionData.find((x) => x.id === nextQuestion);
  const questionsComplete = currentQuestion === undefined;

  const answerYes =
    questions <= count ? arr[questions]?.answers[0]?.label : null;
  const answerNo =
    questions <= count ? arr[questions]?.answers[1]?.label : null;
  const scoreYes =
    questions <= count ? arr[questions]?.answers[0]?.score : null;
  const scoreNo = questions <= count ? arr[questions]?.answers[1]?.score : null;

  let userScore = userScoreArr.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  }, 0);

  let lastElement = arr[arr.length - 1];
  const lastQuestion =
    currentQuestion?.id === "Have you lost weight unvolontarily?";

  const checkScore = lastElement?.next.find((x) => userScore <= x.max_score);
  const checkOutcome = checkScore?.outcome;
  const checkScoreOutcomes = outcomes.find((res) => res.id === checkOutcome);

  const checkLastScore = lastElement?.next.find(
    (x) => x.outcome === "go_to_emergency_room"
  );
  const checkLastOutcome = checkLastScore?.outcome;
  const checkLastOutcomes = outcomes.find((res) => res.id === checkLastOutcome);

  useEffect(() => {
    if (userScore > 5 && userScore <= 49 && questionsComplete) {
      setBookingBtn(true);
    } else {
      setBookingBtn(false);
    }
    if (userScore > 49) {
      setOutcomeText(checkLastOutcomes?.text);
    } else {
      setOutcomeText(checkScoreOutcomes?.text);
    }
  }, [questionsComplete, checkScoreOutcomes, checkLastOutcomes, userScore]);

  useEffect(() => {
    setCurrenQuestion(currentAnswer);
  }, [currentAnswer]);

  useEffect(() => {
    setDisableBtn(true);
    if (questions === 0) {
      setCompleted(0);
    }
    if (lastQuestion) {
      setCompleted(100);
    }
    setBookingBtn(false);
  }, [questions, lastQuestion]);

  useEffect(() => {
    if (userScore > 0) {
      setBookingBtn(false);
    }
  }, [completed, userScore]);

  const nextBtnClick = () => {
    if (questions <= count) {
      setQuestions(questions + 1);
      setCompleted((prev) => prev + progressVal);
    }
    if (toggleColor1 && !toggleColor2) {
      setUserScoreArr((previousState) => [...previousState, scoreYes]);
      setNextQuestion(currentAnswer?.next[0]?.next_question);
      const checkYesMatch = questionData.find(
        (q) => q.id === currentAnswer?.next[0]?.next_question
      );
      if (checkYesMatch !== undefined) {
        arr.push(checkYesMatch);
      }
    }
    if (toggleColor2 && !toggleColor1) {
      setUserScoreArr((previousState) => [...previousState, scoreNo]);
      if (currentAnswer?.next.length > 1) {
        setNextQuestion(currentAnswer?.next[1]?.next_question);
        const checkNoMatch = questionData.find(
          (q) => q.id === currentAnswer?.next[1]?.next_question
        );
        if (checkNoMatch !== undefined) {
          arr.push(checkNoMatch);
        }
      } else {
        setNextQuestion(currentAnswer?.next[0]?.next_question);
        const checkNoMatch2 = questionData.find(
          (q) => q.id === currentAnswer?.next[0]?.next_question
        );
        if (checkNoMatch2 !== undefined) {
          arr.push(checkNoMatch2);
        }
      }
    }

    setToggleColor1(false);
    setToggleColor2(false);
  };

  const onClickYes = () => {
    setDisableBtn(false);
    setToggleColor1(true);
    setToggleColor2(false);
    if (questions === 0) {
      setProgressVal(10);
    }
  };

  const onClickNo = () => {
    setDisableBtn(false);
    setToggleColor2(true);
    setToggleColor1(false);
    if (questions === 0) {
      setProgressVal(11);
    }
  };

  const resetQuestions = () => {
    setQuestions(0);
    setCompleted(0);
    setUserScoreArr([]);
    setArr([questionData[0]]);
    setNextQuestion(questionData[0]?.id);
  };

  const goToPrevious = () => {
    if (questions > 0) {
      setQuestions(questions - 1);
      setCompleted((currCount) => currCount - 10);
      setNextQuestion(arr[questions - 1]?.id);
      userScoreArr.pop();
      setToggleColor1(false);
      setToggleColor2(false);
    }
    if (questions > 0 && !questionsComplete) {
      arr.pop();
    }
  };

  const goToBooking = () => {
    window.location.href = "https://www.livi.co.uk/";
  };

  return (
    <div className="mainCard">
      <div className="title">
        <img onClick={goToPrevious} src={leftIcon} alt="left-icon" />
        <h1>Heartburn Checker</h1>
        {/* <p>{userScore}</p> */}
      </div>
      <div className="progressBar">
        <ProgressBar bgcolor={"#84cbbc"} completed={completed} />
      </div>
      {questions < count && currentQuestion ? (
        <div className="btnOptions">
          <div className="questionMiddle">
            <h2>{arr[questions]?.question_text}</h2>
            <div className="line"></div>
            <div className="options">
              <OptionsBox
                label={answerYes}
                onClick={onClickYes}
                disableBtn={disableBtn}
                optionBg={toggleColor1}
              />
              <OptionsBox
                label={answerNo}
                onClick={onClickNo}
                disableBtn={disableBtn}
                optionBg={toggleColor2}
              />
            </div>
          </div>
          <MainBtn
            onClick={nextBtnClick}
            btnTitle={"Next"}
            btnImg={rightIcon}
            disableBtn={disableBtn}
            bookingBtn={bookingBtn}
          />
        </div>
      ) : (
        <div className="btnOptions">
          <div className="outcomeMiddle">
            <h3>Thank you for answering the questions!</h3>
            <div className="line"></div>
            <p id="outcomeText">{outcomeText}</p>
            {bookingBtn && (
              <MainBtn
                onClick={goToBooking}
                btnTitle={"Book a meeting"}
                btnImg={rightIcon}
                questions={questions}
                bookingBtn={bookingBtn}
              />
            )}
            <p id="resetQuestions" onClick={resetQuestions}>
              Back to the start screen
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default MainCard;
