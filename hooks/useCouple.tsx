import { useContext } from 'react';
import { CoupleContext } from '@/contexts/CoupleContext';

export function useCouple() {
  const context = useContext(CoupleContext);
  if (!context) {
    throw new Error('useCouple deve ser usado dentro de CoupleProvider');
  }
  return context;
}