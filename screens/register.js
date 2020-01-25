import React from 'react';
import { TextInput, StyleSheet, Text, View, TouchableHighlight,ImageBackground,Button,
   ToastAndroid, } from 'react-native';
import { Actions } from 'react-native-router-flux';
import * as firebase from 'firebase';

export default class register extends React.Component {
    state={text:String,pass:String,mob:Number,name:String}

    singupf(){
        ToastAndroid.show('Sign up successfully',ToastAndroid.SHORT);
        this.at=this.state.text.indexOf('@');
        var uid=this.state.text.substr(0,this.at);
        firebase.database().ref('Users/'+uid+'/').update({
          username:uid
        })
        firebase.database().ref('Signup/'+uid+'/').update({
            username:uid,
            Name:this.state.name,
            Mobile:this.state.mob,
            Name:this.state.name

          })
          ToastAndroid.show('Sign up successfully',ToastAndroid.SHORT);
          Actions.pop();
      }
    Val=(text,mob,pass,name)=>{
        var nam=/\b[A-z]{2}[A-z]*/;
       var mo= /^[0-9]{1}[0-9]{9}$/;
       var em= /\b[A-Za-z]+[A-Za-z0-9_]*@[A-Z0-9a-z]+[\.com|\.in]\b/;
       var pas=/\b[A-z0-9]{6}[A-z]*/;
       if(!nam.test(name)){
        alert('Name is invalid');
        return false;
        }
        if(!mo.test(mob)){
            alert('Mobile number  is invalid');
           return false;
            }
          if(!em.test(text)){
           alert('Email is invalid');
           return false;
           }
           if(!pas.test(pass)){
            alert('Password is invalid');
            return false;
            }
            firebase.auth().createUserWithEmailAndPassword(text,pass)
         .then(() => this.singupf())
         .catch((error)=>console.log('error'));
    }
    render(){
        
    
        return (
            <ImageBackground source={require('../Images/back1.jpeg')} style={styles.container}>
             <TextInput style={styles.input} 
       ref={input => { this.textInput = input }}
       underlineColorAndroid='rgba(0,0,0,0)' 
       placeholder='Name'
       onChangeText={(name) => this.setState({name})}
       value={this.state.name}
       />
       <TextInput style={styles.input} 
       ref={input => { this.textInput = input }}
       keyboardType = 'numeric'
       underlineColorAndroid='rgba(0,0,0,0)' 
       placeholder='Mobile Number'
       onChangeText={(mob) => this.setState({mob})}
       value={this.state.mob}
       />
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
<TouchableHighlight  style={styles.button}  onPress={this.Val.bind(this,this.state.text,this.state.mob,this.state.pass,this.state.name)} >
         <Text style={{color:'white'}}> signup </Text>
         
        </TouchableHighlight>
            </ImageBackground>
        )    
    }
    
    
}
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
});
