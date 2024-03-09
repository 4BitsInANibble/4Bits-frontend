import { useState } from 'react';
import React, {useEffect} from 'react-native';
import { View, StyleSheet, ViewContainer } from 'react-native';
import { Avatar, Text, Surface, Divider, Button, Card, List, TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios'
import Header from '../components/Header';

function LoginScreen({navigation}) {

    const [loginForm, setloginForm] = useState({
      username: "",
      password: ""
    })
    const dispatch = useDispatch();

    const logMeIn = () => {
      console.log("SIGNING IN")
      const data = {
        "username": loginForm.username,
        "password": loginForm.password
      }
      const baseUrl = process.env.EXPO_PUBLIC_FLASK_URL
      let AT;
      axios.patch(baseUrl+"/users/login", data)
        .then(resp => {
          console.log(resp.data.access_token);
          return resp
        })
        .then(resp => {
          AT=resp.data.access_token

          axios({method:"get", url:`${baseUrl}/users/${data["username"]}`, headers:{Authorization: "Bearer " + AT}})
            // .then(resp => console.log(resp))
            .then((resp) => dispatch({type: "SET_USER", payload: resp.data}))
            .catch(err => console.error(err))
          console.log(resp.data)
          dispatch({type: "SET_TOKENS", payload: {
            access: resp.data.access_token, 
            refresh: resp.data.refresh_token
          }}) ////// DO HTTP TOKEN THING LATER, TERRIBLE SECURITY 
            
        })
        .catch(err => {
          print("LOGIN FAILED")
          console.log(err)
        });
      console.log("LOGGED IN")
      console.log(JSON.stringify(AT))

      setloginForm(({
        username: "",
        password: ""}))

      navigation.pop();

      
    }

    const openRegister = () => {
      navigation.navigate("Register")
    }

    const handleUsername = (value) => { 
      setloginForm(prevNote => ({
          ...prevNote, username: value})
      )}
    
    const handlePassword = (value) => { 
      setloginForm(prevNote => ({
          ...prevNote, password: value})
      )}
      
    

    return (
      <>
        <Header navigation={navigation}/>
        <View>
          <View>
                <TextInput onChangeText={handleUsername}  // Fix change
                      type="email"
                      text={loginForm.username} 
                      name="username" 
                      placeholder="Username" 
                      value={loginForm.username} />
                <TextInput secureTextEntry={true} onChangeText={handlePassword} // Fix change
                      type="password"
                      text={loginForm.password} 
                      name="password" 
                      placeholder="Password" 
                      value={loginForm.password} />

          </View>
          <View>
            <Button mode='contained' onPress={logMeIn}>
              Submit
            </Button>
            <Button mode='contained' onPress={openRegister}>
              New User? Register!
            </Button>
            
          </View>
        </View>
      </>
    );
}

export default LoginScreen;