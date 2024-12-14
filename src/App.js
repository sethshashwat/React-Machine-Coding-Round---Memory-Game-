import { useEffect, useState } from 'react';
import './App.css';

const getNums = () => {
  const list = [];
  for (let i = 1; i <= 8; i++) {
    list.push(i);
    list.push(i);
  }
  return list;
}

function App() {
  const [stage, setStage] = useState("init");
  const [nums, setNums] = useState(getNums());
  const [opened, setOpened] = useState([]);
  const [solvedList, setSolvedList] = useState([]);


  const randomNums = () => {
    const copyNums = [...nums];
    return copyNums.sort(() => Math.random() - 0.5);
  }

  const handleStart = () => {
    setStage('start');
    setNums(randomNums());
  }

  const handleClick = (num, index) => {
    if (opened.length === 2) return;
    setOpened((prev) => [...prev, index])
  }

  useEffect(() => {
    if (opened.length === 2) {
      setTimeout(() => {
        const index1 = opened[0];
        const index2 = opened[1];
        if (nums[index1] === nums[index2]) {
          setSolvedList((prev) => [...prev, nums[index1]])
          setOpened([]);
        } else {
          setOpened([]);
        }
      }, 1000)
    }
    // eslint-disable-next-line
  }, [opened])

  useEffect(() => {
    if(solvedList.length === 8){
      setStage('win');
      setOpened([]);
      setSolvedList([]);
    }
  },[solvedList])

  const getClassName = (num, index) => {
    if (solvedList.includes(num)) {
      return 'remove';
    } else if (opened.includes(index)) {
      return 'show';
    } else {
      return 'hide';
    }
  }

  return (
    <div className="App">
      <h1>Memory Game</h1>
      {
        stage === "init" && <button onClick={handleStart}>Play Game</button>
      }
      {
        stage === "start" &&
        <div>
          <div className="game">
            <div className="cards">
              {
                nums.map((num, index) => (
                  <div className={`card ${getClassName(num, index)}`} key={index} onClick={() => handleClick(num, index)}>{num}</div>
                ))
              }
            </div>
          </div>
        </div>
      }
      {
        stage === "win" &&
        <div>
          <h1>You won the Game!</h1>
          <button onClick={handleStart}>Play Again!</button>
        </div>
      }
    </div>
  );
}

export default App;
