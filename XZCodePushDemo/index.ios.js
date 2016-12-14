/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Alert
} from 'react-native';

import CodePush from 'react-native-code-push'

export default class XZCodePushDemo extends Component {

  codePushStatusDidChange(status) {
    switch (status) {
      case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
        console.log("Checking for updates.");
        break;
      case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
        console.log("Downloading package.");
        break;
      case CodePush.SyncStatus.INSTALLING_UPDATE:
        console.log("Installing update.");
        break;
      case CodePush.SyncStatus.UP_TO_DATE:
        console.log("Installing update.");
        break;
      case CodePush.SyncStatus.UPDATE_INSTALLED:
        console.log("Update installed.");
        break;
    }
  }

  codePushDownloadDidProgress(progress) {
    console.log(progress.receivedBytes + " of " + progress.totalBytes + " received.");
  }

  componentDidMount(){
    
      CodePush.checkForUpdate().then((update) => {

        if(!update){
          Alert.alert('提示','已经是最新版本',[
          {
            text:'OK', onPress: () => {
              console.log('click ok')
            }
          }
          ])
        }else{
          CodePush.sync({ checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME, installMode: CodePush.InstallMode.ON_NEXT_RESUME })
        }

      },() => {
        console.log('reject')
      })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native 更新之后 v4!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
        <Image style={{width:200,height:100}}
        source={require('./google.png')}>
        </Image>
      </View>
    );
  }
}

XZCodePushDemo = CodePush(XZCodePushDemo)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('XZCodePushDemo', () => XZCodePushDemo);
