import * as React from 'react';
import {Dimensions, SafeAreaView, StyleSheet, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ChatScreen from './src/components/Screens/ChatScreen';
import HomeScreen from './src/components/Screens/HomeScreen';
import MapScreen from './src/components/Screens/NewMapScreen';
import MapBoxScreen from './src/components/Screens/MapBoxScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="MapScreen" component={MapScreen} />
        <Stack.Screen name="Map" component={MapBoxScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

// Later on in your styles..
var styles = StyleSheet.create({
  backgroundVideo: {
    height: '100%',
    width: '100%',
  },
});
