import { StyleSheet, View } from 'react-native';
import PuzzleGrid from './components/PuzzleGrid';

export default function App() {
  return (
    <View style={styles.container}>
      <PuzzleGrid />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
