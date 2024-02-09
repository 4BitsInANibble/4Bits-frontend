import * as React from 'react';
import { Appbar, Surface, Text, Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native';

const Header = (props) => {
  const navigation =  useNavigation();
  const username = useSelector((state) => state.user.username)
  const logMeOut = () => {
    axios({
      method: "POST",
      url:`users/${username}/logout`
    })
    .then((response) => {
       props.token()
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        }
    })}

  return (
    <Appbar.Header mode='center-aligned' elevated>
      {navigation.goBack !== undefined && <Appbar.BackAction onPress={navigation.goBack} />}
      <Appbar.Content title="Nibble" />
      {/* <Button icon="account" mode="contained-tonal" textColor="black" onPress={_handleSearch}>
        Sign in
      </Button> */}
    </Appbar.Header>
  );
};

export default Header;