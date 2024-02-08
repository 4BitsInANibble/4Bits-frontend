import { StatusBar } from 'expo-status-bar';
import {React, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import BottomBar from '../components/BottomBar'
import Header from '../components/Header';
import QRCodeScanner from './QRScannerTab';

export default function HomeScreen({navigation}) {
  return (
    <>
        <Header />
        <BottomBar navigation={navigation}/>
    </>

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
