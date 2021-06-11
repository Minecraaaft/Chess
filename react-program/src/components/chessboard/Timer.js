import React from 'react'
import { useState, useEffect } from 'react'

const Timer = (props) => {
    const [minutes, setMinutes] = useState(props.minute);
    const [seconds, setSeconds] = useState(props.second);
    const [running, setRuning] = useState(true);

    useEffect(() => {
        let myInterval = setInterval(() => {
            if (running) {
                if (seconds > 0) {
                    setSeconds(seconds - 1);
                }
                if (seconds === 0) {
                    if (minutes === 0) {
                        clearInterval(myInterval);
                    } else {
                        setMinutes(minutes - 1);
                        setSeconds(59);
                    }
                }
            }

        }, 1000);
        return () => clearInterval(myInterval);
    })

    return (
        <div className="time-box">
            {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </div>
    )
}

export default Timer
