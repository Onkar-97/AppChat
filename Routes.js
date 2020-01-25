import React from 'react';
import {Router, Stack, Scene, Lightbox, Tabs } from 'react-native-router-flux';
import next from './screens/next';
import logins from './screens/logins';
import User from './screens/User';
import Inbox from './screens/Inbox';
import Chatting from './screens/Chatting';
import CB from './screens/CB';
import register from './screens/register'
import Comp from './screens/Comp';
import {Text,View,Image,StatusBar} from 'react-native';
console.disableYellowBox = true;
StatusBar.setHidden(true);
export default class Routes extends React.Component{
    TabIcon = ({ image }) => {
       //return <Text style={{ color: 'black', fontSize: 10 }} >{title}</Text>
        return(
            <View>
            <Image
              style={{height: 35, width: 35}}
              source={image}
            />
            </View>
        );
    }
          
    
      
    
   
render(){
    return(
    <Router >
       <Scene key = "root" >
       <Scene key = "ss" component = {CB} title = "1min" initial = {true} hideNavBar={true}  />
          <Scene key = "nextt" component = {next} title = "Login" hideNavBar={true} />
          <Scene key = "rr" component = {register} title = "Register" />
          <Tabs key="main" tabs={true}  default="loginss" tabBarPosition='bottom' tabBarStyle={{height:50}} 
        showLabel={true}  
           >
          <Scene key = "loginss" component = {logins} title = "Login success"hideNavBar={true} image={require('./Images/home.png')} icon={this.TabIcon} />
          <Scene key = "inbox" component = {Inbox} title ="Inbox"icon={this.TabIcon} hideNavBar={true} image={require('./Images/inbox.png')}/>
          <Scene key = "userr" component = {User} title ="ADd user" icon={this.TabIcon} hideNavBar={true} image={require('./Images/blog.png')}/>
          </Tabs>
        
       
           
           



          {/* <Scene key = "inbox" component = {Inbox} title ="Inbox"/>
          <Scene key = "userr" component = {User} title ="ADd user"/>
          <Scene key = "chat" component = {Chatting} title="Chat"/> */}
           <Scene key = "chat" component = {Chatting} title="Chat" />
           <Scene key = "web" component = {Comp} title="Image" />
       </Scene>
    </Router>
 );
}
}