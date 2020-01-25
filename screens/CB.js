
import React from 'react';
import { Actions } from 'react-native-router-flux';
import { TextInput, StyleSheet, Text, ImageBackground,
   ToastAndroid} from 'react-native';

   export default class CB extends React.Component{

  componentWillMount(){
  
    setTimeout(()=>{
      //console.log('in timer');
      Actions.nextt();
     },2000);
    
   }

   render(){
     return(
       <ImageBackground source={require('../Images/back1.jpeg')}style={styles.container}>
         <Text style={styles.txt}>AppChat</Text>

       </ImageBackground>
     );
   }
 
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems:'center',
      justifyContent :'center'
    },
    txt:{
      color:'white',
      justifyContent:'center', 
      fontSize:35,
      textAlign:'center',
      fontStyle:'italic',
    }
  });
  