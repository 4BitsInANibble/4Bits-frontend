// ScanRoute.js
import React, { useState, useEffect } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';
import axios from 'axios';

const ScanRoute = () => {
  const [camera, setCamera] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);

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
    try {
      const response = await axios.post('YOUR_API_ENDPOINT', {
        image: base64Image,
      });
      console.log('Image upload response:', response.data);
    } catch (error) {
      console.error('Image upload error:', error);
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
      <Camera
        ref={ref => setCamera(ref)}
        style={styles.preview}
        type={Camera.Constants.Type.back}
        flashMode={Camera.Constants.FlashMode.on}>
        <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
          <Button title="Capture" onPress={() => takePicture()} />
        </View>
      </Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

export default ScanRoute;
