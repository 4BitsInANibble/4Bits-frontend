import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useDispatch } from 'react-redux'
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { Text, Surface, Button, Divider } from 'react-native-paper';
import { useOrientation } from '../hooks/phoneOrientation';
import Header from '../components/Header';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function PostWorkoutScreen({navigation}) {
  const dispatch = useDispatch()

  const handleReturnHome = () => {
    dispatch({type: "SET_SERVER", payload: ""})
    return navigation.navigate("Home")
  }
  

  return (
    <>
        <Header/>
        <Text>
            Post Workout
        </Text>
        <Button onPress={handleReturnHome}>
            Return Home
        </Button>
    </>
  );
}
