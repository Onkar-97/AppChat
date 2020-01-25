import React from 'react';
import { Actions } from 'react-native-router-flux';
import { TextInput, StyleSheet, Text, View, TouchableHighlight,FlatList,KeyboardAvoidingView,
   ToastAndroid} from 'react-native';
   import * as firebase from 'firebase';

  
 export default class Room extends React.Component{
  constructor(){
    super();
    const list=[];
 this.state={
    chat:[],
    ppp:[],
    fff:[],
  masg:[],
  uidkey:'',
  kkk:'',
  cu:'',
  keyss:[],
  ccc:[]
  }
}
  componentDidMount(){
    var email=firebase.auth().currentUser.email;
    var uid=email.substr(0,email.indexOf('@'));
  cu=uid;
  this.setState({cu});
    uidkey=firebase.database().ref('Users/'+uid).push().key;
    kkk=firebase.database().ref('Users/'+this.a).push().key;
    this.setState({uidkey});
    this.setState({kkk});
     
      var th=this.props.item;
      console.log('kkkkkkkkkkkkkkk'+th);
        firebase.database().ref('Users/'+th+'/').once('value',(data) =>{
        //  var d =data.toJSON();
        var res =data.toJSON();
        console.log('res --> '+ res);
         // var dstr=JSON.stringify(d);
          var usr=data.val();
         // dstr=JSON.parse(usr);
 
         // var abc=this.props.item;
           keyss=Object.keys(usr);
           this.setState({keyss});
           var keys=Object.keys(usr);
          // var hhh= d.keys.chat;
        //   this.setState({keyss});
         const ccc=  res.toString();
         console.log('await-->'+ccc);
          
        
        
         this.setState({ccc});
      
           //var keysval=JSON.stringify(usr[k]);
          // var parse= JSON.parse(keysval);
         //var values=Object.values(usr)
           //console.log('Vlauessssssssssss-->'+values);
          for(var i=0;i<keys.length;i++){
            var k=keys[i];
            global.to=[usr[k].To];
            global.from=[usr[k].from];
             global.mymsg =[usr[k].chat];
                //var fval=values[i].chat;
           // ccc[i]=mymsg;
           
           //console.log('sssssss'+parse.cht);
 
          
          
            // this.setState({ccc});
           
          // console.log('mccccccccD-->'+this.state.ccc.to);
          
          }
          //console.log('sssssss--->'+ss.too);

      
        });
        
      }

  FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 0.4,
          width: "90%",
          backgroundColor: "#607D8B",
        }}
      /> 
    );
 }
  sendfun(masg,user){
    this.clrtxt.clear();
    //this.setState({ccc});
    var kk =this.state.keyss.length;
   // console.log('KKKKKKEEEEEEEEEEYYYYYYYYYYlen----->'+kk);
 var myid=this.state.uidkey;
 var th=this.props.item;
 var kkkk=this.state.kkk;
  var email=firebase.auth().currentUser.email;
  var uid=email.substr(0,email.indexOf('@'));
setTimeout(()=>{
  firebase.database().ref('Users/'+user+'/'+kkkk).set({
    mykey:kkkk,
    chat:masg,
    from:uid,
    To:user,
    tokey:uidkey,
    time:Date.now(),
  }).then(
    console.log('Inserted')
  ).catch((error)=>{
  console.log(error)
  });
   firebase.database().ref('Users/'+uid+'/'+myid).set({
    tokey:kkk,
    chat:masg,
    from:uid,
    To:user,
    mykey:uidkey,
    time:Date.now(),
  }).then(
    console.log('inserted successful')
  ).catch((error)=>{
    console.log(error)
  }
  );
},0);
 
   
    ToastAndroid.show('Massage sending...',ToastAndroid.SHORT);
    //this.setState({ccc});
  //  function window(){
    
  //   var email =firebase.auth().currentUser.email;
  //   email=email.substr(0,email.indexOf('@'));
  //   console.log('IN WINDOWWWWWWWWWWWWWWWWWWWWW'+kkk);
  //   console.log('Userrrrrrrrrrrrrrrrr------->'+user);
  //  // this.setState({ccc});
  //   setTimeout(()=>{
  //     firebase.database().ref('Users/'+th+'/').on('value',(data) =>{
  //       var usr=data.val();
  //       var abc=this.props.item;
  //       var keys=Object.keys(usr);
      
   
  //      })

  //   },500);
  // }
  // window.call(this);
  }
   chatloop=({item})=>{
    var email=firebase.auth().currentUser.email;
    var uid=email.substr(0,email.indexOf('@'));
    var len  = this.state.keyss.length;
    for(var i=0;i<len;i++){
           if(uid==this.props.item)      //p --onkrsangamkar to -- onkrr 
           {
      return<Text style={styles.rightchat}>{item.To}</Text>
           //ccc[i]=mymsg;
           }
           else {
            return<Text style={styles.leftchat}>{item.To}</Text>
           }
         
         }
        }
   
        // return<Text style={styles.txt}>{item} {this.props.item} from--{this.state.cu}</Text>






   render(){

    return (
      <View style={styles.container}>
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <Text style={styles.usershead}>{this.props.item}</Text>
        <FlatList
    data={this.state.ccc}
   ItemSeparatorComponent={this.FlatListItemSeparator}
  // renderItem={({item}) =>
  //   <Text style={styles.txt}>{item}</Text>
    
  //  }
  renderItem={this.chatloop}
    // renderItem={this.renderItem}
    keyExtractor={(item,index) => index}
    /> 
      <TextInput style={styles.txt} ref={input => { this.clrtxt = input }}
       onChangeText={(masg) => this.setState({masg})}
       value={this.state.masg}/>
        
        <TouchableHighlight style={styles.button} onPress={this.sendfun.bind(this,this.state.masg,this.props.item)}>
         <Text> send </Text>
        </TouchableHighlight>
             </KeyboardAvoidingView>
      </View>   
      
      
        );
      }

    }  
const styles = StyleSheet.create({
         container : {
          backgroundColor:'#bc5353',
          flex: 1,
          alignItems:'center',
          justifyContent :'center'
        },
        input: {
          width:300,
          backgroundColor:'rgba(255, 255,255,0.2)',
          borderRadius: 25,
          paddingHorizontal:16,
          fontSize:16,
          color:'#ffffff',
          marginVertical: 10
         
        },
        txt:{
          width:500,
          padding:2,
          fontSize:20,
          textAlign:'center',
          margin:10,
        },
          usershead:{
            fontSize:22,
            textAlign: 'center',
          },
          button: {
            
            alignItems: 'center',
           // backgroundColor: '#ec7063',
           paddingVertical:20,
            padding: 10
          }, 
          leftchat:{
            width:300,
            padding:2,
            fontSize:20,
            margin:10,
            textAlign:'left',

          },
          rightchat:{
            width:300,
            padding:2,
            fontSize:20,
            margin:10,
            textAlign:'right',

          }
    });