import React from 'react';
import { Actions } from 'react-native-router-flux';
import {WebView,Picker,TouchableOpacity,TextInput, StyleSheet, Text, View, TouchableHighlight,
  FlatList,KeyboardAvoidingView,ImageBackground, ActivityIndicator,
   ToastAndroid,Button,Image} from 'react-native';
   import * as firebase from 'firebase';
   import {DocumentPicker, ImagePicker} from 'expo';
  
 export default class Chatting extends React.Component{
  constructor(){
    super();
    
 this.state={
   isdoc:false,
  PickerSelectedVal : '',
  docurl:'',
  image: null,
  imageurll:undefined,
   R:0,
      ppp:[],
      tousr:[],
      fff:[],
      mgm:[],
  masg:null,
  uidkey:'',
  kkk:'',
  cu:'',
  messages:[],
  keyss:[],
  furl:'',
  arrData:[],
  ccc:[],
  loading:false
  }
}
  componentDidMount(){
   // setTimeout(() => this.refs.flatList.scrollToEnd(), 200)
   // console.log('url-->'+urlimg);
  if(this.state.PickerSelectedVal!='def')
    //setTimeout(() => {
      this.setState({
        PickerSelectedVal: 'def'
      });
    //}, 5000);
  
    var email=firebase.auth().currentUser.email;
    var uid=email.substr(0,email.indexOf('@'));
  cu=uid;
  var th=this.props.item;
  
  //console.log('state:'+this.state.imagess);
  this.setState({cu});
    uidkey=firebase.database().ref('Users/'+uid).push().key;
    kkk=firebase.database().ref('Users/'+th).push().key;
    this.setState({uidkey});
    this.setState({kkk});
var ref = firebase.database().ref("Users/"+th);  
ref.on('value', (snapshot) => {
      var items = [];
      snapshot.forEach((child)=>{
        items.push({
          chat: child.val().chat,
          To: child.val().To,
          from:child.val().from,
          imagefb:child.val().imgurl,
          mykey:child.val().mykey,
          tokey:child.val().tokey,
          isdoc:child.val().isdoc,
       });

      })

    this.setState({ arrData: items});
});

      
    
      }

   FlatListItemSeparator = () => {
    let { image } = this.state;
    return (
      <View 
      
         style={{
         //  margin:5,
         // alignItems:'flex-end',
           height: 0.25,
        //   width: "100%",
           
        backgroundColor: "#607D8B",
          
         }}
      ></View>
    );
 }
    
sendttch(user){
    var th=this.props.item;

    var email=firebase.auth().currentUser.email;
    var uid=email.substr(0,email.indexOf('@'));
      uidkey=firebase.database().ref('Users/'+uid).push().key;
      kkk=firebase.database().ref('Users/'+th).push().key;
      this.setState({uidkey});
      this.setState({kkk});
  
      //this.setState({ccc})
      var kk =this.state.keyss.length;
      console.log('KKKKKKEEEEEEEEEEYYYYYYYYYYlen----->'+kk);
   var myid=this.state.uidkey;
  
   var kkkk=this.state.kkk;
  
    var rr=this.state.furl;
    alert(rr);
    rr.getDownloadURL().then((url)=>{
     firebase.database().ref('Users/'+user+'/'+kkkk).set({
       imgurl:url,
       mykey:myid,
       from:uid,
       To:user,
       tokey:kkkk,
       time:Date.now(),
       isdoc:this.state.isdoc
     })
     firebase.database().ref('Users/'+uid+'/'+myid).set({
      imgurl:url,
      mykey:kkkk,
      from:uid,
      To:user,
      tokey:myid,
      time:Date.now(),
      isdoc:this.state.isdoc
    })
    }).catch((error)=>{
      alert('error');
      this.deleteimg.bind(this,rr)
    })
//  }

  ToastAndroid.show('Massage sending...',ToastAndroid.SHORT);
  this.setState({image:null})
}

  sendfun(masg,user){
    if(masg==null  && this.state.image==null) {
      alert('empty massage');
      return;
    }
  
    this.clrtxt.clear();
    var th=this.props.item;

  var email=firebase.auth().currentUser.email;
  var uid=email.substr(0,email.indexOf('@'));
    uidkey=firebase.database().ref('Users/'+uid).push().key;
    kkk=firebase.database().ref('Users/'+th).push().key;
    this.setState({uidkey});
    this.setState({kkk});

    //this.setState({ccc})
    var kk =this.state.keyss.length;
    console.log('KKKKKKEEEEEEEEEEYYYYYYYYYYlen----->'+kk);
 var myid=this.state.uidkey;

 var kkkk=this.state.kkk;

  firebase.database().ref('Users/'+user+'/'+kkkk).set({
   // imgurl:' ',
    mykey:kkkk,
    chat:masg,
    from:uid,
    To:user,
    tokey:uidkey,
    time:Date.now(),
  
   // time:firebase.database.ServerValue.TIMESTAMP,
  }).then(
    console.log('Inserted')
  ).catch((error)=>{
  console.log(error)
  });
   firebase.database().ref('Users/'+uid+'/'+myid).set({
     //imgurl:' ',
    tokey:kkk,
    chat:masg,
    from:uid,
    To:user,
    mykey:myid,
    time:Date.now(),
   // time:firebase.database.ServerValue.TIMESTAMP,
  }).then(
    console.log('Inserted')
  ).catch((error)=>{
    console.log(error)
  }
  );

    ToastAndroid.show('Massage sending...',ToastAndroid.SHORT);
    
  masg=null;
  this.setState({image:null})
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



  chatloop=({item})=>{
    console.log('imageloop:',item.imagefb)

  // console.log('chatloop:'+this.props.item,item.chat);


if(item.imagefb!=undefined){

  if(item.from==cu   && item.To!='Broadcast' && item.isdoc==false)
  return<Image source={{uri:item.imagefb}} style={{width:100,height:100,alignSelf:'flex-start'}}></Image>
  else if(item.To==cu && item.To!='Broadcast'  && item.isdoc==false)
  return<Image source={{uri:item.imagefb}}  style={{width:100,height:100,alignSelf:'flex-end'}}></Image>
 if(item.To=='Broadcast' && item.from!=cu  && item.isdoc==false){
   console.log('in image ');
  return<Image source={{uri:item.imagefb}} style={{width:100,height:100,alignSelf:'flex-start'}}></Image>
 }
else if(item.To=='Broadcast' && item.from==cu  && item.isdoc==false){
  console.log('in image ');
  return<Image source={{uri:item.imagefb}} style={{width:100,height:100,alignSelf:'flex-end'}}></Image>
}

//For Docs:

if(item.from==cu   && item.To!='Broadcast'  && item.isdoc==true)
  return(
    <TouchableOpacity onPress={this.load.bind(this,item.imagefb)}>
  <Image
  source={{
    uri: item.imagefb
  }}
  style={{ width:120,height:120,alignSelf:'flex-start' }}
// injectedJavaScript={`const meta = document.createElement('meta'); meta.setAttribute('content', 'width=width, initial-scale=0.5, maximum-scale=0.5, user-scalable=2.0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); `}
 // scalesPageToFit={false}
 // onLoadEnd={this._onLoadEnd}
></Image>
</TouchableOpacity>
  );
  //<WebView source={{uri:item.imagefb}} style={{width:100,height:100,alignSelf:'flex-start'}}></WebView>
else if(item.To==cu && item.To!='Broadcast' && item.isdoc==true)
return(
  <TouchableOpacity onPress={this.load.bind(this,item.imagefb)}>
<Image
source={{
  uri: item.imagefb
}}
style={{ width:120,height:120,alignSelf:'flex-end' }}
></Image>
</TouchableOpacity>
);
  
  // <Image source={{uri:item.imagefb}}  style={{width:100,height:100,alignSelf:'flex-end'}}></Image>
 if(item.To=='Broadcast' && item.from!=cu){
   console.log('in image ');
   return(
    <TouchableOpacity onPress={this.load.bind(this,item.imagefb)}>
  <Image
  source={{
    uri: item.imagefb
  }}
  style={{ width:120,height:120,alignSelf:'flex-start' }}
></Image>
</TouchableOpacity>
  );
  //<Image source={{uri:item.imagefb}} style={{width:100,height:100,alignSelf:'flex-start'}}></Image>
 }

else if(item.To=='Broadcast' && item.from==cu && item.isdoc==true){
  console.log('in image ');
  //return<Image source={{uri:item.imagefb}} style={{width:100,height:100,alignSelf:'flex-end'}}></Image>
  return(
    <TouchableOpacity onPress={this.load.bind(this,item.imagefb)}>
  <Image
  source={{
    uri: item.imagefb
  }}
  style={{ width:120,height:120,alignSelf:'flex-end' }}
></Image>
</TouchableOpacity>
  );

}
}


//else:
if(item.imagefb==undefined){
if(this.props.item=='Broadcast' && item.from!=cu){
  //console.log('in if broad');
  return(
    <Text style={styles.leftchat}>
    {item.chat} -{item.from}</Text>
 );
}
//console.log('chatloop:'+this.props.item,item.chat);
if(this.props.item=='Broadcast' && item.from==cu){
  //console.log('in if broad');
  return(
    <Text style={styles.rightchat}>
    {item.chat} -{item.from}</Text>
 );
}
  


    if(item.from==cu  && this.props.item!='Broadcast'){
   return<Text style={styles.leftbutton}onLongPress={this.deletemsg.bind(this,item.from,item.mykey,item.tokey,item.To)}>
     {item.chat}</Text>
}
  else if(item.To==cu  && this.props.item!='Broadcast'){
    return<Text style={styles.rightbutton} >
     {item.chat}</Text>
}
}
  }

load=(url)=>{
  console.log('comp : '+url);
  Actions.web({url});

}
deletemsg=(from,mykey,tokey,to)=>{
  if(from==this.state.cu){
    console.log('to ,mykey'+to,mykey);
    firebase.database().ref('Users/'+to+'/'+mykey).remove()
    firebase.database().ref('Users/'+this.state.cu+'/'+tokey).remove()
    console.log('to ,mykey'+this.state.cu,tokey);
    alert('massage deleted');
  }

}
  render(){
    let { image } = this.state;
    return (
      
      <ImageBackground source={require('../Images/back1.jpeg')}  style={styles.container}>
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <Text style={styles.usershead}>{this.props.item}</Text>
        
        <FlatList 
        ref="flatlist"
        
    data={this.state.arrData}
  
    renderItem={this.chatloop.bind(this)}
  // ItemSeparatorComponent={this.FlatListItemSeparator}
  // renderItem={(item)=>{
  //   <Text style={styles.leftchat}>{item.chat} --from {item.from}</Text>
  // }}     
    />
      <TextInput style={styles.input} placeholder={'Enter Massage Hear...'} placeholderTextColor={'white'} ref={input => { this.clrtxt = input }} multiline={true} autoCorrect={true} maxLength={255}
       onChangeText={(masg) => this.setState({masg})}
       value={this.state.masg}/>
        

<TouchableHighlight style={styles.sendbtn} onPress={this.sendfun.bind(this,this.state.masg,this.props.item)} >
  <Text >Send</Text>
     </TouchableHighlight>
         {/* <Button
        title="Attachment select"
        onPress={this.togglepicker}
      /> */}

          <Picker 
           selectedValue={this.state.PickerSelectedVal}
           onValueChange={this.togglepicker} >
           <Picker.Item label='Send Image or Doc' value='def'/>
   <Picker.Item label='Image' value='Image' />
   <Picker.Item label='Doc' value='Doc' />
   </Picker> 
        <Button
        title="send Attachment"
        onPress={this.sendttch.bind(this,this.props.item)}
      /> 
   
    

          
          </KeyboardAvoidingView> 
      </ImageBackground>   
      
      
        );
      
      }
      _pickImage = async () => {
        this.setState({isdoc:false})
        let result = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          aspect: [4, 3],
        });
      
        alert(result.uri);
        console.log(result)

      
        if (!result.cancelled) {
         
          this.setState({ image: result.uri });
         // this.uploadImage.call();
          
         this.uploadImage(result.uri,this.state.time).then(()=>{
          alert('successful');
        }).catch((error)=>{
          alert(error);
        })
         console.log('sending SUCCESSFUL...');

        }
      };
      
      uploadImage = async() => {
        this.setState({furl:''})
        console.log('sending...'+this.state.image);
        const response =  await fetch(this.state.image);
        const blob =  await response.blob();
       
        var times=Date.now().toString();
        this.setState({time:times})
       // var ref = firebase.storage().ref().child('photo/'+name);
         var ref = firebase.storage().ref().child('images/'+this.state.cu+'/'+times);
         alert(ref);
        this.setState({furl:ref})
        console.log('this is furl: '+this.state.furl);
        alert('this is furl: '+this.state.furl)
        return ref.put(blob);
      //  this.Activity.call();  
    } 
    _pickDocument = async () => {
      this.setState({isdoc:true})
      let result = await DocumentPicker.getDocumentAsync({});
      alert(result.uri);
      this.setState({docurl:result.uri})
      console.warn(result);
    //  this.setState({loading:true})
      this.uploaddoc(result.uri,this.state.time).then(()=>{ 
        alert('successful');
      //  this.setState({loading:false})
      }).catch((error)=>{
        alert(error);
      })
    //  this.setState({loading:false})
      console.log('sending SUCCESSFUL...');
  
    }
  // Activity(){
  //       return (
  //         <View  style={styles.card}>
  //            <ActivityIndicator
  //               //animating = {animating}
  //               color = '#bc2b78'
  //               size = "large"
  //               style = {styles.activityIndicator}/>
  //     </View>
  //       );
  // }
  togglepicker=(itemval)=>{
    this.setState({PickerSelectedVal:itemval})
    console.log(itemval);
   // this.setState({PickerSelectedVal:'def'})
    console.log('logg:'+itemval);
    if(itemval=='Image'){
      itemval='def'
      
      this._pickImage.call();
      //this.sendttch.call();
     // this.handleChangeOption.call()
      
    }
    else
    this._pickDocument.call();

  }

  uploaddoc = async() => {
    this.setState({furl:''})
    console.log('sending...'+this.state.docurl);
    const response =  await fetch(this.state.docurl);
    const blob =  await response.blob();
    var times=Date.now().toString();
    this.setState({time:times})
   // var ref = firebase.storage().ref().child('photo/'+name);
     var ref = firebase.storage().ref().child('images/'+this.state.cu+'/'+times);
     alert(ref);
    this.setState({furl:ref})
    console.log('this is furl: '+this.state.furl);
    alert('this is furl: '+this.state.furl)
    return ref.put(blob);  
} 


    }  

    
    
const styles = StyleSheet.create({
         container : {
      //  backgroundColor:'transparent',
          flex: 1,
          //margin:2,
        width:'100%',
        height:'100%',
 justifyContent :'center'
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
        txt:{
          width:500,
          padding:2,
          fontSize:20,
          textAlign:'center',
          margin:10,
        },
        cardImage: {
          height: 50,
        },
          usershead:{
            color:'white',
            fontSize:22,
            textAlign: 'center',
          },
          leftbutton: {
            fontSize:22,
                paddingTop:8,
                paddingLeft:5,
            textAlign:'left',
             borderColor:'white',
             borderWidth:1,
             
             //marginLeft:4,
             color:'white',
            alignSelf:'flex-start',
            width:90+'%',
           // backgroundColor:'#d16666',
            borderRadius: 15,
            marginVertical: 5,
            paddingVertical: 5,
          }, 
          rightbutton: {
            fontSize:22,
                paddingTop:8,
                paddingLeft:5,
            textAlign:'right',
             borderColor:'white',
             borderWidth:1,
             
             //marginLeft:4,
             color:'white',
             alignSelf:'flex-end',
            width:90+'%',
           // backgroundColor:'#d16666',
            borderRadius: 15,
            marginVertical: 5,
            paddingVertical: 5
          }, 
          leftchat:{
           // width:200,
            padding:2,
            fontSize:20,
            margin:10,
            textAlign:'left',
           color:'white'

          },
          rightchat:{
            //width:200,
            padding:2,
            fontSize:20,
            margin:10,
            textAlign:'right',
            fontWeight:'bold'

          },

          sendbtn:{
            alignSelf:'flex-end',
           // position:'absolute',
            bottom:50,
            right:5,
            color:'white'

          },
          activityIndicator: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            height: 80
         },
         card: {
          borderWidth: 3,
          borderRadius: 3,
          borderColor: '#000',
          width: 300,
          height: 300,
          padding: 5
        },
    });