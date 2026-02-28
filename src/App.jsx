import { useState, useEffect } from 'react';
import './App.css';
import JourneyMap from './components/JourneyMap';
import Game from './components/Game';

// Animated Background Component
function Scenery() {
  return (
    <div className="scenery-layer">
      <div className="sun">☀️</div>
      <div className="clouds-container">
        <div className="cloud cloud-1">☁️</div>
        <div className="cloud cloud-2">☁️</div>
        <div className="cloud cloud-3">☁️</div>
      </div>
      <div className="hills-container">
        <div className="hill hill-back"></div>
        <div className="hill hill-front"></div>
        <div className="trees-container">
          <div className="tree tree-1">🌳</div>
          <div className="tree tree-2">🌲</div>
          <div className="tree tree-3">🌴</div>
          <div className="tree tree-4">🌲</div>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [currentStageId, setCurrentStageId] = useState(null);
  
  // Persistent State
  const [totalPoints, setTotalPoints] = useState(() => {
    const saved = localStorage.getItem('ananMathPoints');
    return saved ? parseInt(saved, 10) : 0;
  });

  const [highestUnlockedStage, setHighestUnlockedStage] = useState(() => {
    const saved = localStorage.getItem('ananMathStage');
    return saved ? parseInt(saved, 10) : 1;
  });

  // Save to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('ananMathPoints', totalPoints.toString());
    localStorage.setItem('ananMathStage', highestUnlockedStage.toString());
  }, [totalPoints, highestUnlockedStage]);

  const handlePointsEarned = (points) => {
    const newTotal = totalPoints + points;
    setTotalPoints(newTotal);

    // Logic to unlock next stages based on points (50 points per stage)
    const expectedStage = Math.floor(newTotal / 50) + 1;
    // Cap at stage 10
    const nextStage = Math.min(expectedStage, 10);
    
    if (nextStage > highestUnlockedStage) {
      setHighestUnlockedStage(nextStage);
    }
  };

  return (
    <>
      <Scenery />
      <div className="app-container">
        {!currentStageId ? (
          <JourneyMap 
            totalPoints={totalPoints} 
            highestUnlockedStage={highestUnlockedStage} 
            onSelectStage={setCurrentStageId} 
          />
        ) : (
          <Game 
            stageId={currentStageId} 
            onBackToMenu={() => setCurrentStageId(null)} 
            onPointsEarned={handlePointsEarned}
            totalPoints={totalPoints}
          />
        )}
      </div>
    </>
  );
}

export default App;
