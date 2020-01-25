import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,ImageBackground
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import * as firebase from 'firebase';
import {ImagePicker} from 'expo';

export default class logins extends Component {
 state={
   cu:'',
   image:'',
   time:'',
   furl:'',
   purl:'',
 }
 componentDidMount(){
  // this.setState({purl:'https://www.vidhyaa.in/public/uploads/images/slider/5aed73a9493da68.png'})
  var email=firebase.auth().currentUser.email;
  var uidd=email.substr(0,email.indexOf('@'));
  this.setState({cu:uidd})
  var ref = firebase.database().ref('myimage/'+uidd);  
 
 ref.on('value', (snapshot) => {

  var obj=snapshot.val();
  if(obj!=null){
  var name=obj.imgurl;
  this.setState({purl:name})
  
  alert(name);
  }
       //alert('log '+JSON.stringify(items));
 
     //this.setState({ list: items});
     //alert('log2 :'+items.imagefb)
})
 }
 
  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });
  
    alert(result.uri);
    console.log(result)
  
  
    if (!result.cancelled) {
     
      this.setState({ image: result.uri });
      this.uploadImage(result.uri).then(()=>{
        alert('successful');
      }).catch((error)=>{
        alert(error);
      })
     // this.profileupload.call();
     
      console.log('sending SUCCESSFUL...');
  
    }
  };
  uploadImage = async(uri) => {
    console.log('sending...'+this.state.image);
    const response =  await fetch(uri);
    const blob =  await response.blob();
    var times=Date.now().toString();
    this.setState({time:times})
    var ref = firebase.storage().ref().child('profile/'+this.state.cu);
    this.setState({furl:ref})
    alert('furl: '+this.state.furl);
    return ref.put(blob);
  } 
  
  signOutUser = async () => {
    try {
        await firebase.auth().signOut();
        Actions.pop();
    } catch (e) {
        console.log(e);
    }
}

profileupload=()=>{
  alert('furl is  :'+this.state.furl);
  var rr=this.state.furl;
  rr.getDownloadURL().then((url)=> {
    console.log('url: '+url)
  firebase.database().ref('myimage/'+this.state.cu).set({
      name:this.state.cu,
      imgurl:url,
  })
})
}


  render() {
    return (
      <ImageBackground style={styles.header} source={require('../Images/back1.jpeg')}>
          {/* <View style={styles.header}></View> */}
          
          <Image style={styles.avatar} source={{uri:this.state.purl}}/>
          <Text style={styles.text}>{this.state.cu}</Text>
          {/* <View style={styles.body}>
            <View style={styles.bodyContent}> */}
            
              <TouchableOpacity style={styles.pick} onPress={this._pickImage}>
                <Text>pick a profile</Text>  
              </TouchableOpacity>     
              <TouchableOpacity style={styles.set} onPress={this.profileupload}>
                <Text>set a profile pic</Text> 
              </TouchableOpacity>         
              <TouchableOpacity style={styles.logout} onPress={this.signOutUser}>
                <Text>Logout</Text> 
              </TouchableOpacity>
            {/* </View>
        </View> */}
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  text:{
    textAlign:'center',
    fontSize:30,
   color:'white'

  },
  header:{
   // backgroundColor: "#00BFFF",
  //  height:200,
   // width:'100%'
   width:'100%',
   height:'100%',
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:130
  },
  name:{
    fontSize:22,
    color:"#FFFFFF",
    fontWeight:'600',
  },
  body:{
    marginTop:40,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding:30,
  },
  name:{
    fontSize:28,
    color: "#696969",
    fontWeight: "600"
  },
  info:{
    fontSize:16,
    color: "#00BFFF",
    marginTop:10
  },
  description:{
    fontSize:16,
    color: "#696969",
    marginTop:10,
    textAlign: 'center'
  },
  pick: {
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
    backgroundColor: "#00BFFF",
    bottom:'30%',
    right:'25%',
    position:'absolute'

  },
  set: {
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
    backgroundColor: "#00BFFF",
    alignSelf:'flex-end',
    bottom:'20%',
    right:'25%',
    position:'absolute'
  },
  logout: {
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
    backgroundColor: "#00BFFF",
    alignSelf:'flex-end',
    bottom:'10%',
    right:'25%',
    position:'absolute'
  },
});
 