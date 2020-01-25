import React from 'react';
import { TextInput, StyleSheet, Text, View, TouchableHighlight, FlatList,ScrollView,TouchableOpacity,
   ToastAndroid,Alert,ImageBackground } from 'react-native';
   import * as firebase from 'firebase';
   
import {Actions} from 'react-native-router-flux';

export default class Inbox extends React.Component{
state={ccc:[]}

componentDidMount(){
    var email =firebase.auth().currentUser.email;
   
    //email=email.substr(0,email.indexOf('@')); 
    console.log(email)
  
    firebase.database().ref('Users/').once('value',(data) =>{
      usr=data.val()
       ccc=Object.keys(usr);
       key=this.state.ccc.key;
        this.setState({ccc})
  })

  
  
}

inboxchk =({item})=>{
  var email=firebase.auth().currentUser.email;
  var uid=email.substr(0,email.indexOf('@'));
if(item!= uid){
return <Text style={styles.button} onPress={this.action.bind(this,item)}>
  {item} </Text>

}
}


FlatListItemSeparator = () => {
  return (
    <View
      style={{
        height: 1,
        width: "100%",
       // backgroundColor: "#607D8B",
      }}
    />
  );
}


render() {
 
  return(
    <ImageBackground  source={require('../Images/back1.jpeg')} style={styles.container}>
    <FlatList
    data={this.state.ccc}
    ItemSeparatorComponent={this.FlatListItemSeparator}
    // renderItem={({item}) => <Text style={styles.button} onPress={this.action.bind(this,item)}>
    //  {item} </Text>}
    renderItem={this.inboxchk}
    />
      </ImageBackground>
  )
 
}

 action(item){
  console.log(item);
  Actions.chat({item});
  
  }
}
        
const styles = StyleSheet.create({
  container : {
  //  backgroundColor:'#bc5353',
    flex: 1,
    alignItems:'center',
    justifyContent :'center'
  },
            welcome: {
               // backgroundColor:'#ec7063',
                fontSize: 20,
                textAlign: 'center',
                margin: 10,
              },
              button: {
                fontSize:22,
                paddingTop:8,
                paddingLeft:5,
            textAlign:'left',
             borderColor:'white',
             borderWidth:1,
             
             //marginLeft:4,
             color:'white',
            alignItems:'flex-start',
            width:300,
           // backgroundColor:'#d16666',
            borderRadius: 25,
            marginVertical: 10,
            paddingVertical: 13
              }, 
              itemm: {
                padding: 10,
                fontSize: 18,
                height: 44,
              },
              
        });