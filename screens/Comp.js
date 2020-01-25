import React from 'react';
import { WebView,View, Text,StyleSheet } from 'react-native';
import {Constants} from 'expo';

//import styles from './styles';
class Comp extends React.Component {
constructor(){
  super();
}

  render() {
  return (
<View style={styles.container}>
<WebView 
  bounces={false}
  scrollEnabled={false} 
  source={{ uri:this.props.url}} />
</View>
);
}
}

const styles = StyleSheet.create({
container: {
  width:'100%',
  height:'100%'
//flex: 1,
//paddingTop: Constants.statusBarHeight,
},
});


// var styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       alignItems: 'center',
//       justifyContent: 'center'
//     },
//     card: {
//       borderWidth: 3,
//       borderRadius: 3,
//       borderColor: '#000',
//       width: 300,
//       height: 300,
//       padding: 10
//     },
//     cardImage: {
//       height: 260,
//     },
//     textLeft: {
//       position: 'absolute',
//       left:0,
//       top:0
//     },
//     textRight: {
//       position: 'absolute',
//       right: 0,
//       top: 0
//     }
//   });


export default Comp;