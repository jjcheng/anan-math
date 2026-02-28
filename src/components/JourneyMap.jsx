import React from 'react';
import { motion } from 'framer-motion';
import { Star, Lock, Check } from 'lucide-react';

const STAGES = [
  { id: 1, title: 'Add up to 5', pointsNeeded: 0 },
  { id: 2, title: 'Subtract up to 5', pointsNeeded: 50 },
  { id: 3, title: 'Add up to 10', pointsNeeded: 100 },
  { id: 4, title: 'Subtract up to 10', pointsNeeded: 150 },
  { id: 5, title: 'Mixed up to 10', pointsNeeded: 200 },
  { id: 6, title: 'Teens Addition', pointsNeeded: 250 },
  { id: 7, title: 'Add up to 20', pointsNeeded: 300 },
  { id: 8, title: 'Subtract up to 20', pointsNeeded: 350 },
  { id: 9, title: 'Mixed up to 20', pointsNeeded: 400 },
  { id: 10, title: 'Boss Level', pointsNeeded: 450 },
];

export default function JourneyMap({ totalPoints, highestUnlockedStage, onSelectStage }) {
  return (
    <motion.div 
      className="menu-container glass-panel"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        margin: 'auto',
        maxWidth: '500px',
        width: '100%',
        gap: '20px',
        maxHeight: '90vh',
        overflowY: 'auto'
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
        <h1 style={{ color: '#FF9A9E', fontSize: '2rem', textAlign: 'center', margin: 0 }}>
          Learning Journey
        </h1>
        <div style={{ 
          background: 'var(--success-color)', 
          padding: '8px 16px', 
          borderRadius: '20px',
          color: '#fff',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <Star size={20} fill="#FFD700" color="#FFD700" />
          {totalPoints} Points
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '100%', padding: '10px' }}>
        {STAGES.map((stage) => {
          const isUnlocked = stage.id <= highestUnlockedStage;
          const isCompleted = stage.id < highestUnlockedStage;
          const isCurrent = stage.id === highestUnlockedStage;

          return (
            <motion.button
              key={stage.id}
              whileHover={isUnlocked ? { scale: 1.02 } : {}}
              whileTap={isUnlocked ? { scale: 0.98 } : {}}
              onClick={() => isUnlocked && onSelectStage(stage.id)}
              disabled={!isUnlocked}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '15px 20px',
                borderRadius: '16px',
                background: isCurrent ? '#FFF0F5' : isUnlocked ? '#fff' : '#f0f0f0',
                border: `2px solid ${isCurrent ? 'var(--primary-color)' : isUnlocked ? '#eee' : '#e0e0e0'}`,
                boxShadow: isCurrent ? 'var(--shadow-md)' : 'var(--shadow-sm)',
                gap: '15px',
                width: '100%',
                cursor: isUnlocked ? 'pointer' : 'not-allowed',
                opacity: isUnlocked ? 1 : 0.6,
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div style={{ 
                width: '40px', 
                height: '40px', 
                borderRadius: '50%', 
                background: isCompleted ? 'var(--success-color)' : isCurrent ? 'var(--primary-color)' : '#ccc',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontWeight: 'bold',
                flexShrink: 0
              }}>
                {isCompleted ? <Check size={24} /> : !isUnlocked ? <Lock size={20} /> : stage.id}
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <span style={{ 
                  fontSize: '1.2rem', 
                  fontWeight: 600, 
                  color: isUnlocked ? 'var(--text-main)' : 'var(--text-light)' 
                }}>
                  {stage.title}
                </span>
                {!isUnlocked && (
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-light)' }}>
                    Need {stage.pointsNeeded} points
                  </span>
                )}
              </div>
            </motion.button>
          )
        })}
      </div>
    </motion.div>
  );
}
