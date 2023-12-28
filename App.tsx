import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { FlyMap } from './src/components/FlyMap';

// map 
  // shows past fly fishing spots, save them so they persist when closing and reopening app
  // make sure user can get directions from their current location to each pin

  // Also want to add tab navigation:
    // Screen 1: Home Screen with map on it
    // Screen 2: Basic Account Screen for now

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <FlyMap />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
