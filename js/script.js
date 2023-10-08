document.addEventListener('DOMContentLoaded', () => {
    const mazeContainer = document.getElementById('maze');
    const mazeConfigurations = {
      1: {
        rows: 3,
        layout: ["s....w......e",
                 "..............",
                 ".............."]
      },
      2: {
        rows: 3,
        layout: ["s.....e......",
                 ".......w......",
                 ".........w...."]
      },
      3: {
        rows: 3,
        layout: ["s...........e",
                 ".......wwwwww.....",
                 "........w...."]
      },
    };
  
    let prevMazeIndex;
    let mazeIndex = getRandomMazeIndex();
    let playerPosition;
  
    initializeMaze();
  
    document.addEventListener('keydown', (e) => {
      const key = e.key.toLowerCase();
  
      if (key === 'm') {
        mazeIndex = getRandomMazeIndex();
        initializeMaze();
      } else {
        movePlayer(key);
      }
    });
  
    function getRandomMazeIndex() {
      let newIndex;
      do {
        newIndex = Math.floor(Math.random() * Object.keys(mazeConfigurations).length) + 1;
      } while (newIndex === prevMazeIndex);
  
      prevMazeIndex = newIndex;
      return newIndex;
    }
  
    function initializeMaze() {
      mazeContainer.innerHTML = ''; // Clear the maze container
  
      const mazeInfo = mazeConfigurations[mazeIndex];
      const numRows = mazeInfo.rows;
      const mazeStringArray = mazeInfo.layout;
      const numCols = mazeStringArray[0].length;
  
      for (let row = 0; row < numRows; row++) {
        const rowContainer = document.createElement('div');
        rowContainer.classList.add('maze-row');
  
        for (let col = 0; col < numCols; col++) {
          const cell = document.createElement('div');
          cell.classList.add('cell', `row-${row}`, `col-${col}`);
  
          if (mazeStringArray[row][col] === 'w') {
            cell.classList.add('wall');
          } else if (mazeStringArray[row][col] === 's') {
            cell.classList.add('start');
            playerPosition = { row, col };
          } else if (mazeStringArray[row][col] === 'e') {
            cell.classList.add('end');
          }
  
          rowContainer.appendChild(cell);
        }
  
        mazeContainer.appendChild(rowContainer);
      }
  
      const startCell = document.querySelector('.cell.start');
      if (startCell) {
        startCell.classList.add('player');
      }
    }
  
    function movePlayer(key) {
      const currentCell = document.querySelector('.cell.player');
      if (!currentCell) return;
  
      currentCell.classList.remove('player');
  
      const newPosition = calculateNewPosition(key, playerPosition);
  
      if (newPosition.row !== -1 && newPosition.col !== -1 && !isWall(newPosition.row, newPosition.col)) {
        playerPosition = newPosition;
      }
  
      const newCell = document.querySelector(`.cell.row-${playerPosition.row}.col-${playerPosition.col}`);
      if (newCell) {
        newCell.classList.add('player');
      }
  
      const endCell = document.querySelector('.cell.end');
      if (endCell && playerPosition.row === parseInt(endCell.classList[1].split('-')[1]) && playerPosition.col === parseInt(endCell.classList[2].split('-')[1])) {
        alert('Congratulations! You completed the maze.');
        mazeIndex = getRandomMazeIndex();
        initializeMaze();
      }
    }
  
    function calculateNewPosition(key, position) {
      let newRow = position.row;
      let newCol = position.col;
  
      if (key === 'arrowup' && newRow > 0) {
        newRow--;
      } else if (key === 'arrowdown' && newRow < mazeConfigurations[mazeIndex].rows - 1) {
        newRow++;
      } else if (key === 'arrowleft' && newCol > 0) {
        newCol--;
      } else if (key === 'arrowright' && newCol < mazeConfigurations[mazeIndex].layout[0].length - 1) {
        newCol++;
      }
  
      return { row: newRow, col: newCol };
    }
  
    function isWall(row, col) {
      const cell = document.querySelector(`.cell.row-${row}.col-${col}`);
      return cell && cell.classList.contains('wall');
    }
});
