import { Stack } from 'expo-router';

export default function RouterLayout() {
  return (
    <Stack screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen name="routerDetails" />
    </Stack>
  );
}
