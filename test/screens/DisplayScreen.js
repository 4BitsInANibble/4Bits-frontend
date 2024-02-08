import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { Text, Surface, Button, Divider } from 'react-native-paper';
import { useOrientation } from '../hooks/phoneOrientation';
import Header from '../components/Header';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function DisplayScreen({navigation}) {
  const handleQuit = () => navigation.navigate("Post-Workout")
  const insets = useSafeAreaInsets();

  return (
    <>
        <View style={{ paddingTop: insets.top }}/>
        <View style={styles.container}>
            <View style={[styles.row, styles.flex1, styles.border]}>
                <View style={[styles.flex2, styles.data1, styles.borderRight]}>
                    <Text style={styles.textSize}>TIME</Text>
                </View>
                <View style={[styles.flex1]}>
                    <Text style={styles.textSize}>str/t</Text>
                </View>
            </View>
            <View style={[styles.flex2, styles.data2]}>
                <Text style={styles.textSize}>CURRENT SPLIT PACE</Text>
            </View>
            <View style={[styles.row, styles.flex1, styles.border]}>
                <View style={[styles.flex2, styles.data1, styles.borderRight]}>
                    <Text style={styles.textSize}>DISTANCE</Text>
                </View>
                <View style={styles.flex1} />
            </View>
            <View style={[styles.row, styles.flex1, styles.border]}>
                <View style={[styles.flex1]}>
                    <Text style={styles.textSize}>AVG SPLIT PACE</Text>
                </View>
            </View>
            <View style={[styles.row, styles.flex1]}>
                <View style={[styles.flex1]}>
                    <Text style={styles.textSize}>SPLIT METERS</Text>
                </View>
            </View>
            <View style={[styles.row, styles.flex1, styles.border]}>
                <View style={[styles.flex1]}>
                    <Text style={styles.textSize}>PROJECTED METERS</Text>
                </View>
            </View>
            <View style={[styles.row, styles.flex2, styles.border]}>
                <View style={[styles.flex1, styles.data1, styles.borderRight]}>
                    <Text style={styles.textSize}>TWIST ICON</Text>
                </View>
                <View style={styles.flex1}>
                    <Text style={styles.textSize}>TILT ICON</Text>
                </View>
            </View>
            <Button onPress={handleQuit}>
                End Workout
            </Button>
        </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  row: {
    flexDirection: 'row'
  },
  border: {
    borderWidth: 1.5,
    borderColor: 'outline'
  },
  borderRight: {
    borderRightWidth: 1.5,
    borderColor: 'outline'
  },
  flex1: {
    flex: 1
  },
  flex2: {
    flex: 2
  },
  data1: {
    backgroundColor: 'orange'
  }, data2: {
    backgroundColor: 'red'
  },
  textSize: {
    fontSize: 40
  }
});
