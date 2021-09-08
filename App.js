import React from 'react';
import {
  SafeAreaView,
  StatusBar,
} from 'react-native';
import CardArea from './src/components/CardArea';

const App = () => {
  return (
    <SafeAreaView>
      <StatusBar />
      <CardArea />
    </SafeAreaView>
  );
};

export default App;
