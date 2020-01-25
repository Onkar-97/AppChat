import React from 'react';
import { TextInput, StyleSheet, Text, View, TouchableHighlight,ImageBackground,
   ToastAndroid, } from 'react-native';
import { Actions } from 'react-native-router-flux';
import * as firebase from 'firebase';

export default class next extends React.Component {
  state={text:'',pass:''}
  // singupf(){
  //   ToastAndroid.show('Sign up successfully',ToastAndroid.SHORT);
  //   this.at=this.state.text.indexOf('@');
  //   var uid=this.state.text.substr(0,this.at);
  //   firebase.database().ref('Users/'+uid+'/').update({
  //     username:uid
  //   })
  // }
  componentDidMount(){
    const firebaseconfig={
    apiKey: "apikey",
    authDomain: "authDomain",
    databaseURL: "url",
    projectId: "Pid",
    storageBucket: "StorageBucket",
    
  };
 
  firebase.initializeApp(firebaseconfig);
  
  }
 
   onLogin = () => {
    this.textInput.clear()
      this.textInputP.clear()
    const { text, pass } = this.state
    firebase.auth().signInWithEmailAndPassword(text,pass)
      .then(() => Actions.loginss())
      .catch((e)=>console.log(e));
      
  }
   onSignup=()=>{
     Actions.rr();
   }
  // //   const { text, pass } = this.state
  // //  em= /\b[A-Za-z]+[A-Za-z0-9_]*@[A-Z0-9a-z]+[\.com|\.in]\b/;
  // //  if(!em.test(text)){
  // //   alert('Email is invalid');
  // //  // return false;
  // //   }
  // //   else{
  // //   firebase.auth().createUserWithEmailAndPassword(text,pass)
  // //   .then(() => this.singupf())
  // //   .catch((error)=>console.log('error'));
   
  // //   //firebase.database().ref().push('Users')
  // //   }
  // }
  render(){
    
    return (
      
      <ImageBackground source={require('../Images/back1.jpeg')} style={styles.container}>
        <Text style={styles.txt}>Welcome to AppChat</Text>
       <TextInput style={styles.input} 
       ref={input => { this.textInput = input }}
       underlineColorAndroid='rgba(0,0,0,0)' 
       placeholder='Email'
       onChangeText={(text) => this.setState({text})}
       value={this.state.text}
       />
       <TextInput secureTextEntry={true} style={styles.input} 
       ref={input => { this.textInputP = input }}
        underlineColorAndroid='rgba(0,0,0,0)' 
        placeholder='Password'
       onChangeText={(pass) => this.setState({pass})}
        value={this.state.pass} />
         <TouchableHighlight style={styles.button} onPress={this.onLogin}>
         <Text style={{color:'white'}}> Login </Text>
         
        </TouchableHighlight>
        <TouchableHighlight  style={styles.button}  onPress={this.onSignup} >
         <Text style={{color:'white'}}> signup </Text>
         
        </TouchableHighlight>
      </ImageBackground>
        );
      }}
      const styles = StyleSheet.create({
        container : {
         // backgroundColor:'#FFFFFF',
          flex: 1,
          alignItems:'center',
          justifyContent :'center',
          color:'white'

        },
        input: {
          width:300,
        //  backgroundColor:'rgba(255, 255,255,0.2)',
          borderRadius: 25,
          paddingHorizontal:16,
          fontStyle:'italic',
          fontSize:16,
          color:'white',
          borderWidth:1,
          borderColor:'white',
          marginVertical: 10
         
        },
        button: {
          alignItems: 'center',
          width:'100%',
          fontSize:30,
          fontStyle:'italic',
           borderRadius: 25,
            marginVertical: 10,
            paddingVertical: 13,
          
            color:'white',
            borderWidth:1,
            
            borderColor:'white',
        },      
        txt:{
          width:'100%',
          padding:20,
          fontSize:35,
          top:10,
          position:'absolute',
          textAlign:'center',
          fontStyle:'italic',
          //fontWeight:'italic',
          margin:10,
        }
      });