import React from 'react';
import { motion } from 'framer-motion';

// Fun emoji sets for kids
const EMOJI_SETS = [
  { icon: '🍎', color: '#ff4d4f' },
  { icon: '🐶', color: '#ffc53d' },
  { icon: '🐱', color: '#ff9c6e' },
  { icon: '🐰', color: '#ffadd2' },
  { icon: '🐻', color: '#d48806' },
  { icon: '🐸', color: '#73d13d' },
  { icon: '🐼', color: '#ffffff' },
  { icon: '🍓', color: '#f5222d' },
  { icon: '🚗', color: '#1890ff' },
  { icon: '🚀', color: '#5c0011' }
];

export default function VisualAids({ num1, num2, operator, iconIndex = 0, isHidden = false }) {
  if (isHidden) return null;

  const IconProps = EMOJI_SETS[iconIndex % EMOJI_SETS.length];

  const generateIcons = (count, isCrossedOut = false) => {
    // If count is 0, show a dashed outline to represent "nothing"
    if (count === 0) {
      return (
        <motion.div
          key="zero"
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 10 }}
          style={{
            position: 'relative',
            opacity: 0.5,
            width: '40px',
            height: '40px',
            borderRadius: '50%', // Circle outline
            border: `3px dashed ${IconProps.color}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 5px'
          }}
        />
      );
    }
    
    return Array.from({ length: count }).map((_, i) => (
      <motion.div
        key={i}
        initial={{ scale: 0, y: -20, rotate: -10 }}
        animate={{ scale: 1, y: 0, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 10, delay: i * 0.1 }}
        style={{
          position: 'relative',
          opacity: isCrossedOut ? 0.3 : 1,
          fontSize: '35px',
          lineHeight: 1,
          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
        }}
      >
        {IconProps.icon}
        {isCrossedOut && (
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '40px',
            height: '4px',
            background: 'red',
            transform: 'translate(-50%, -50%) rotate(45deg)',
            borderRadius: '2px'
          }} />
        )}
      </motion.div>
    ));
  };

  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      gap: '20px', 
      minHeight: '80px', 
      flexWrap: 'wrap',
      background: 'rgba(255,255,255,0.5)',
      padding: '15px 25px',
      borderRadius: '20px',
      boxShadow: 'inset 0 2px 5px rgba(0,0,0,0.05)'
    }}>
      <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', justifyContent: 'center', maxWidth: '180px' }}>
        {generateIcons(operator === '+' ? num1 : num1)}
      </div>
      
      <span style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-light)' }}>
        {operator}
      </span>
      
      <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', justifyContent: 'center', maxWidth: '180px' }}>
        {operator === '+' ? generateIcons(num2, false) : generateIcons(num2, true)}
      </div>
    </div>
  );
}
