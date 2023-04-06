import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Federated } from '@callstack/repack/client';
import { TUseZustandStore } from './src/store/zustand';

const IncreaseCountButton = React.lazy(() => Federated.importModule('app1', './IncreaseCountButton'));

/*
* We should import the store module from the remote instance 
* instead of directly from './src/store/**' to make sure that we have just one store instance.
*/
let useZustandStore: TUseZustandStore;

function App(): JSX.Element {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const importUseZustandStore = async () => {
      const module = await Federated.importModule('host', './ZustandStore');
      useZustandStore = module.default;

      setIsReady(true);
    };

    importUseZustandStore();
  }, [])

  if (!isReady) {
    return <Text>Loading host app...</Text>;
  }

  return <Host />;
}

const Host = () => {
  const { count, increase } = useZustandStore();
  
  return (
    <SafeAreaView>
      <Text style={styles.title}>Host app</Text> 
      <TouchableOpacity style={styles.button} onPress={() => increase(1)}>
        <Text>Increase count from Host app: {count}</Text>
      </TouchableOpacity>
      <React.Suspense fallback={<Text>Loading app1...</Text>}>
        <IncreaseCountButton />
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
