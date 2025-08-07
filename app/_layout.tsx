
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { auth } from '../firebaseConfig';
import { ThemeProvider, useTheme } from '../constants/ThemeContext';

function RootLayoutContent() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { currentTheme } = useTheme();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });
    return unsubscribe;
  }, []);

  return (
    <>
      <StatusBar style={currentTheme === 'dark' ? 'light' : 'dark'} />
      <Stack 
        screenOptions={{ 
          headerShown: false,
          contentStyle: {
            backgroundColor: currentTheme === 'dark' ? '#151718' : '#fff',
          }
        }}
      >
        {!isAuthenticated ? (
          <Stack.Screen name="(panel)" />
        ) : (
          <Stack.Screen name="(tabs)" />
        )}
      </Stack>
    </>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <RootLayoutContent />
    </ThemeProvider>
  );
}