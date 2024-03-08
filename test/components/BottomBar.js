import {useEffect, useState} from 'react';
import {BottomNavigation, Text, MD3Colors, Icon} from 'react-native-paper'
import ProfileTab from '../screens/ProfileTab';
import HomeTab from '../screens/HomeTab';
import ScanRoute from '../screens/ScanScreen'; 

export default function BottomBar({navigation}) {
  const [index, setIndex] = useState(0);

  const HomeRoute = () => <HomeTab navigation={navigation}/>;

  const RecipeRoute = () => <Text>RECIPES</Text>;
  
  // const ScanRoute = () => <Text>ScanRoute</Text>;
  
  const CartRoute = () => <Text>CartRoute</Text>;
  
  const ProfileRoute = () => <ProfileTab navigation={navigation}/>
  
  const [routes, setRoutes] = useState([
    { key: 'home', title: 'Home', focusedIcon: 'home' },
    { key: 'recipes', title: 'Recipes', focusedIcon: 'book' },
    { key: 'scan', title: 'Scan', focusedIcon: 'scan-helper'},
    { key: 'cart', title: 'Shopping Cart', focusedIcon: 'cart-heart'},
    { key: 'profile', title: 'Profile', focusedIcon: 'account'},
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeRoute,
    recipes: RecipeRoute,
    scan: ScanRoute,
    cart: CartRoute,
    profile: ProfileRoute,
  });
return (
    <>
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
        screenOptions={{unmountOnTrue: true}}
      />
    </>
  );
}
