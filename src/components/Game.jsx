import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import useWindowSize from 'react-use/lib/useWindowSize';
import VisualAids from './VisualAids';
import StageComplete from './StageComplete';
import { ArrowLeft, Star } from 'lucide-react';

const STAGE_TITLES = {
  1: 'Add up to 5',
  2: 'Subtract up to 5',
  3: 'Add up to 10',
  4: 'Subtract up to 10',
  5: 'Mixed up to 10',
  6: 'Teens Addition',
  7: 'Add up to 20',
  8: 'Subtract up to 20',
  9: 'Mixed up to 20',
  10: 'Boss Level'
};

const CHEER_ANIMALS = ['🦊', '🐻', '🐼', '🐰', '🦁', '🐵'];

const generateProblem = (stageId) => {
  let num1, num2, answer, operator;
  let type = 'normal';

  switch (stageId) {
    case 1: operator = '+'; answer = Math.floor(Math.random() * 6); num1 = Math.floor(Math.random() * (answer + 1)); num2 = answer - num1; break;
    case 2: operator = '-'; num1 = Math.floor(Math.random() * 6); num2 = Math.floor(Math.random() * (num1 + 1)); answer = num1 - num2; break;
    case 3: operator = '+'; answer = Math.floor(Math.random() * 6) + 5; num1 = Math.floor(Math.random() * (answer + 1)); num2 = answer - num1; break;
    case 4: operator = '-'; num1 = Math.floor(Math.random() * 6) + 5; num2 = Math.floor(Math.random() * (num1 + 1)); answer = num1 - num2; break;
    case 5: 
      operator = Math.random() > 0.5 ? '+' : '-';
      if (operator === '+') { answer = Math.floor(Math.random() * 11); num1 = Math.floor(Math.random() * (answer + 1)); num2 = answer - num1; } 
      else { num1 = Math.floor(Math.random() * 11); num2 = Math.floor(Math.random() * (num1 + 1)); answer = num1 - num2; }
      break;
    case 6: operator = '+'; num1 = 10; num2 = Math.floor(Math.random() * 10); answer = num1 + num2; if (Math.random() > 0.5) [num1, num2] = [num2, num1]; break;
    case 7: operator = '+'; answer = Math.floor(Math.random() * 11) + 10; num1 = Math.floor(Math.random() * (answer + 1)); num2 = answer - num1; break;
    case 8: operator = '-'; num1 = Math.floor(Math.random() * 11) + 10; num2 = Math.floor(Math.random() * (num1 + 1)); answer = num1 - num2; break;
    case 9: 
      operator = Math.random() > 0.5 ? '+' : '-';
      if (operator === '+') { answer = Math.floor(Math.random() * 21); num1 = Math.floor(Math.random() * (answer + 1)); num2 = answer - num1; } 
      else { num1 = Math.floor(Math.random() * 11) + 10; num2 = Math.floor(Math.random() * (num1 + 1)); answer = num1 - num2; }
      break;
    case 10:
      operator = '+';
      if (Math.random() > 0.5) {
        type = 'missing_number'; answer = Math.floor(Math.random() * 11) + 5; num1 = Math.floor(Math.random() * answer); num2 = answer - num1;
        let options = new Set([num2]);
        while (options.size < 3) { let wrong = num2 + (Math.floor(Math.random() * 5) - 2); if (wrong >= 0 && wrong !== num2) options.add(wrong); }
        return { type, num1, num2, answer, operator, options: Array.from(options).sort(() => Math.random() - 0.5), iconIndex: Math.floor(Math.random() * 10), cheerAnimal: CHEER_ANIMALS[Math.floor(Math.random() * CHEER_ANIMALS.length)] };
      } else {
        const tens = Math.floor(Math.random() * 8) + 2; const units1 = Math.floor(Math.random() * 5); const units2 = Math.floor(Math.random() * (10 - units1)); 
        num1 = (tens * 10) + units1; num2 = units2; answer = num1 + num2;
      }
      break;
    default: operator = '+'; num1 = 1; num2 = 1; answer = 2;
  }

  let options = new Set([answer]);
  while (options.size < 3) {
    let wrong = answer + (Math.floor(Math.random() * 7) - 3);
    if (wrong >= 0 && wrong !== answer) options.add(wrong);
  }

  return {
    type, num1, num2, operator, answer,
    options: Array.from(options).sort(() => Math.random() - 0.5),
    iconIndex: Math.floor(Math.random() * 10),
    cheerAnimal: CHEER_ANIMALS[Math.floor(Math.random() * CHEER_ANIMALS.length)]
  };
};

export default function Game({ stageId, onBackToMenu, onPointsEarned, totalPoints }) {
  const [problem, setProblem] = useState(() => generateProblem(stageId));
  const [status, setStatus] = useState('playing');
  const [shake, setShake] = useState(false);
  const [showStageComplete, setShowStageComplete] = useState(false);
  const { width, height } = useWindowSize();

  const handleSelect = (selected) => {
    if (status === 'correct') return;

    const isCorrect = problem.type === 'missing_number' ? selected === problem.num2 : selected === problem.answer;

    if (isCorrect) {
      setStatus('correct');
      onPointsEarned(10);
      
      // Check if we hit a 50 point milestone (5 questions per stage)
      const newTotal = totalPoints + 10;
      if (newTotal > 0 && newTotal % 50 === 0) {
        setTimeout(() => setShowStageComplete(true), 2000); // Wait for correct animation to finish
      } else {
        setTimeout(() => { nextProblem(); }, 3000);
      }
      
    } else {
      setStatus('wrong');
      setShake(true);
      setTimeout(() => setShake(false), 500);
      setTimeout(() => setStatus('playing'), 1500);
    }
  };

  const nextProblem = () => {
    setProblem(generateProblem(stageId));
    setStatus('playing');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', alignItems: 'center', width: '100%', zIndex: 10 }}>
      
      <AnimatePresence>
        {showStageComplete && (
          <StageComplete 
            key="stage-complete"
            stageId={stageId} 
            onContinue={() => {
              setShowStageComplete(false);
              onBackToMenu(); // Go back to map to select next stage
            }} 
          />
        )}
      </AnimatePresence>

      {status === 'correct' && !showStageComplete && <Confetti width={width || 600} height={height || 800} recycle={false} numberOfPieces={300} />}
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', padding: '10px 20px', alignItems: 'center', background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(5px)' }}>
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onPointerDown={onBackToMenu} 
          style={{ background: 'transparent', padding: '10px', display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--text-light)' }}
        >
          <ArrowLeft size={24} /> Back
        </motion.button>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
          <span style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--primary-color)' }}>
            Stage {stageId}: {STAGE_TITLES[stageId]}
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#ffb84d', fontWeight: 'bold' }}>
            <Star size={18} fill="#ffb84d" color="#ffb84d" /> {totalPoints} Points
          </div>
        </div>
      </div>

      <motion.div 
        className="game-board glass-panel"
        animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}}
        transition={{ duration: 0.4 }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '40px 20px',
          width: '90%',
          maxWidth: '500px',
          margin: '20px auto',
          gap: '25px',
          position: 'relative'
        }}
      >
        
        {/* Cheerleader Animal Mascot */}
        <div style={{ position: 'absolute', top: '-45px', right: '10px', fontSize: '60px' }}>
          <motion.div
            animate={
               status === 'correct' ? { y: [0, -20, 0], scale: [1, 1.2, 1] } : 
               status === 'wrong' ? { rotate: [-10, 10, -10, 10, 0] } : 
               { y: [0, -5, 0] }
            }
            transition={status === 'playing' ? { repeat: Infinity, duration: 2 } : { duration: 0.5 }}
          >
            {problem.cheerAnimal}
          </motion.div>
        </div>

        {stageId <= 5 && (
          <VisualAids 
            num1={problem.num1} 
            num2={problem.type === 'missing_number' && status !== 'correct' ? 0 : problem.num2} 
            operator={problem.operator} 
            iconIndex={problem.iconIndex} 
            isHidden={problem.type === 'missing_number' && status !== 'correct'}
          />
        )}

        <div style={{ 
          fontSize: stageId > 9 ? '3.5rem' : '4.5rem', 
          fontWeight: 800, 
          display: 'flex', 
          gap: '15px', 
          color: 'var(--text-main)',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <span>{problem.num1}</span>
          <span style={{ color: 'var(--primary-color)' }}>{problem.operator}</span>
          
          {problem.type === 'missing_number' ? (
            <span style={{ 
              color: status === 'correct' ? 'var(--success-color)' : 'var(--text-light)',
              borderBottom: status === 'correct' ? 'none' : '4px dashed var(--text-light)',
              minWidth: '60px',
              textAlign: 'center'
            }}>
              {status === 'correct' ? problem.num2 : '?'}
            </span>
          ) : (
            <span>{problem.num2}</span>
          )}

          <span style={{ color: 'var(--accent-color)' }}>=</span>
          
          {problem.type === 'missing_number' ? (
            <span>{problem.answer}</span>
          ) : (
            <span style={{ 
              color: status === 'correct' ? 'var(--success-color)' : 'var(--text-light)',
              borderBottom: status === 'correct' ? 'none' : '4px dashed var(--text-light)',
              minWidth: '60px',
              textAlign: 'center'
            }}>
              {status === 'correct' ? problem.answer : '?'}
            </span>
          )}
        </div>

        {/* Feedback Message */}
        <div style={{ height: '30px', margin: '-10px 0 10px 0', position: 'relative' }}>
          <AnimatePresence mode="wait">
            {status === 'correct' && (
              <motion.div
                key="correct"
                initial={{ scale: 0, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0 }}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
              >
                <p style={{ color: 'var(--success-color)', fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>
                  Great Job! {problem.cheerAnimal}
                </p>
                <motion.span 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: -20 }}
                  style={{ color: '#FFD700', fontSize: '1.3rem', fontWeight: 'bold', position: 'absolute', top: '-10px', whiteSpace: 'nowrap' }}
                >
                  +10 Points! ⭐
                </motion.span>
              </motion.div>
            )}
            {status === 'wrong' && (
              <motion.p
                key="wrong"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                style={{ color: 'var(--primary-color)', fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}
              >
                Oops! Try again! ✨
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Options */}
        <div style={{ display: 'flex', gap: '20px', width: '100%', justifyContent: 'center' }}>
          {problem.options.map((opt) => (
            <motion.button
              key={opt}
              className="bouncy-btn"
              whileHover={{ scale: 1.1, translateY: -5 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleSelect(opt)}
              disabled={status === 'correct'}
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '25px', // Make them slightly softer squares instead of circles
                fontSize: '2.5rem',
                fontWeight: 800,
                color: '#fff',
                background: `linear-gradient(135deg, var(--accent-light), var(--accent-color))`,
                boxShadow: '0 8px 0 #8ab4f8, var(--shadow-md)', // 3D button effect
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: status === 'correct' && ((problem.type === 'missing_number' && opt !== problem.num2) || (problem.type !== 'missing_number' && opt !== problem.answer)) ? 0.3 : 1,
                borderBottom: 'none',
                marginBottom: '8px', 
              }}
            >
              {opt}
            </motion.button>
          ))}
        </div>
      </motion.div>
      
    </div>
  );
}
