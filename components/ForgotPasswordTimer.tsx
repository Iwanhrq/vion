import React, { useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { useTheme } from '../constants/ThemeContext';

interface ForgotPasswordTimerProps {
  initialTime?: number; // em segundos
  onExpire?: () => void;
}

export default function ForgotPasswordTimer({ 
  initialTime = 5 * 60 + 12, // 5 minutos e 12 segundos padrão
  onExpire 
}: ForgotPasswordTimerProps) {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const { colors } = useTheme();

  // Timer regressivo
  useEffect(() => {
    if (timeLeft <= 0) {
      onExpire?.();
      return;
    }
    const interval = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timeLeft, onExpire]);

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, '0');
  const seconds = String(timeLeft % 60).padStart(2, '0');

  return (
    <Text style={[styles.timer, { color: colors.text }]}>
      Código expira em: <Text style={[styles.timerTime, { color: colors.buttonPrimary }]}>{minutes}:{seconds}</Text>
    </Text>
  );
}

const styles = StyleSheet.create({
  timer: {
    marginBottom: 40,
  },
  timerTime: {
    fontWeight: 'bold'
  },
});
