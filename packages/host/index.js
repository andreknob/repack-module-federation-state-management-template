/**
 * @format
 */

import { AppRegistry, Platform } from 'react-native';
import { ScriptManager, Script, Federated } from '@callstack/repack/client';
import App from './App';
import { name as appName } from './app.json';

const resolveURL = Federated.createURLResolver({
  containers: {
    'host': 'http://localhost:8081/[name][ext]',
    'app1': 'http://localhost:8082/[name][ext]',
  },
});
  
ScriptManager.shared.addResolver(async (scriptId, caller) => {
  let url;
  if (caller === 'host') {
    url = Script.getDevServerURL(scriptId);
  } else {
    url = resolveURL(scriptId, caller);
  }
  
  if (!url) {
    return undefined;
  }
  
  return {
    url,
    cache: false, // For development
    query: {
      platform: Platform.OS,
    },
  };
});

AppRegistry.registerComponent(appName, () => App);
