import { useState } from 'react';
import React, {useEffect} from 'react-native';
import { View, StyleSheet, ViewContainer } from 'react-native';
import { Avatar, Text, Surface, Divider, Button, Card, List, TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios'

function Login(props) {

    const [loginForm, setloginForm] = useState({
      email: "",
      password: ""
    })

    function logMeIn(event) {
      axios({
        method: "POST",
        url:"/token",
        data:{
          email: loginForm.email,
          password: loginForm.password
         }
      })
      .then((response) => {
        props.setToken(response.data.access_token)
      }).catch((error) => {
        if (error.response) {
          console.log(error.response)
          console.log(error.response.status)
          console.log(error.response.headers)
          }
      })

      setloginForm(({
        email: "",
        password: ""}))

      event.preventDefault()
    }

    function handleChange(event) { 
      const {value, name} = event.target
      setloginForm(prevNote => ({
          ...prevNote, [name]: value})
      )}

    return (
      <View>
        <Text>Login</Text>
          <ViewContainer className="login">
            <TextInput onChange={handleChange} 
                  type="email"
                  text={loginForm.email} 
                  name="email" 
                  placeholder="Email" 
                  value={loginForm.email} />
            <TextInput onChange={handleChange} 
                  type="password"
                  text={loginForm.password} 
                  name="password" 
                  placeholder="Password" 
                  value={loginForm.password} />

          <Button onClick={logMeIn}>Submit</Button>
        </ViewContainer>
      </View>
    );
}

export default Login;