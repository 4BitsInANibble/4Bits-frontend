import {React, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import Header from '../components/Header';
import { RadioButton } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux'

export default function HomeScreen({navigation}) {
  const units = useSelector((state) => state.user.units)
  const dispatch = useDispatch()
  const setUnits = (units) => {
    // make call to server to change UNITS
    // make call to server to change UNITS
    // make call to server to change UNITS
    // make call to server to change UNITS
    // make call to server to change UNITS
    // make call to server to change UNITS
    dispatch({type: "SET_UNITS", payload: units})
  }

  useEffect(() => console.log(units), [units])

  return (
    <>
        <Header goBack={navigation.goBack}/>
        <RadioButton.Group onValueChange={units => setUnits(units)} value={units}>
            <RadioButton.Item label="Imperial" value="Imperial" />
            <RadioButton.Item label="Metric" value="Metric" />
        </RadioButton.Group>
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
