import * as Font from "expo-font";
 
export default useFonts = async () =>
  await Font.loadAsync({
    'Arial': require('../assets/fonts/ARIAL.TTF'),
  });