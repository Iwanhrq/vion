
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { RouterProvider } from '../constants/RouterContext';
import { ThemeProvider, useTheme } from '../constants/ThemeContext';
import { auth } from '../firebaseConfig';

function RootLayoutContent() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { currentTheme, colors } = useTheme();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });
    return unsubscribe;
  }, []);

  return (
    <>
      <StatusBar 
        style={currentTheme === 'dark' ? 'light' : 'dark'} 
        backgroundColor={colors.background}
        translucent={false}
      />
      <Stack 
        screenOptions={{ 
          headerShown: false,
          contentStyle: {
            backgroundColor: colors.background,
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
      <RouterProvider>
        <RootLayoutContent />
      </RouterProvider>
    </ThemeProvider>
  );
}