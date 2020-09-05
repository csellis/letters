import { useSpeechRecognition } from 'react-speech-kit';
import { useState, useEffect } from "react";
import { Transition } from "@tailwindui/react";
import { useTimer } from 'use-timer';

export default function Home() {
  // const [start, setstart] = useState(false)
  const [value, setValue] = useState('');
  const [letter, setletter] = useState('')
  const [score, setscore] = useState(0);

  const INCREMENT_SCORE = 10;

  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  const pickLetter = () => {
    const number = Math.floor(Math.random() * 25)
    // console.log(number)
    const randomLetter = letters[number];
    setletter(randomLetter)
  }


  const { listen, listening, stop } = useSpeechRecognition({
    onResult: (result) => {
      setValue(result)
    },
  });

  useEffect(() => {
    if (listening) {
      pickLetter();
    }

    return () => {
      stop()
    }
  }, [listening])

  useEffect(() => {
    const regex = new RegExp(letter, "ig");

    if (value !== "" && value.match(regex)) {
      setscore(score + INCREMENT_SCORE)
      pickLetter()
    }
    return () => {
      // stop()
      // reset();
    }
  }, [value])

  console.log(`Listening: ${listening}`)

  return (
    <>
      <div className="flex flex-col justify-center items-center min-h-screen">
        <div className="top-0 right-0 text-3xl text-yellow-400 font-mono px-4 py-2 font-semibold">
          {score} points
      </div>
        <div className="mt-24 text-3xl sm:text-6xl h-64 text-yellow-400 text-center">
          What is this letter? <br />
          {letter}
        </div>
        <div className="text-3xl sm:text-6xl h-64 text-yellow-400 text-center">
          {value}
        </div>
        <div className="mt-12">
          <button className={`h-1/3 w-1/3 text-6xl ${listening ? "mic" : ""}`} onClick={listening ? stop : listen}>
            🎤
        </button>
        </div>
      </div>

    </>
  );
}
