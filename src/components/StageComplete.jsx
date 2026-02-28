import React from 'react';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import useWindowSize from 'react-use/lib/useWindowSize';
import { Gift, Star, ArrowRight } from 'lucide-react';

export default function StageComplete({ stageId, onContinue }) {
  const { width, height } = useWindowSize();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ type: 'spring', damping: 15, stiffness: 100 }}
      style={{
        position: 'fixed',
        top: 0, left: 0, width: '100%', height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(10px)',
        zIndex: 100,
        padding: '20px',
        textAlign: 'center'
      }}
    >
      <Confetti width={width || 600} height={height || 800} recycle={true} numberOfPieces={400} />
      
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        style={{
          background: 'var(--success-color)',
          width: '120px', height: '120px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '30px',
          boxShadow: '0 10px 30px rgba(168, 230, 207, 0.5)'
        }}
      >
        <Star size={80} color="#fff" fill="#fff" />
      </motion.div>

      <h1 style={{ fontSize: '3rem', color: 'var(--primary-color)', margin: '0 0 10px 0', textShadow: '2px 2px 4px rgba(0,0,0,0.1)' }}>
        Stage {stageId} Complete! 🎉
      </h1>
      
      <p style={{ fontSize: '1.5rem', color: 'var(--text-main)', margin: '0 0 30px 0', maxWidth: '400px', lineHeight: '1.4' }}>
        You are so smart, An An! 
      </p>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: 'spring' }}
        style={{
          background: 'linear-gradient(135deg, #FFD3B6, #ffb84d)',
          padding: '20px 30px',
          borderRadius: '25px',
          boxShadow: '0 8px 15px rgba(255, 184, 77, 0.3)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '15px',
          marginBottom: '40px'
        }}
      >
        <Gift size={50} color="#fff" />
        <p style={{ fontSize: '1.4rem', color: '#fff', fontWeight: 'bold', margin: 0, textShadow: '1px 1px 2px rgba(0,0,0,0.1)' }}>
          Hooray! Go tell Mama and Baba you finished a stage to claim a small gift! 🎁
        </p>
      </motion.div>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onContinue}
        style={{
          padding: '15px 40px',
          fontSize: '1.5rem',
          fontWeight: 'bold',
          color: '#fff',
          background: 'var(--accent-color)',
          borderRadius: '30px',
          border: 'none',
          boxShadow: '0 8px 0 #7ca4e3, var(--shadow-md)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}
      >
        Back to Map <ArrowRight />
      </motion.button>
    </motion.div>
  );
}
