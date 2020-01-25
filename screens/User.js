import React from 'react';
import { Actions } from 'react-native-router-flux';
//import { TextInput, StyleSheet, Text, View, TouchableHighlight,
  //  ToastAndroid } from 'react-native';
   import { Linking,TextInput,StyleSheet, Text, View, TouchableOpacity, Button,Image ,WebView,FlatList} from 'react-native';
   import * as firebase from 'firebase';
   import {DocumentPicker, ImagePicker} from 'expo';

   


export default class User extends React.Component{

constructor(){
  super()

 this.state = {
    image: null,
    durl:'',
    docurl:null,
    list:[],
    uid:'',
    furl:'',
    cu:'',
    time:'',
    title:''
  };
}

  componentDidMount(){
    console.log('log in component mounted');
     var email=firebase.auth().currentUser.email;
     var uidd=email.substr(0,email.indexOf('@'));
  cu=uidd;
 //  var th=this.props.item;
   
   
   this.setState({cu});
   console.log('state:'+this.state.cu);  
 var ref = firebase.database().ref('blogimg/');  
 
 ref.on('value', (snapshot) => {
       var items = [];
       snapshot.forEach((child)=>{
         items.push({
           likes:child.val().likes,
           imagefb:child.val().imgurl,
           name:child.val().name,
           time:child.val().date,
           islike:child.val().alreadylike,
        });
 
       })
       console.log('log '+JSON.stringify(items));
 
     this.setState({ list: items});
     
   // console.log('aaastringifystringifyaaaaaaaaaaaaaaaaaaaaaaaaaa -->'+this.state.arrData);
 });
}
       



_pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    alert(result.uri);
    this.setState({docurl:result.uri})
    console.warn(result);
   
    this.uploaddoc(result.uri,this.state.time).then(()=>{
      alert('successful');
    }).catch((error)=>{
      alert(error);
    })
    console.log('sending SUCCESSFUL...');

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
    this.uploadImage(result.uri,this.state.time).then(()=>{
      alert('successful');
    }).catch((error)=>{
      alert(error);
    })
    console.log('sending SUCCESSFUL...');

  }
};
uploadImage = async(uri,name) => {
  console.log('sending...'+this.state.image);
  const response =  await fetch(uri);
  const blob =  await response.blob();
  var times=Date.now().toString();
  this.setState({time:times})
  var ref = firebase.storage().ref().child('photo/'+name);
  this.setState({furl:ref})
  return ref.put(blob);
} 


uploaddoc = async(uri,name) => {
  console.log('sending...'+uri);
  const response =  await fetch(uri);
  const blob =  await response.blob();
  var times=Date.now().toString();
  this.setState({time:times})
  var ref = firebase.storage().ref().child('photo/'+name);
  this.setState({furl:ref})
  return ref.put(blob);
} 

// title(){
// console.log(this.state.title);
// if(this.state.title!=null){
//   this.uploadImage.call();
// //  this.post.call(this);
// }
// else{
// alert('Title should not empty');
// }
// }

post(){
//  console.log('pick '+th);
 console.log('pick'+this.state.furl);
  var email=firebase.auth().currentUser.email;
 var cuu=email.substr(0,email.indexOf('@'));
  //this.setState({list:item})
 console.log('cu-->'+cuu);
 //var t=this.state.time;
 this.setState({uid:cuu})

   var rr=this.state.furl;
      //  let dec =decodeURI(rr);
        console.log('furl->'+rr);
  
        var t = this.state.time
   // var title=this.state.title;
    rr.getDownloadURL().then((url)=> {
      console.log('url: '+url)
    firebase.database().ref('blogimg/'+t).set({
      alreadylike:false,
        name:cuu,
        imgurl:url,
      likes:0,
      date:t
    })
   
console.log('urlllllllllllllllllllllll:=='+url)
alert('success doc '+url);
}).catch((error)=>this.deleteimg.bind(this,rr))
}
deleteimg=(rr)=>{
  //var rrr=this.state.furl;
alert('deleting...'+rr);
rr.delete().then(function() {
  // File deleted successfully
  alert('delet success...'+rr);
}).catch(function(error) {
  // Uh-oh, an error occurred!
  alert('delet fails '+rr);
});
}
load(url){
  console.log('comp : '+url);
  Actions.web({url});
 //Linking.openURL(url);
}

cards=({item})=>{
  //console.log('img'+item.img);
  return(
     //         <Image source={{uri:item}}style={{width:100,height:100,alignSelf:'flex-start'}} />
     <View
     style={styles.card}
   ><TouchableOpacity  onPress={this.load.bind(this,item.imagefb)} >
     <Image source={{uri:item.imagefb}} style={styles.cardImage} />
     </TouchableOpacity>
     <View>
       <Text style={styles.textLeft}>{item.name}</Text>
      
       <Text style={styles.textRightbtn}  onPress={this.likeimg.bind(this,item.likes,item.time,item.islike,item.likeby)}>
         <Text> like </Text>
        </Text>
        <Text style={styles.textleftbtn}  onPress={this.deletecopy.bind(this,item.time,item.name)}>
         <Text> delete </Text>
        </Text>


       <Text style={styles.textRight}>{item.likes}</Text>
     </View>
     
   </View>
  )}

render() {
      // let { image,docurl } = this.state;
      console.log('pickachu '+this.state.furl);
       return (
        <View style={styles.container}>
        

 <FlatList
    data={this.state.list}
    ItemSeparatorComponent={this.FlatListItemSeparator}
    // renderItem={({item}) => <Text style={styles.button} onPress={this.action.bind(this,item)}>
    //  {item} </Text>}
    renderItem={this.cards}
    />

 
 <Button
        title="Select Image"
        onPress={this._pickImage}
      />    
       <Button
        title="Select doc"
        onPress={this._pickDocument}
      />    
       <Button
        title="post"
        onPress={this.post.bind(this)}
      />   
      {/* <TextInput style={styles.input} placeholder={'Enter Massage Hear...'} placeholderTextColor={'white'} ref={input => { this.clrtxt = input }} multiline={true} autoCorrect={true} maxLength={255}
       onChangeText={(title) => this.setState({title})}
       value={this.state.title}/> */}
        </View>
      );
  
  }  

likeimg(likes,time,islike,likeby){
  if(islike==false){
  var count=likes;
  console.log('likes= '+count);
  count=count+1;
  firebase.database().ref('blogimg/'+time+'/').update({
  likes:count,
  alreadylike:true,
  likeby:this.state.cu,
})
 }
 if(islike==true){
   count=likes;
  console.log('likes= '+count);
  if(this.state.cu != likeby){
  count=count+1;
  firebase.database().ref('blogimg/'+time+'/').update({
  likes:count,
  alreadylike:true,
  likeby:this.state.cu,
  
})
 }
}
}
deletecopy(time,name){
  if(this.state.cu== name){
    firebase.database().ref('blogimg/'+time+'/').remove();
  }

}

}

  
  var styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    input: {
          
      width:'89%',
      //  backgroundColor:'rgba(255, 255,255,0.2)',
        borderRadius: 25,
        paddingHorizontal:16,
        fontSize:16,
        borderWidth:1,
        color:'#ffffff',
        marginVertical: 10,
      
     borderColor:'white'
    },

    card: {
      borderWidth: 3,
      borderRadius: 3,
      borderColor: '#000',
      width: 300,
      height: 300,
      padding: 5
    },
    cardImage: {
      height: 260,
    },
    textLeft: {
      position: 'absolute',
      left:0,
      top:0
    },
    textRight: {
      position: 'absolute',
      right: 0,
      top: 0
    },
    textRightbtn: {
      position: 'absolute',
      right: 18,
      top: 0
    },
    textleftbtn: {
      position: 'absolute',
      left:100,
      top:0
    },
    
  });










//   return (
    

    
//     // <View style={styles.container}>
  
//     //   <Button
//     //     title="Select Document"
//     //     onPress={this._pickDocument}
//     //   />{docurl&&  
//     //   <WebView source={{uri:docurl}}style={{width: 500, height: 400,borderColor:'black'}}> </WebView>     
//     //   }

//     // <View style={{ 'marginTop': 20}}>
//     //   <Button
//     //     title="Select Image"
//     //     onPress={this._pickImage}
//     //   />
//     //   {image &&
//     //     <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
//     // </View>
//     // </View>
//   );
// }
// }

// const styles = StyleSheet.create({
// container: {
//   height:'70%',
//   flex: 1,
//   backgroundColor: '#fff',
//   alignItems: 'center',
//   justifyContent: 'center',
// },
// });






   
// //   render(){
// //     return (
      
// //       <View style={styles.container}>
// //         <Text style={styles.welcome}>Add user</Text>
// //         <input type="file"/>
// //         <TextInput style={styles.textip}
// //             placeholder='Enter User Name'
// //             placeholderTextColor = "black"
// //                        value={'uid'}>
// //                </TextInput>
// //         <TouchableHighlight style={styles.button} onPress={this.users}>
// //         <Text>Add To inbox</Text></TouchableHighlight>
// //           </View>
// //     );}}
    
// // const styles = StyleSheet.create({
// //          container : {
// //           //backgroundColor:'#455a64',
// //           flex: 1,
// //           alignItems:'center',
// //           justifyContent :'center'
// //         },
// //         welcome: {
// //             fontSize: 20,
// //             textAlign: 'center',
// //             margin: 10,
// //           },
// //           button: {
            
// //             alignItems: 'center',
// //            // backgroundColor: '#ec7063',
// //            paddingVertical:20,
// //             padding: 10
// //           }, 
// //           textip:{     
// //           width:300,
// //               // backgroundColor:'rgba(255, 255,255,0.2)',  
// //               borderRadius: 25,
// //               paddingHorizontal:16,
// //               fontSize:16,
// //               color:'black',
// //               marginVertical: 10
// // },
// //     });
