import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Camera } from 'expo-camera';
import {Chip} from 'react-native-paper'
import {useOrientation} from '../hooks/phoneOrientation'

export default function QRCodeScannerTab({navigation}) {
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const serverId = useSelector((state) => state.server.serverId)
  const dispatch = useDispatch()

  const handleBarCodeScanned = ({ type, data }) => {
    dispatch({type: "SET_SERVER", payload: data});
    
    navigation.navigate('Display')
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  const renderCamera = () => {
    return (
      <View style={styles.cameraContainer}>
          <BarCodeScanner
            onBarCodeScanned={serverId === "" ? handleBarCodeScanned : undefined}
            style={styles.camera}
          >
              <Chip style={styles.infoChip}>
                  <Text style={styles.paragraph}>Scan a QR Code to connect to erg.</Text>
              </Chip>
          </BarCodeScanner>
      </View> 

    );
  };

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Camera permission not granted</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {renderCamera()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  paragraph: {
    fontSize: 16,
  },
  cameraContainer: {
    width: '100%',
    height: '100%',
    aspectRatio: 1,
    overflow: 'hidden',
  },
  camera: {
    flex: 1,
  },
  infoChip: {
    position: 'absolute',
    top: '10%',
    alignSelf: 'center',
    padding: 10,
    borderRadius: 8,
  }
});