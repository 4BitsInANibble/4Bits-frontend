import React, {useEffect} from 'react';
import { View, StyleSheet } from 'react-native';
import { Avatar, Text, Surface, Divider, Button, Card, List } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios'

export default function ProfileTab({navigation}) {
  const userInfo = useSelector((state) => state.user);
  const themeType = useSelector((state) => state.utils.themeType);
  const dispatch = useDispatch()

  const _signin = () => {
    console.log("SIGNING IN")
    const data = {
      "username": "cc6956@nyu.edu",
      "password": "password"
    }
    const baseUrl = process.env.REACT_APP_FLASK_URL;
    axios.patch(baseUrl+"/users/login", data)
      .catch(console.error("Couldn't log in"));
    axios.get(baseUrl+`/users/${data["username"]}`)
      .then(resp => dispatch({type: "SET_USER", payload: resp}))
    

  }
  
  if (userInfo.Name === '') {
    return (
      <View style={styles.container}>
        <Text />
        <Avatar.Icon size={90} icon="account" />
        <Button onPress={_signin}>
          Sign in
        </Button>
      </View>
    )
  }

  const _handleUnitChange = () => navigation.navigate("Change-Units");
  const _handleChangePassword = () => console.log("Changing Password");
  const _handleLogOut = () => {
    const data = {
      "username": "cc6956@nyu.edu",
      "password": "password"
    }    
    axios.patch(baseUrl+"/users/logout", data)
      .catch(console.error("Couldn't log out"));
    dispatch({type: "SET_USER", payload: resp});
  }
  const _handleChangeTheme = () => {
    const newTheme = themeType === 'light' ? 'dark' : 'light';
    dispatch({type: "SET_THEME", payload: newTheme})
  }

  return (
    <View style={styles.container}>
      <View style={{
        flex:1,
        alignItems: 'center',
    justifyContent: 'center'}}>
        <Avatar.Text size={90} label={`${userInfo.firstName[0]}${userInfo.lastName[0]}`} />
        <Text variant="titleLarge">{`${userInfo.firstName} ${userInfo.lastName}`}</Text>
        <Text variant="titleSmall">@{userInfo.username}</Text>
      </View>
      <Card style={{width: '100%'}}>
        <List.Section>
          <List.Subheader>Preferences</List.Subheader>
          <List.Item title="Change Units" onPress={_handleUnitChange}/>
          <List.Item 
            title={`Change to ${themeType === 'light' ? 'Dark' : 'Light'} Mode`} 
            onPress={_handleChangeTheme}
          />
        </List.Section>
        <Divider />
        <List.Section>
          <List.Subheader>Account Details</List.Subheader>
          <List.Item title="Change Password" onPress={_handleChangePassword}/>
          <List.Item title="Delete Account" />
          <List.Item title="Log Out" onPress={_handleLogOut}/>
        </List.Section>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'top',
  },
  surface: {
    width:"100%",
    alignItems: 'center',
    justifyContent: 'top',
  }
});
