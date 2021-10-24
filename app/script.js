import React, {useState} from 'react';
import { render } from 'react-dom';

function App() {
  const [status, setStatus] = useState('off');
  const [time, setTime] = useState(0);
  const [timer, setTimer] = useState(null);
  
  const startTimer = () => {
    setTime(20*60);
    setTimer(setInterval(() => {
      setTime(prevTime => prevTime - 1);
    }, 1000));
    setStatus('work');
  }

  const stopTimer = () => {
    setStatus('off');
    setTime(0);
    clearInterval(timer);
  };

  const closeApp = () => {
    window.close();
  };

  const playBell = () => {
    var bell = new Audio('./sounds/bell.wav');
    bell.play();
  }

  const handleTime = () => {
    const minutes = String(Math.floor(time % 3600 / 60)).padStart(2, '0');
    const seconds = String(Math.floor(time % 3600 % 60)).padStart(2, '0');
    const timeInMinutes = `${minutes}:${seconds}`;

    if (time === 0 && status === 'work') {
      setStatus('rest');
      setTime(20*60);
      playBell();
    }
    else if (time === 0 && status === 'rest') {
      setStatus('work');
      setTime(20);
      playBell();
    }
    return timeInMinutes;
  };
  
  return (
    <div>
      <h1>Protect your eyes</h1>
      {(status === 'off') &&
      <div>
        <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
        <p>This app will help you track your time and inform you when it's time to rest.</p>
      </div>}
      {(status === 'work') && <img src="./images/work.png" />}
      {(status === 'rest') && <img src="./images/rest.png" />}
      {(status !== 'off') && <div className="timer">{handleTime()}</div>}
      {(status === 'off') && <button onClick={() => startTimer()} className="btn">Start</button>}
      {(status !== 'off') && <button onClick={() => stopTimer()} className="btn">Stop</button>}
      <button onClick={() => closeApp()} className="btn btn-close">X</button>
    </div>
  )
};

render(<App />, document.querySelector('#app'));
