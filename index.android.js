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
  View
} from 'react-native';

import Video from 'react-native-video';

var ScrollableTabView = require('react-native-scrollable-tab-view');

export default class BandNewsNative extends Component {
  render() {
    return (
      <ScrollableTabView style={styles.container}>
        <View tabLabel='Hello'>
          <Text style={styles.welcome}>
            Welcome to React Native!
          </Text>
        </View>
        <View tabLabel='Lero'>
          <Text style={styles.welcome}>
            Welcome to React Native!
          </Text>
        </View>
        <View tabLabel='Ok'>
          <Text style={styles.welcome}>
            Welcome to React Native!
          </Text>
        </View>
      </ScrollableTabView>
    );
  }
}

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
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    height: 0, opacity: 0
  },
});

AppRegistry.registerComponent('BandNewsNative', () => BandNewsNative);

        // <Video source={{ uri: "http://www.bandnewsfm.com.br/audio/2016/12/SIMAO_2012.mp3" }}   // Can be a URL or a local file.
        //   ref={(ref) => {
        //     this.player = ref
        //   } }                             // Store reference
        //   rate={1.0}                     // 0 is paused, 1 is normal.
        //   volume={1.0}                   // 0 is muted, 1 is normal.
        //   muted={false}                  // Mutes the audio entirely.
        //   paused={false}                 // Pauses playback entirely.
        //   resizeMode="contain"             // Fill the whole screen at aspect ratio.
        //   repeat={true}                  // Repeat forever.
        //   playInBackground={true}       // Audio continues to play when app entering background.
        // // Callback when video cannot be loaded
        //   style={styles.backgroundVideo} />