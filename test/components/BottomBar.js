import {useEffect, useState} from 'react';
import {BottomNavigation, Text, MD3Colors, Icon} from 'react-native-paper'
import ProfileTab from '../screens/ProfileTab';
import HomeTab from '../screens/HomeTab';

export default function BottomBar({navigation}) {
  const [index, setIndex] = useState(0);

  const HomeRoute = () => <HomeTab navigation={navigation}/>;

  const RecipeRoute = () => <Text>RECIPES</Text>;

  const ProfileRoute = () => <ProfileTab navigation={navigation}/>
  
  const [routes, setRoutes] = useState([
    { key: 'home', title: 'Home', focusedIcon: 'home' },
    { key: 'recipes', title: 'Recipes', focusedIcon: 'book' },
    { key: 'profile', title: 'Profile', focusedIcon: 'account' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeRoute,
    recipes: RecipeRoute,
    profile: ProfileRoute
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
