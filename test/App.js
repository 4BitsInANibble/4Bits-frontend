import { StatusBar } from 'expo-status-bar';
import React, {useEffect} from 'react';
import { Provider } from 'react-redux'
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { Text, Surface, PaperProvider, IconButton, adaptNavigationTheme, MD3LightTheme, MD3DarkTheme } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import store from './redux/store'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {screens} from './screens/screens'
import { useOrientation } from './hooks/phoneOrientation';
import { useSelector } from 'react-redux';

const Stack = createNativeStackNavigator()


export default function App() {
  const orientation = useOrientation()
  if (orientation == "LANDSCAPE") {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Please Turn Phone To Portrait Mode</Text>
        <IconButton icon="rowing" size={70} color='blue'/>
      </View>
    );
  }

  const themeType = useSelector((state) => state.utils.themeType)
  const { LightTheme } = adaptNavigationTheme({ reactNavigationLight : DefaultTheme });
  const { DarkTheme } = adaptNavigationTheme({ reactNavigationDark : DefaultTheme});

  return (
    <PaperProvider theme={themeType === 'light' ? MD3LightTheme : MD3DarkTheme}>
      <NavigationContainer theme={themeType === 'light' ? LightTheme : DarkTheme}>
        <SafeAreaProvider>
            <StatusBar style="auto" /> 
            <Stack.Navigator
              screenOptions={{
                headerShown: false
              }}
            >
              {screens.map((screen) => 
                <Stack.Screen
                  key={screen.name}
                  name={screen.name}
                  component={screen.component}
                />
              )}
            </Stack.Navigator>
        </SafeAreaProvider>
      </NavigationContainer>
    </PaperProvider>

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
