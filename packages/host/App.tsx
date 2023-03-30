/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Federated } from '@callstack/repack/client';

const IncreaseCountButton = React.lazy(() => Federated.importModule('app1', './IncreaseCountButton'));

function App(): JSX.Element {
  const [count, setCount] = useState(0);

  return (
    <SafeAreaView>
      <Text style={styles.title}>Host app</Text> 
      <TouchableOpacity style={styles.button} onPress={() => setCount(count + 1)}>
        <Text>Increase count from Host app: {count}</Text>
      </TouchableOpacity>
      <React.Suspense fallback={<Text>Loading app1...</Text>}>
        <IncreaseCountButton count={count} increase={() => setCount(count + 1)} />
      </React.Suspense>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 36,
    fontWeight: '700',
  },
  button: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'lightgray',
    marginTop: 20,
    padding: 5
  }
});

export default App;
