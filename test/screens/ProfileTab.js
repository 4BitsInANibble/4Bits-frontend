import React, {useState, useEffect} from 'react';
import { View, StyleSheet } from 'react-native';
import { Avatar, Text, Surface, Divider, Button, Card, List } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios'

export default function ProfileTab({navigation}) {
  const userInfo = useSelector((state) => state.user);
  const themeType = useSelector((state) => state.utils.themeType);
  const dispatch = useDispatch()
  const tokenInfo = useSelector((state) => state.tokens)
  // DO THE HTTP COOKIE INSTEAD

  useEffect(() => {
    console.log(userInfo);
  }, [userInfo])

  
  const _handleLogin = () => navigation.navigate("Login");
  
  if (Object.keys(userInfo).length == 0) {
    return (
      <View style={styles.container}>
        <Text />
        <Avatar.Icon size={90} icon="account" />
        <Button onPress={_handleLogin}>
          Sign In
        </Button>
      </View>
    )
  }

  const _handleUnitChange = () => navigation.navigate("Change-Units");
  const _handleChangePassword = () => console.log("Changing Password");
  const _handleLogOut = () => {
    const data = {
      "username": userInfo["Username"],
    }    
    const baseUrl = process.env.EXPO_PUBLIC_FLASK_URL;
    console.log(`Bearer ${tokenInfo.access}`);
    axios.patch(baseUrl+`/users/${data["username"]}/logout`, data, {headers:{Authorization: `Bearer ${tokenInfo.access}`}})
      .then(() => {
        dispatch({type: "SET_USER", payload: {}})
        dispatch({type: "SET_TOKEN", payload: {access: "", refresh: ""}})
      })
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
