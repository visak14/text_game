import  { useEffect, useState } from 'react';
import './App.css'; 


const letterMaps = {
  R: [
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 0],
    [1, 0, 1],
    [1, 0, 1],
  ],
  E: [
    [1, 1, 1],
    [1, 0, 0],
    [1, 1, 1],
    [1, 0, 0],
    [1, 1, 1],
  ],
  A: [
    [0, 1, 0],
    [1, 0, 1],
    [1, 1, 1],
    [1, 0, 1],
    [1, 0, 1],
  ],
  C: [
    [1, 1, 1],
    [1, 0, 0],
    [1, 0, 0],
    [1, 0, 0],
    [1, 1, 1],
  ],
  T: [
    [1, 1, 1],
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
  ],
  H: [
    [1, 0, 1],
    [1, 0, 1],
    [1, 1, 1],
    [1, 0, 1],
    [1, 0, 1],
  ],
  L: [
    [1, 0, 0],
    [1, 0, 0],
    [1, 0, 0],
    [1, 0, 0],
    [1, 1, 1],
  ],
  O: [
    [1, 1, 1],
    [1, 0, 1],
    [1, 0, 1],
    [1, 0, 1],
    [1, 1, 1],
  ],
  W: [
    [1, 0, 1],
    [1, 0, 1],
    [1, 1, 1],
    [1, 0, 1],
    [1, 0, 1],
  ],
  D: [
    [1, 1, 1],
    [1, 0, 1],
    [1, 0, 1],
    [1, 0, 1],
    [1, 1, 1],
  ],
  V: [
    [1, 0, 1],
    [1, 0, 1],
    [1, 0, 1],
    [1, 0, 1],
    [0, 1, 0],
  ],
  P: [
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1],
    [1, 0, 0],
    [1, 0, 0],
  ],
  X: [
    [1, 0, 1],
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
    [1, 0, 1],
  ],
  S: [
    [1, 1, 1],
    [1, 0, 0],
    [1, 1, 1],
    [0, 0, 1],
    [1, 1, 1],
  ],
};

const getWordGrid = (word) => {
  return word.split('').map((char) => letterMaps[char.toUpperCase()]);
};

const getGridForWords = (words) => {
  return words.map((word) => {
    const wordMap = getWordGrid(word);
    const numRows = wordMap[0].length;

  
    const newGrid = [];

    for (let row = 0; row < numRows; row++) {
      const newRow = [];

      wordMap.forEach((letter, index) => {
      
        newRow.push(...letter[row]);

     
        if (index < wordMap.length - 1) {
          newRow.push(0); 
        }
      });

      newGrid.push(newRow);
    }

    return newGrid;
  });
};

const Grid = ({ rows, cols }) => {
  const wordList = ['react', 'hello', 'world', 'developer', 'express' ]; 
  const wordGrids = getGridForWords(wordList); 
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [textPosition, setTextPosition] = useState(0);
  const [textColor, setTextColor] = useState('red'); 
  const [direction , setDirection] = useState(1)
  const currentWordGrid = wordGrids[currentWordIndex];

  useEffect(() => {
    const interval = setInterval(() => {
      setTextPosition((prevPosition) => {
        if (direction === 1 && prevPosition >= cols) {  
          setDirection(-1); 
          setCurrentWordIndex((prevWordIndex) => {
            const newColor = getRandomColor();
            setTextColor(newColor);
            return (prevWordIndex + 1) % wordList.length;
          });
          return cols - 1;
        }
        
        if (direction === -1 && prevPosition <= 0) {  
          setDirection(1);  
          setCurrentWordIndex((prevWordIndex) => {
            const newColor = getRandomColor();
            setTextColor(newColor);
            return (prevWordIndex + 1) % wordList.length;
          });
          return 0;
        }
        
        return direction === 1 ? prevPosition + 1 : prevPosition - 1;  
      });
    }, 300);
  
    return () => clearInterval(interval);
  }, [cols, wordList.length, direction]);
  


  useEffect(() => {
    const colorChangeInterval = setInterval(() => {
      const newColor = getRandomColor();
      setTextColor(newColor);
    }, 2000); 

    return () => clearInterval(colorChangeInterval);
  }, []); 

  const getRandomColor = () => {
   
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const isTextHere = (row, col) => {
    const rowInWord = row >= Math.floor(rows / 2) - 2 && row < Math.floor(rows / 2) + 3;
    const wordCol = col - textPosition;

    if (rowInWord && wordCol >= 0 && wordCol < currentWordGrid[0].length) {
      return currentWordGrid[row - Math.floor(rows / 2) + 2][wordCol] === 1; 
    }
    return false;
  };

  return (
    <div className="flex flex-col items-center">
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="flex">
          {Array.from({ length: cols }).map((_, colIndex) => (
            <div
              key={colIndex}
              className="w-10 h-10 flex justify-center items-center border"
              style={{
                backgroundColor: isTextHere(rowIndex, colIndex) ? textColor : 'black',
              }}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
};

const App = () => {
  return (
    <div className="App">
      <Grid rows={15} cols={20} /> 
    </div>
  );
};

export default App;
