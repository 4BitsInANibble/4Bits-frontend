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
    const baseUrl = "https://4bits.pythonanywhere.com"
    console.log(baseUrl+"/users/login")
    console.log(JSON.stringify(process))
    axios.patch(baseUrl+"/users/login", data)
      // .then(resp => console.log(resp))
      .catch(err => console.log(err));
    axios.get(baseUrl+`/users/${data["username"]}`)
      // .then(resp => console.log(resp))
      .then((resp) => dispatch({type: "SET_USER", payload: resp.data}))
      .catch(err => console.error(err))
    

  }
  
  if (Object.keys(userInfo).length == 0) {
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
    }    
    const baseUrl = "https://4bits.pythonanywhere.com";
    axios.patch(baseUrl+`/users/${data["username"]}/logout`, data)
      .then(dispatch({type: "SET_USER", payload: {}}))
      .catch(err => console.error(err));
    console.log(JSON.stringify(userInfo));
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
        {/* <Avatar.Text size={90} label={`${userInfo.firstName[0]}${userInfo.lastName[0]}`} /> */}
        <Text variant="titleLarge">{`${userInfo.Name}`}</Text>
        <Text variant="titleSmall">@{userInfo.Username}</Text>
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
