// ScanScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { Camera } from 'expo-camera';
import axios from 'axios';

const ScanScreen = () => {
  const [camera, setCamera] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [loading, setLoading] = useState(false);
  const [foodItems, setFoodItems] = useState([]);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (camera) {
      const options = { quality: 0.5, base64: true };
      const data = await camera.takePictureAsync(options);
      uploadImage(data.base64);
    }
  };

  const uploadImage = async (base64Image) => {
    setLoading(true);
    try {
      // Update this URL to the actual endpoint
      const response = await axios.post('http://4bits.pythonanywhere.com/api/recognize_receipt', {
        image: base64Image,
      });
      setFoodItems(response.data.foodItems); // Assuming the response has a 'foodItems' array
      setLoading(false);
    } catch (error) {
      console.error('Image upload error:', error);
      setLoading(false);
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={Camera.Constants.Type.back} ref={ref => setCamera(ref)}>
        <View style={styles.buttonContainer}>
          <Button title={'Take Picture'} onPress={takePicture} />
        </View>
      </Camera>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
    justifyContent: 'center',
  },
});

export default ScanScreen;
