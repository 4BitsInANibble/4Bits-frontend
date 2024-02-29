import { useState } from 'react';
import React, {useEffect} from 'react-native';
import { View, StyleSheet, ViewContainer } from 'react-native';
import { Avatar, Text, Surface, Divider, Button, Card, List, TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios'

function Login({navigation}) {

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
          AT=resp.data.access_token
          axios.get(baseUrl+`/users/${data["username"]}`, headers={Authorization: AT})
            // .then(resp => console.log(resp))
            .then((resp) => dispatch({type: "SET_USER", payload: resp.data}))
            .catch(err => console.error(err))
          console.log("GOT USER INFO")
          dispatch({type: "SET_TOKENS", payload: {
            access: resp.data.access_token, 
            refresh: resp.data.refresh_token
          }}) ////// DO HTTP TOKEN THING LATER, TERRIBLE SECURITY 
            
        })
        .catch(err => console.log(err));
      console.log("LOGGED IN")
      console.log(JSON.stringify(AT))

      setloginForm(({
        username: "",
        password: ""}))

      navigation.pop();

      
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
      <View>
        <View>
          <Text>Login</Text>
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
        </View>
      </View>
    );
}

export default Login;