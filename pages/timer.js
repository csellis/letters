import React, { useState } from 'react'

const Timer = ({ timerEnds }) => {
  const [timeRemaining, setTimeRemaining] = useState(0)

  function setDate(timerEnds) {
    const now = new Date();
    const end = new Date(timerEnds);
    setTimeRemaining(end - now)

    console.log(timeRemaining)
  }

  setInterval(setDate, 1000);

  setDate();

  return (
    <div className="font-mono text-2xl text-orange-700">
      {timeRemaining}
    </div>
  )
}

export default Timer;