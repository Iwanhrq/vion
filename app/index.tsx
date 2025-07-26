import { Redirect } from 'expo-router';

export default function Index() {
  return <Redirect href={"/(panel)/outset" as any} />;
}
