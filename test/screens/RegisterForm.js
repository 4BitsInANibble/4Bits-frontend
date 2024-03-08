import { useState } from 'react';
import React, {useEffect} from 'react-native';
import { View, StyleSheet, ViewContainer } from 'react-native';
import { Avatar, Text, Surface, Divider, Button, Card, List, TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios'
import Header from '../components/Header';

function RegisterScreen({navigation}) {

    const [registerForm, setRegisterForm] = useState({
      name: "",
      username: "",
      password: ""
    })
    const dispatch = useDispatch();

    const registerUser = () => {
      console.log("SIGNING IN")
      const data = {
        "name": registerForm.name,
        "username": registerForm.username,
        "password": registerForm.password
      }
      const baseUrl = process.env.EXPO_PUBLIC_FLASK_URL
      let AT;
      axios.post(baseUrl+"/users", data)
        .then(resp => {
          AT=resp.data.access_token
          console.log(`AT: ${AT}`)
          axios.get(baseUrl+`/users/${data["username"]}`, headers={Authorization: `Bearer ${AT}`})
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
      console.log(baseUrl+"/users")

      setRegisterForm(({
        name: "",
        username: "",
        password: ""}))

      navigation.pop(2);

      
    }

    const openRegister = () => {
      navigation.navigate("Register")
    }

    const handleName = (value) => { 
      setRegisterForm(prevNote => ({
          ...prevNote, name: value})
      )}
    
    const handleUsername = (value) => { 
      setRegisterForm(prevNote => ({
          ...prevNote, username: value})
      )}
    
    const handlePassword = (value) => { 
      setRegisterForm(prevNote => ({
          ...prevNote, password: value})
      )}
      
    

    return (
      <>
        <Header navigation={navigation}/>
        <View>
          <View>
                <TextInput onChangeText={handleName}  // Fix change
                      type="name"
                      text={registerForm.name} 
                      name="name" 
                      placeholder="Name" 
                      value={registerForm.name} />
                <TextInput onChangeText={handleUsername}  // Fix change
                      type="email"
                      text={registerForm.username} 
                      name="username" 
                      placeholder="Username" 
                      value={registerForm.username} />
                <TextInput secureTextEntry={true} onChangeText={handlePassword} // Fix change
                      type="password"
                      text={registerForm.password} 
                      name="password" 
                      placeholder="Password" 
                      value={registerForm.password} />

          </View>
          <View>
            <Button mode='contained' onPress={registerUser}>
              Register
            </Button>
            
          </View>
        </View>
      </>
    );
}

export default RegisterScreen;