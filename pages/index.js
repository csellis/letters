import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useSpeechRecognition } from 'react-speech-kit';
import { useState, useEffect } from "react";
export default function Home() {

  const [start, setstart] = useState(false)
  const [value, setValue] = useState('');

  const { listen, listening, stop } = useSpeechRecognition({
    onResult: (result) => {
      setValue(result);
    },
  });

  useEffect(() => {
    console.log(`The start is: ${start}`)
    if (start) {
      listen()
    }
    stop()
    return () => {
      stop()
    }
  }, [start])

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div className="text-6xl text-yellow-400">
        {value}
      </div>
      <button className="mt-12 h-1/3 w-1/3 text-6xl" onClick={() => setstart(!start)}>
        🎤
      </button>
      {listening && <div className="text-4xl text-yellow-300">Go ahead I'm listening</div>}
    </div>
  );
}
