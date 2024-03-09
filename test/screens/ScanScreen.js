// // ScanRoute.js
import React, {useState} from 'react';
import {View, Button, StyleSheet} from 'react-native';
import {RNCamera} from 'react-native-camera';
import axios from 'axios';

const ScanRoute = () => {
  const [camera, setCamera] = useState(null);

  const takePicture = async () => {
    if (camera) {
      const options = {quality: 0.5, base64: true};
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

  return (
    <View style={styles.container}>
      <RNCamera
        ref={ref => setCamera(ref)}
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.on}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
      />
      <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center'}}>
        <Button onPress={() => takePicture()} title="Capture" />
      </View>
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
