import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus, Star } from 'lucide-react';

const modes = [
  { id: 'ADD_5', title: 'Addition up to 5', icon: <Plus size={40} color="#FF9A9E" />, bg: '#FFF0F5' },
  { id: 'ADD_10', title: 'Addition up to 10', icon: <Plus size={40} color="#FF9A9E" />, bg: '#FFF0F5' },
  { id: 'SUB_5', title: 'Subtraction up to 5', icon: <Minus size={40} color="#A1C4FD" />, bg: '#F0F8FF' },
  { id: 'SUB_10', title: 'Subtraction up to 10', icon: <Minus size={40} color="#A1C4FD" />, bg: '#F0F8FF' },
];

export default function Menu({ onSelectMode }) {
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
        padding: '30px',
        margin: 'auto',
        maxWidth: '400px',
        width: '100%',
        gap: '20px'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Star color="#FFD700" fill="#FFD700" size={32} />
        <h1 style={{ color: '#FF9A9E', fontSize: '2rem', textAlign: 'center', margin: 0 }}>
          An An's Math
        </h1>
        <Star color="#FFD700" fill="#FFD700" size={32} />
      </div>
      
      <p style={{ color: 'var(--text-light)', fontSize: '1.2rem', marginBottom: '10px' }}>
        What do you want to play today?
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '100%' }}>
        {modes.map((mode) => (
          <motion.button
            key={mode.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelectMode(mode.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '20px',
              borderRadius: '20px',
              background: mode.bg,
              border: `2px solid ${mode.bg}`,
              boxShadow: 'var(--shadow-sm)',
              gap: '15px',
              width: '100%',
              cursor: 'pointer'
            }}
          >
            <div style={{ background: '#fff', borderRadius: '50%', padding: '10px', boxShadow: 'var(--shadow-sm)' }}>
              {mode.icon}
            </div>
            <span style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--text-main)' }}>
              {mode.title}
            </span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
